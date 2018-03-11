Rails.application.routes.draw do
  namespace :api do
    get 'filters/indicators', to: 'filters#indicators'
    get 'filters/summary'
    get 'users/hello', to: 'users#hello'
    resources :bookmarks, only: [:create, :destroy]
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "spa#index"
  get '*path', to: "spa#index"
end
