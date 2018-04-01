class Api::BiosController < ApplicationController
    before_action :set_bio, only: [:update]

  def index
    bios = Bio.all.first
    render json: bios
  end

  def update
      if @bio.update(bio_params)
        render json: @bio
      else 
        render json: {errors: @bio.errors.full_messages.join(',') }, status: 422
      end
  end  

  private
    def set_bio
      @bio = Bio.find(params[:id])
    end

    def bio_params
      params.require(:bios).permit(:body)
    end
end
