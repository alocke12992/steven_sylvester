class Api::ResearchInterestsController < ApplicationController
  before_action :set_research_interest, only: [:show, :update, :destroy]

  def index
    render json: ResearchInterest.all.order(created_at: :desc)
  end

  def show
    render json: @research_interest
  end

  def create
    research_interest = ResearchInterest.create(research_params)
    if research_interest.save
      render json: research_interest
    else
      render json: { errors: researchInterest.errors.full_messages.join(',') }, status: 422
    end
  end

  def update
    if @research_interest.update(research_params)
      render json: @research_interest
    else
      render json: { errors: @research_interest.errors.full_messages.join(',') }, status: 422
    end
  end

  def destroy
    @research_interest.destroy
  end

  private
    def set_research_interest
      @research_interest = ResearchInterest.find(params[:id])
    end

    def research_params
      params.require(:research_interest).permit(:topic, :title, :body)
    end
end
