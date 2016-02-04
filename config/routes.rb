Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :index, :create] do
      get "userloops", to: "users#userloops"
    end
    resources :loops, only: [:show, :index, :create, :destroy]
    resource :feed, only: [:show]
    resource :session, only: [:create, :destroy, :show]
    resources :likes, only: [:create, :destroy]
    resources :followings, only: [:create, :destroy]
    resources :taggings, only: [:create, :destroy]
    resources :tags, only: [:show]
    resources :comments, only: [:create, :destroy, :index]

    get "search", to: "utils#search"
    get "auth/twitter/callback", to: "sessions#omniauth_twitter"
  end

end
