Rails.application.routes.draw do
  resources :organizers
  resources :opportunities
  resources :opportunity_instances
  root 'application#hello'
end
