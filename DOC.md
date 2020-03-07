### AlbumAPI
- static getAlbums() - return promise for all Albums in DB
- static getAlbumShow(albumId) - return promise for album and all its related tracks from DB

### Album 
- static getAll() - return promise for array of all Album objects (triggers API call i f necessary)
- static findById(id) - return album instance (from Album.all) that matches the given id
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