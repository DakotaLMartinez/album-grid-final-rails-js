class TrackSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :duration, :last_fm_url, :artist_name, :artist_mbid, :album_mbid, :album_id
end
