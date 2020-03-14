Planning your Rails project.

API Requirements
Has many relationship
Albums has_many songs

## Albums
title
release_year
artist_id

## Artists
name

I've set up an album search via the Last.fm API here. If you want to play around with it locally, you'll need to [sign up for an account](https://www.last.fm/api/account/create).

After you sign up, you'll want to add a `.env` file to THE ROOT OF THE ALBUM-API DIRECTORY. Make sure the .env file is in that exact location or it won't work as expected. After you've got this file created, you'll want to add the following line:

```
LAST_FM_API_KEY=
```
And directly after the `=` sign you'll want to paste in the API key you received when you signed up and completed your email confirmation and app registration (I just told them it was a demo app and gave a short description)

For the frontend we have our 3 concerns we'll move forward with.

Client Side Data (State)
Display Logic (Rendering templates)
User Actions/Event Listeners

one click event listener and within its handler, you decide which other event handler should continue with handling that event.
```
document.addEventListener('click', (e) => {
  if(e.target.matches('.close')) {
    handleClose(e)
  } 
  if(e.taget.matches('.open')) {
    handleOpen(e)
  }
})
```
Agenda for 3/3/2020
Done so Far:
- 2 models with restful routes (Album and Track) Currently they're related using foreign keys that come from last.fm. I think we're going to change that
- we have an index.html file that loads up tachyons and our 3 script files `AlbumsPage.js`, `Album.js` and `index.js`
- currently, our `AlbumsPage` class renders a form for adding a new album (which is not currently hooked up to anything at this point)
- our `Album` class has a `renderCard()` method that returns the markup for a card that will appear in our grid.
- our `index.js` file gets the root node in the document and renders the AlbumsPage inside of it.

For next time:
- We'll set up the `AlbumsPage` class to render the list of albums (in the cards returned from the `Album` class)
- We will hook up our form to our API endpoint to create a new album. We'll use that data to hit the Last.fm API and get cover art and track info and send back a response to our client. With the response we will add a new Album to the `AlbumsPage` grid.
- To do this, we'll be adding event listeners directly to the document. We'll have one for `click` one for `submit` one for `change` and we'll have conditional logic deciding what should happen in response to each type of event.

Eventually we'll need to add has_many serialization so we're getting that data nested from our API. (So we'll add a serializer to do that). We might end up adding comments to albums


Maybe use this endpoint? http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=soul&api_key=API_KEY_HERE&format=json
