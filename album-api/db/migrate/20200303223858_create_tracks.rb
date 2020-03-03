class CreateTracks < ActiveRecord::Migration[6.0]
  def change
    create_table :tracks do |t|
      t.string :name
      t.string :duration
      t.string :last_fm_url
      t.string :artist_name
      t.string :artist_mbid
      t.string :album_mbid

      t.timestamps
    end
  end
end
