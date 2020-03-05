class AddAlbumIdToTracks < ActiveRecord::Migration[6.0]
  def change
    add_reference :tracks, :album, foreign_key: true
  end
end
