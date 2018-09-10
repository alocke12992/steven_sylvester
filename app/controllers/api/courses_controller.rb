class Api::CoursesController < ApplicationController
  before_action :set_university
  before_action :set_course, only: [:show, :update, :destroy]
  # before_action :authenticate_user!, only: [:show, :update, :destroy]

  def index
    @courses = @university.courses
    render json: @courses
  end

  def create
    course = @university.courses.create(course_params)
    if course.save
      render json: course
    else
      render json: { errors: course.errors.full_messages.join(',') }, status: 422
    end
  end

  def update
    if @course.update(course_params)
      render json: @course
    else 
      render json: {errors: @course.errors.full_messages.join(',') }, status: 422
    end
  end

  def destroy
    @course.destroy
  end

  private
  def set_university
    @university = University.find(params[:university_id])
  end

  def set_course
    @course = Course.find(params[:id])
  end

  def course_params
    params.require(:course).permit(
      :title,
      :syllabus
    )
  end
end
