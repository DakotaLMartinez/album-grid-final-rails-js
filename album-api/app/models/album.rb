class Album < ApplicationRecord
  has_many :tracks, foreign_key: 'album_mbid', primary_key: 'mbid'
end
