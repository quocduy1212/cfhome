Rails.application.routes.draw do
  namespace :api do
    get 'filters/indicators/:market_name', to: 'filters#indicators'
    get 'filters/summary'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "spa#index"
  get '*path', to: "spa#index"
end
