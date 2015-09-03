Rails.application.routes.draw do
  devise_for :users

  scope '/admin' do
    root :to => 'application#index'
    resources :topics, only: [:edit, :new]
    resources :organizers, only: [:edit, :new]
    resources :locations, only: [:edit, :new]
    resources :opportunities, only: [:edit, :new]
    resources :opportunity_instances, only: [:edit, :new]
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
