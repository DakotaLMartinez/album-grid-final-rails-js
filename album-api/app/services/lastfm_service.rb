class LastfmService 
  BASE_URL = "http://ws.audioscrobbler.com/2.0/"
  def self.search(method, query)
    response = Typhoeus.get("#{BASE_URL}?method=#{method}&album=#{query}&api_key=#{ENV['LAST_FM_API_KEY']}&format=json")
    results = JSON.parse(response.response_body)
  end

  def self.album_info(mbid)
    response = Typhoeus.get("#{BASE_URL}?method=album.getinfo&api_key=#{ENV['LAST_FM_API_KEY']}&mbid=#{mbid}&format=json")
    results = JSON.parse(response.response_body)
  end
end