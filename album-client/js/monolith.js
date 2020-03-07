class AlbumAPI {
  static getAlbums() {
    return fetch(`${AlbumAPI.base_url}/albums`).then(res => res.json())
  }

  static getAlbumShow(albumId) {
    return fetch(`${AlbumAPI.base_url}/albums/${albumId}`)
      .then(res => res.json())
      .then(json => {
        // we'll pull out the id, title, artist_name and image_url for the album
        // then we'll pull out the included tracks and map over them to just have the info we want
        const { 
          data: {  
            id,
            attributes: {
              title, 
              artist_name, 
              image_url
            }
          },
          included
        } = json
        return {
          id,
          title,
          artist_name,
          image_url,
          tracks: included.map(({id, attributes: {name, duration, last_fm_url, artist_name, album_id}}) => {
            return {
              id,
              name,
              duration,
              last_fm_url,
              artist_name,
              album_id
            }
          })
        }
        
      })
  }
}

AlbumAPI.base_url = "http://localhost:3000"

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
      return AlbumAPI.getAlbums().then(albums => {
        Album.all = albums.map(albumAttributes => 
          new Album(albumAttributes)
        )
        return Album.all
      })
    } else {
      return Promise.resolve(Album.all)
    }
  }

  static findById(id) {
    return Album.all.find(album => album.id == id)
  }

  getAlbumDetails() {
    if(this.tracks().length === 0) {
      return AlbumAPI.getAlbumShow(this.id)
        .then(({tracks}) => {
          tracks.map(trackAttributes => Track.findOrCreateBy(trackAttributes))
          return this
        })
    } else {
      return Promise.resolve(this)
    }
  }

  tracks() {
    return Track.all.filter(track => track.album_id == this.id)
  }

  renderCard() {
    let article = document.createElement('article')
    article.className = "fl w-100 w-50-m  w-25-ns pa2-ns"
    article.dataset['album_id'] = this.mbid
    article.innerHTML = `
      <div class="aspect-ratio aspect-ratio--1x1">
        <img style="background-image:url(${this.image_url});" 
        class="db bg-center cover aspect-ratio--object" />
      </div>
      <a href="#0" class="ph2 ph0-ns pb3 link db">
        <h3 class="f5 f4-ns mb0 black-90">${this.title}</h3>
        <h3 class="f6 f5 fw4 mt2 black-60">${this.artist_name}</h3>
      </a>
      <p><a href="#/albums/${this.id}" class="albumShow ba1 pa2 bg-moon-gray link" data-albumid="${this.id}">Album Details</a></p>
    `
    return article.outerHTML
  }
}

Album.all = []

class Track {
  constructor({id, name, duration, last_fm_url, artist_name, album_id}) {
    this.id = id
    this.name = name 
    this.duration = duration 
    this.last_fm_url = last_fm_url
    this.artist_name = artist_name
    this.album_id = album_id
  }

  static findOrCreateBy(attributes) {
    // if we find a track with the same id as the id in attributes, then return that track, if not create a track, add it to Track.all and return it.
    let found = Track.all.find(track => track.id == attributes.id)
    return found ? found : new Track(attributes).save()
  }

  save() {
    Track.all.push(this)
    return this
  }

  render() {
    return `
      <li>${this.name}</li>
    `
  }

}

Track.all = []

class AlbumsPage {

  constructor(albums) {
    this.albums = albums
    this.formState = {
      title: '',
      artist_name: ''
    }
  }

  renderForm() {
    return `
      <form class="addAlbum">
        <h3>Add Album</h3>
        <p>
          <label class="db">Title</label>
          <input type="text" name="title" value="${this.formState.title}" />
        </p>
        <p>
          <label class="db">Artist Name</label>
          <input type="text" name="artist_name" value="${this.formState.artist_name}" />
        </p>
        <input type="submit" value="Add Album" />
      </form>
    `
  }

  renderList() {
    return this.albums.map(album => {
      return album.renderCard()
    }).join('')
  }

  render() {
    return `
      <h1>Hello from AlbumsPage</h1>
      ${this.renderForm()}
      ${this.renderList()}
    `
  }
}

class AlbumShowPage {
  constructor(album) {
    this.album = album
  }

  renderTrackList() {
    // this method should 
    let ul = document.createElement('ul')
    // iterate over the tracks and add a list item to the ul for each one (using appendChild)
    this.album.tracks().forEach(track => {
      ul.insertAdjacentHTML('beforeend', track.render())
    })
    return ul.outerHTML
  }

  render() {
    return `
    <div class="aspect-ratio aspect-ratio--1x1">
      <img style="background-image:url(${this.album.image_url});" 
      class="db bg-center cover aspect-ratio--object" />
    </div>
    <div class="ph2 ph0-ns pb3 link db">
      <h3 class="f5 f4-ns mb0 black-90">${this.album.title}</h3>
      <h3 class="f6 f5 fw4 mt2 black-60">${this.album.artist_name}</h3>
    </div>
    ${this.renderTrackList()}
    `
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  let root = document.getElementById('root')
  root.innerHTML = loadingGif()
  Album.getAll().then(albums => {
    root.innerHTML = new AlbumsPage(albums).render()
  })
  document.addEventListener('click', (e) => {
    if(e.target.matches('.albumShow')) {
      let album = Album.findById(e.target.dataset.albumid)
      album.getAlbumDetails().then(album => {
        root.innerHTML = new AlbumShowPage(album).render()
      })  
    }
    if(e.target.matches('.albumsIndex')) {
      root.innerHTML = new AlbumsPage(Album.all).render()
    }
  })
})

const loadingGif = () => {
  let loading = document.createElement('img')
  loading.src = 'https://i.giphy.com/media/y1ZBcOGOOtlpC/giphy.webp'
  return loading.outerHTML
}
