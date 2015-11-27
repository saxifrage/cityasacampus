Rails.application.routes.draw do
  get 'dashboard/home'

  scope '/dashboard' do

    root :to => 'application#index'

    devise_for :users, :skip => [ :registrations ]
    resources :registrations, only: [:create] do
      collection do
        get 'organizer_registration'
      end
    end
    resources :topics
    resources :organizers
    resources :venues
    resources :opportunities do
      collection do
        match 'bulk-add', action: :bulk_add, via: [:get, :post]
      end
    end
    resources :opportunity_instances
  end

  resources :topics, except: [:edit, :new]
  resources :venues, except: [:edit, :new]
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
