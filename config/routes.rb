Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :interests, only: [:index, :update]
    resources :research_interests
    resources :bios, only: [:index, :update]
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
