Rails.application.routes.draw do
  resources :organizers do
    resources :opportunities
  end
  resources :locations
  resources :opportunities
  resources :opportunity_instances
  root 'application#hello'
end
