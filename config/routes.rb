Rails.application.routes.draw do
  resources :organizations
  resources :opportunities
  resources :opportunity_instances
  root 'application#hello'
end
