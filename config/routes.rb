Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :index, :create]
    resources :loops, only: [:show, :index, :create, :destroy]
    resource :feed, only: [:show]
    resource :session, only: [:create, :destroy, :show]
    resource :likes, only: [:create, :destroy]
    resource :followings, only: [:create, :destroy]
    get "search", to: "utils#search"
  end

end
