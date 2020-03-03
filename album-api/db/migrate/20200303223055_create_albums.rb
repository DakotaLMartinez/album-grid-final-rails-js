class CreateAlbums < ActiveRecord::Migration[6.0]
  def change
    create_table :albums do |t|
      t.string :title
      t.string :artist_name
      t.string :image_url
      t.string :mbid

      t.timestamps
    end
  end
end
