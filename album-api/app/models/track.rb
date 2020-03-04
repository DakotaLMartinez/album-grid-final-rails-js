class Track < ApplicationRecord
  belongs_to :album, foreign_key: 'album_mbid', primary_key: 'mbid'
end
