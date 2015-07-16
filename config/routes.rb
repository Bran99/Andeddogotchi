Rails.application.routes.draw do
  root 'application#main'

  resources :users
  resource :gotchis, only: [:new, :destroy]

  resource :session, only: [:new, :create, :destroy]

end
