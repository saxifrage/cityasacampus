Rails.application.routes.draw do
  get 'dashboard/home'

  scope '/dashboard' do
    devise_for :users
    root :to => 'application#index'
    resources :topics
    resources :organizers
    resources :locations
    resources :opportunities
    resources :opportunity_instances
  end

  resources :topics, except: [:edit, :new]
  resources :locations, except: [:edit, :new]
  resources :opportunities, except: [:edit, :new]

  resources :organizers, except: [:edit, :new] do
    resources :opportunities
  end

  resources :opportunity_instances, except: [:edit, :new] do
    collection do
      get 'topics/:title', action: :topic
      get 'search/:term', action: :search
    end
  end
end
