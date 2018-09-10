class Api::InterestsController < ApplicationController
  before_action :set_interest, only: [:update]

  def index
    interests = Interest.all.first
    render json: interests
  end

  def update
    if @interest.update(interest_params)
      render json: @interest
    else 
      render json: {errors: @interest.errors.full_messages.join(',') }, status: 422
    end
  end  

  private
    def set_interest
      @interest = Interest.find(params[:id])
    end

    def interest_params
      params.require(:interests).permit(:body)
    end
end
