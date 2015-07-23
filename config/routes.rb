Rails.application.routes.draw do
  root 'application#main'

  resources :users
  resource :gotchis, only: [:new, :create, :update, :destroy]

  resource :session, only: [:new, :create, :destroy] do
    get 'current'
  end

  get '/has_gotchi', to: 'gotchis#has_gotchi', as: 'has_gotchi'

  get '/session_check', to: 'sessions#check', as: 'check'

end
