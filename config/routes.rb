Rails.application.routes.draw do
  root "static_pages#home"
  get "/login" => "sessions#new"
  post "/login" => "sessions#create"
  post "/logout" => "sessions#destroy"
  get "/signin", to: "sessions#new"
  post '/signin' => 'sessions#create'
  resources :users, only: [:new, :create, :show] do
    resources :gifts
    resources :friends, only: [:show, :new, :create, :edit, :update] do
      resources :gifts
      get 'gifts/:id/next', to: 'gifts#next'
    end
    get 'friends/:id/next', to: 'friends#next'
  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
