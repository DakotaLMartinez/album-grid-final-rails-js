### AlbumAPI
- static getAlbums() - return promise for all Albums in DB
- static getAlbumShow(albumId) - return promise for album and all its related tracks from DB
- static createAlbum(albumAttributes) - return promise for album we just created

### Album 
- static getAll() - return promise for array of all Album objects (triggers API call i f necessary)
- static findById(id) - return album instance (from Album.all) that matches the given id
- static create(attributes) - submit API call, use response to create a new Album instance, add it to Album.all and return a promise for the instance.
- save() - adds an album instance to Album.all and returns it
- getAlbumDetails() - returns promise for album and track details (triggers API call if necessary)
- tracks() - returns array of Track instances related to this album (from Track.all)
- renderCard() - returns string of html for rendering a single album (grid view)

## Track 
- static findOrCreateBy(attributes) - returns an existing track instance (matched by id) or creates a new one and returns it
- save() - adds a track instance to Track.all and returns it
- render() - returns string of html for displaying track in list view (on AlbumShowpage)

## AlbumsPage
- renderForm() - returns html for new Album form
- renderList() - returns html for album grid
- render() - returns html for both the form and the album grid

## AlbumShowPage
- renderTrackList() - returns html string for the ul containing all the tracks
- render() - returns html for album show page in entirety.

## Event Listeners
- click
  - .albumShow - replaces root node's innerHTML with AlbumShow page for album (found via data-attribute for albumId)
  - .albumsIndex - replaces root node's innerHTML with AlbumsPage(Album.all)
- submit
  - .addAlbum - calls the `Album.create()` method and passes in form data, consumes the returned promise (an album instance), calls renderCard() on it and does an insertAdjacentHTML to add the card to the album grid.