class AlbumAPI {
  static getAlbums() {
    return fetch(`${AlbumAPI.base_url}/albums`).then(res => res.json())
  }
}

AlbumAPI.base_url = "http://localhost:3000"