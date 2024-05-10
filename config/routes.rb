Rails.application.routes.draw do
  resources :calenders
  resources :rooms
  root "rooms#index"
end
