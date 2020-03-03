Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/albums/:method', to: 'last_fm_search#albums'
  get '/albuminfo/:id', to: 'last_fm_search#album_info'
end
