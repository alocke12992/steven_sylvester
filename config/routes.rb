Rails.application.routes.draw do

  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :interests, only: [:index, :update]
    resources :research_interests
    resources :bios, only: [:index, :update]
    resources :cvs, only: [:index, :new, :create, :update]
    resources :settings, only: [:index]
    resources :publications
    resources :data
    get '/cv', to: 'cvs#download_pdf'
    put '/settings/:id/update_cv', to: 'settings#update_cv'
    put '/settings/:id/update_avatar', to: 'settings#update_avatar'
    post '/emails', to: 'emails#create'
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
