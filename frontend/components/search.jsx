var React = require('react');
var SearchResultsStore = require('../stores/search_results_store');
var SearchApiUtil = require('../util/search_api_util');
var Search = React.createClass({

  getInitialState: function(){
    return {page: 1, query: "", hidden: ""};
  },

  componentDidMount: function() {
    this.listener = SearchResultsStore.addListener(this._onChange);
  },

  _onChange: function() {
    this.setState({hidden: ""});
    this.forceUpdate();
  },

  search: function (e) {
    var query = e.target.value;
    SearchApiUtil.search(query, 1);

    this.setState({page: 1, query: query});
  },

  nextPage: function () {
   var nextPage = this.state.page + 1;
   SearchApiUtil.search(this.state.query, nextPage);

   this.setState({page: nextPage});
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  hideSearch: function(){
    this.setState({hidden: "hidden"});
  },


  render: function(){

    var searchResults;
    if (SearchResultsStore.all().length === 0 && this.state.query.length > 0) {
      searchResults =  (
        <li>
        <p className="search-results-link">
        No results</p></li>
      );
    } else {
      searchResults = SearchResultsStore.all().map(function (searchResult) {

        if (searchResult._type === "User") {
          return (
            <li key={searchResult._type + searchResult.id}>
            <a className="search-results-link" href={"/#/users/" + searchResult.id}><i className="fa fa-user search-icon"></i>
            {searchResult.username}</a></li>
          );
        }
        else if (searchResult._type === "Loop") {
          return (
            <li key={searchResult._type + searchResult.id}>
            <a className="search-results-link" href={"/#/loops/" + searchResult.id}><i className="fa fa-video-camera search-icon"></i>
            {searchResult.title}</a></li>
          );
        } else if (searchResult._type === "Tag") {
          return (
            <li key={searchResult._type + searchResult.id}>
            <a className="search-results-link" href={"/#/tag/" + searchResult.id}><i className="fa fa-hashtag"></i>
            {searchResult.tag}</a></li>
          );
        } else {
          return;
        }
      });
    }


    return(
      <div>
        <input className="nav-bar-search " onKeyUp={this.search} onChange={this._onChange} type="text" value={this.state.search} placeholder="Search"/>
        <div className={"search-results " + this.state.hidden} onClick={this.hideSearch}>
          <ul className={"search-results-list " + this.state.hidden}>
            {searchResults}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = Search;
