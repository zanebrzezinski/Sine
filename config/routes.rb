Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :index]
    resources :loops, only: [:show, :index]
    resource :feed, only: [:show]
  end

end
