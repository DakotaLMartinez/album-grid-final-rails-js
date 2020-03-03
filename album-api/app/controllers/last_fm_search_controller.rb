class LastFmSearchController < ApplicationController
  def albums
    render json: LastfmService.search("album.#{params[:method]}", params[:query])
  end

  def album_info
    render json: LastfmService.album_info(params[:id])
  end
end
