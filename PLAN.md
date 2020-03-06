### UIState
AlbumAPI

### Page Templates (and Partials)
AlbumsPage (list of albums and form to add new one)
AlbumShowPage (with track list and form to add new track)
BONUS: AlbumSearch

### Partials
AlbumForm
TrackForm
AlbumList
TrackList

### Models
Album
Track

### User Actions
User Adds an Album by submitting AlbumForm
User Adds a track to an album by submitting TrackForm
User clicks on an Album to visit the AlbumShowPage for the album
BONUS: User searches for an album by submitting AlbumSearch

### App Summary 
Our app will have two main views. 
1. The Album Index (with a form to add a new album on it and a list of all the albums)
2. The Album Show page (with a form to add a new track to the album and a list of all the current tracks)

Navigation will be simple. There will be a link at the top of our html to take us back to the Album Index. Each Album in the list will have a link to the Album Show page where we can see a form to add a track to the album and a full list of the current tracks. The way we'll handle links will be to add an event listener to the document to prevent default behavior and then use classes to handle what should happen when we click different kinds of links (one class will indicate how we should handle going back to albums index vs another will tell us how to respond when it's a link to an album show page)

### API Interactions

To support our App, we'll need 4 API endpoints. 
```
get '/albums', to: 'albums#index'
get '/albums/:id', to: 'albums#show'
post '/albums', to: 'albums#create'
post '/albums/:album_id/tracks', to: 'tracks#create'
```
We'll have an AlbumAPI class that knows how to make requests to these endpoints and return the response in JSON format. 
The `get '/albums'` endpoint will return an index of the albums without the tracks included.
The `get '/albums/:id` endpoint will include album details in addition to the album's tracks (has_many requirement).
The `post '/albums'` endpoint will allow us to create an album and add it to our database
The `post '/albums/:album_id/tracks'` endpoint will allow to add a track to an existing album.



### Storing information (state) in our program.
When we make requests to our API, we'll use the responses to create instances of our Album and Track classes and store them in memory (within JS variables). We'll do this

Equivalent of class variables in Ruby in Javascript

```
#ruby
class Album 
  attr_reader :title, :artist_name
  @@all = []
  def initialize(attrs) 
    @title = attrs["title"]
    @artist_name = attrs["artist_name"]
  end

  def self.all 
    @@all
  end

  def self.find_by_title(title)
    self.all.find{|album| album.title == title}
  end
end

Album.all.map {|album| album.title }
```

```
// js
class Album {
  constructor(attrs) {
    this.title = attrs.title
    this.artist_name = attrs.artist_name
  }

  static findByTitle(title) {
    return Album.all.find(album => album.title === title)
  }
}

Album.all = []

Album.all.map(album => album.title)
```

## Tasks for 3/5/2020

- Add serializers for Albums and Tracks 
- Configure /albums/:id to use tracks serializer
- Configure rack-cors gem to allow for our front end to connect to the Rails API
- Add `AlbumAPI` class that can make a request to our API and return JSON formatted data.
- Add an `all` class variable to the `Album` and a `getAll()` static method that makes a request to our API returns a promise to return an array of album instances.
- Add logic to our `AlbumsPage` class to render the list of albums. We also adjusted that class to take albums as a parameter in the constructor.
- Add to the `DOMContentLoaded` event handler in index.js to get the Albums using `Album.getAll()` and then passed the albums to  `AlbumsPage` and rendered it to the root node.

Add Serializers for Albums to handle the index and show endpoints.
```
rails g serializer Album title artist_name image_url mbid
```

```
rails g serializer Track name duration last_fm_url artist_name artist_mbid album_mbid album_id
```

In AlbumsController show action
```
  # GET /albums/1
  def show
    options = {}
    options[:include] = [:tracks, :'tracks.name', :'tracks.duration', :'tracks.last_fm_url', :'tracks.artist_name', :'tracks.artist_mbid', :'tracks.album_mbid']
    render json: AlbumSerializer.new(@album, options)
  end
```

To get our API to work we'll also need to add the rack-cors gem and add the configuration in config/initializers/cors.rb

``` 
bundle add rack-cors
```

```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:8000'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

We're going to run our frontend server using the following command:
```python -m SimpleHTTPServer```
This starts a local server on port 8000.

We then have to add an AlbumAPI class that can hit the albums index route, get the results and store them in Album.all

```
class AlbumAPI {
  static fetchAlbums() {
    return fetch(`http://localhost:3000/albums`)
      .then(res => res.json())
  }
}
```

```
class Album {
  constructor({ id, title, artist_name, image_url, mbid }) {
    this.id = id
    this.title = title
    this.artist_name = artist_name
    this.image_url = image_url
    this.mbid = mbid
  }

  static getAll() {
    if(Album.all.length === 0) {
      return AlbumAPI.fetchAlbums().then(json => {
        Album.all = json.map(albumAttributes => new Album(albumAttributes))
        return Album.all
      })
    } else {
      return Promise.resolve(Album.all)
    }
  }

  imageHtml() {
    return `<img src="${this.image_url}" />`
  }

  renderCard() {
    let article = document.createElement('article')
    article.className = "fl w-100 w-50-m w-25-ns pa2-ns h6-ns"
    article.dataset['album_id'] = this.mbid
    article.innerHTML = `
      <div class="aspect-ratio aspect-ratio--1x1">
        <img style="background-image:url(${this.image_url});" 
        class="db bg-center cover aspect-ratio--object" />
      </div>
      <a href="#0" class="ph2 ph0-ns  link db">
        <h3 class="f5 f4-ns h2-ns mb0 black-90">${this.title}</h3>
        <h3 class="f6 f5 fw4 mt3 black-60">${this.artist_name}</h3>
      </a>
      <p><button class="editAlbum" data-id="${this.id}">Edit Album</button></p>
    `
    return article
  }
}

Album.all = []
```