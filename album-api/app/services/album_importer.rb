class AlbumImporter 
  def self.import(album_mbid)
    results = LastfmService.album_info(album_mbid)
    album_attributes = {}
    album_attributes[:title] = results['album']['name']
    album_attributes[:artist_name] = results['album']['artist']
    album_attributes[:image_url] = results['album']['image'].find{|i| i["size"] == "extralarge"}.try(:[],'#text')
    album_attributes[:mbid] = results['album']['mbid']
    album = Album.find_or_create_by(album_attributes)
    results['album']['tracks']['track'].each do |track|
      track_attributes = {}
      track_attributes[:name] = track['name']
      track_attributes[:duration] = track['duration']
      track_attributes[:last_fm_url] = track['url']
      track_attributes[:artist_name] = track['artist']['name']
      track_attributes[:artist_mbid] = track['artist']['mbid']
      album.tracks.find_or_create_by(track_attributes)
    end
    binding.pry
  end
end