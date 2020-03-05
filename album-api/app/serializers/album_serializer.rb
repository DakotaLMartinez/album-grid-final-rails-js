class AlbumSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :artist_name, :image_url, :mbid
  has_many :tracks
end
