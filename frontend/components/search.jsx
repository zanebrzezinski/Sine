var React = require('react');
var SearchResultsStore = require('../stores/search_results_store');
var SearchApiUtil = require('../util/search_api_util');
var Search = React.createClass({

  getInitialState: function(){
    return {page: 1, query: ""};
  },

  componentDidMount: function() {
    this.listener = SearchResultsStore.addListener(this._onChange);
  },

  _onChange: function() {
    this.forceUpdate();
  },

  search: function (e) {
    var query = e.target.value;
    SearchApiUtil.search(query, 1);
    console.log(SearchResultsStore.all());
    console.log("searched");

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


  render: function(){

    var searchResults = SearchResultsStore.all().map(function (searchResult) {
      return <li>{searchResult}</li>;
    });

    return(
      <div>
        <input className="nav-bar-search" onKeyUp={this.search} onChange={this._onChange} type="text" value={this.state.search} placeholder="Search"/>
        <div className="search-results">
          <ul>
            {searchResults}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = Search;
