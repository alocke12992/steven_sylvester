class Api::InterestsController < ApplicationController
  before_action :set_interest, only: [:update, :destroy]

  def index
    render json: Interest.all
  end


  def create
    interest = Interest.create(interest_params)
    if interest.save
      render json: interest
    else
      render json: { errors: interest.errors.full_messages.join(',') }, status: 422
    end
  end

  def update
    if @interest.update(interest_params)
      render json: @interest
    else
      render json: { errors: @interest.errors.full_messages.join(',') }, status: 422
    end
  end

  def destroy
    @interest.destroy
  end

  private
    def set_interest
      @interest = interest.find(params[:id])
    end

    def interest_params
      params.require(:interest).permit(:body)
    end
end
