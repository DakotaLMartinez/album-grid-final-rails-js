document.addEventListener('DOMContentLoaded',  () => {
  let root = document.getElementById('root')
  Album.getAll().then(albums => {
    root.innerHTML = new AlbumsPage(albums).render()
  })
  

  attachListeners()
})

const attachListeners = () => {
  document.addEventListener('click', (e) => {
    if(e.target.matches('a')) {
      e.preventDefault();
      window.location.href = e.target.href;
    }
  })
}
let songsInTheKeyOfLife = new Album({
  id: 1,
  title: "Songs in the Key of Life",
  artist_name: "Stevie Wonder",
  image_url: "https://lastfm.freetls.fastly.net/i/u/300x300/89082b98c5c94310c3335e272e9da9db.png",
  mbid: "ab7b0bf0-b5df-40b5-be73-b121daef595a",
  created_at: "2020-03-03T23:18:37.393Z",
  updated_at: "2020-03-03T23:18:37.393Z"
})