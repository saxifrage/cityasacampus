Rails.application.routes.draw do
  root 'application#hello'
  resources :organizers
  resources :opportunities
  resources :opportunity_instances
end
