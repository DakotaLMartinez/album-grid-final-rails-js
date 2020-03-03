Rails.application.routes.draw do
  resources :tracks
  resources :albums
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '/lastfm' do 
    get '/albums/:method', to: 'last_fm_search#albums'
    get '/album_info/:id', to: 'last_fm_search#album_info'
  end
end
