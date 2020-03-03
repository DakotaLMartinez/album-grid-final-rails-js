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
