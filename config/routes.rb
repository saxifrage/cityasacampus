Rails.application.routes.draw do
  resources :topics
  resources :organizers do
    resources :opportunities
  end
  resources :locations
  resources :opportunities
  resources :opportunity_instances do
    collection do
      get 'topics/:title', action: :topic
    end
  end
  root 'application#hello'
end
