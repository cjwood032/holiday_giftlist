Rails.application.routes.draw do
  root "static_pages#home"
  get "/login" => "sessions#new"
  post "/login" => "sessions#create"
  post "/logout" => "sessions#destroy"
  get "/signin", to: "sessions#new"
  post '/signin' => 'sessions#create'
  resources :users, only: [:new, :create, :show] do
    resources :gifts, only: [:show, :new, :create, :edit, :index, :update]
    resources :friends, only: [:show, :new, :create, :edit, :index, :update] do
      resources :gifts, only: [:show, :new, :create, :edit, :index, :update]
      get '/gifts/:id/next', to: 'gifts#next'
    end
    get 'friends/:id/next', to: 'friends#next'
    post 'friends/:id/delete' => 'friends#delete'
  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
