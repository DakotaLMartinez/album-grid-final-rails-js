document.addEventListener('DOMContentLoaded', () => {
  let root = document.getElementById('root')
  root.innerHTML = loadingGif()
  Album.getAll().then(albums => {
    root.innerHTML = new AlbumsPage(albums).render()
  })
})

const loadingGif = () => {
  let loading = document.createElement('img')
  loading.src = 'https://i.giphy.com/media/y1ZBcOGOOtlpC/giphy.webp'
  return loading.outerHTML
}
