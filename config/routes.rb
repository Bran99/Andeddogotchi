Rails.application.routes.draw do
  root 'application#main'

  resources :users

  resource :session, only: [:new, :create, :destroy]

end
