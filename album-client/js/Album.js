class Album {
  constructor({ id, title, artist_name, image_url, mbid }) {
    this.id = id
    this.title = title
    this.artist_name = artist_name
    this.image_url = image_url
    this.mbid = mbid
  }

  imageHtml() {
    return `<img src="${this.image_url}" />`
  }

  renderCard() {
    let article = document.createElement('article')
    article.class = "fl w-100 w-50-m  w-25-ns pa2-ns"
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
      <p><button class="editAlbum" data-id="${this.id}">Edit Album</button></p>
    `
    return article
  }
}