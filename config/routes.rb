Rails.application.routes.draw do
  
  get "/login" => "sessions#new"
  post "/login" => "sessions#create"
  get "/logout" => "sessions#destroy"

  resources :users, only: [:new, :create, :show] do
    resources :friends do
      resources :gifts
      get 'gifts/:id/next', to: 'gifts#next'
    end
    get 'friends/:id/next', to: 'friends#next'
  end


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
