class Api::CoursesController < ApplicationController
  before_action :set_university
  before_action :set_course, only: [:show, :update, :destroy]  

  def index
    @courses = @university.courses
    render json: @courses
  end

  def create
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    course = @university.courses.new(course_params)
    course.title = params[:title]
    syllabus = params[:syllabus]
    begin
      if !syllabus.blank? 
        obj = s3.bucket(s3_bucket).object("courses/#{syllabus.original_filename}")
        obj.upload_file(syllabus.tempfile, acl: 'public-read' )
        course.syllabus = obj.public_url
      end
      if course.save
        render json: course
      else
        render json: { errors: course.errors.full_messages.join(',') }, status: 422
      end
    rescue => e
      render json: { errors: e }, status: 422
    end
  end

  def update
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    @course.title = params[:title]
    syllabus = params[:syllabus]
    begin
      if !syllabus.blank?
        obj = s3.bucket(s3_bucket).object("courses/#{syllabus.original_filename}")
        obj.upload_file(syllabus.tempfile, acl: 'public-read' )
        @course.syllabus = obj.public_url
      end
      if @course.update(course_params)
        render json: @course
      else 
        render json: {errors: @course.errors.full_messages.join(',') }, status: 422
      end 
    rescue => e 
      render json: {errors: e}, status: 422
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
    params.permit(
      :title,
      :syllabus
    )
  end
end
