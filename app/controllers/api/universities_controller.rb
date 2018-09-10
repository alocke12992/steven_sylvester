class Api::UniversitiesController < ApplicationController
  before_action :set_university, only: [:show, :update, :destroy]
  # before_action :authenticate_user!, only: [:show, :update, :destroy]

  def index
    @university = University.all
    render json: @university
  end

  def create
    university = University.create(university_params)
    if university.save
      render json: university
    else
      render json: { errors: university.errors.full_messages.join(',') }, status: 422
    end
  end

  def update
    if @university.update(university_params)
      render json: @university
    else 
      render json: {errors: @university.errors.full_messages.join(',') }, status: 422
    end
  end

  def destroy
    @university.destroy
  end

  private
  def set_university
    @university = University.find(params[:id])
  end

  def university_params
    params.require(:university).permit(:name)
  end
end
