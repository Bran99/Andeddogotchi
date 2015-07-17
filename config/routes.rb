Rails.application.routes.draw do
  root 'application#main'

  resources :users
  resource :gotchis, only: [:new, :create, :update, :destroy]

  resource :session, only: [:new, :create, :destroy]

end
