class AlbumAPI {
  static fetchAlbums() {
    return fetch(`http://localhost:3000/albums`)
      .then(res => res.json())
  }
}