class LastfmService 
  BASE_URL = "http://ws.audioscrobbler.com/2.0/"
  def self.album_search(query)
    response = Typhoeus.get("#{BASE_URL}?method=album.search&album=#{query}&api_key=#{ENV['LAST_FM_API_KEY']}&format=json")
    results = JSON.parse(response.response_body)
    binding.pry
  end
end