class Api::CvsController < ApplicationController
  before_action :set_cv, only: [:update]

  def index
    cv = Cv.all.first
    render json: cv
  end

  def new 
  end 

  def download_pdf
    binding.pry
    presigner = Aws::S3::Presigner.new
    s3_bucket = ENV['BUCKET']
    render json: { url: presigner.presigned_url(:get_object,
                                                  bucket: s3_bucket,
                                                  file: params[:file],
                                                ).to_s }
  end 

  def create
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    file = params[:file]
    begin
      ext = File.extname(file.tempfile)
      obj = s3.bucket(s3_bucket).object[params[:file].original_filename]
      obj.upload_file(file.tempfile, acl: 'public-read')
      binding.pry 
      cv = Cv.new(
        file: obj.public_url,
      )
      if cv.save
        render json: cv
      else 
        render json: { errors: cv.errors.full_messages }, status: 422
      end 
    rescue => e 
      render json: {errors: e}, status: 422
    end 
  end 
  
  def update
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
      s3_bucket = ENV['BUCKET']
      file = params[:file]
      begin
        ext = File.extname(file.tempfile)
        obj = s3.bucket(s3_bucket).object("Cv/#{@cv.id}#{ext}")
        obj.upload_file(file.tempfile, acl: 'public-read')
        @cv.file = obj.public_url
        if @cv.save
          render json: @cv
        else 
          render json: { errors: @cv.errors.full_messages }, status: 422
        end 
      rescue => e 
        render json: {errors: e}, status: 422
      end 
  end  

  private
    def set_cv
      @cv = Cv.find(params[:id])
    end

    def cv_params
      params.require(:cv).permit(:file)
    end
end
