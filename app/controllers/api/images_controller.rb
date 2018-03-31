class Api::ImagesController < ApplicationController
  before_action :authenticate_user!

def update_logo
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    file = params[:file]
    begin
      ext = File.extname(file.tempfile)
      obj = s3.bucket(s3_bucket).object("logos/#{@setting.id}#{ext}")
      obj.upload_file(file.tempfile, acl: 'public-read')
      @images.logo_url = obj.public_url
      if @setting.save
        render json: @setting
      else 
        render json: { errors: @setting.errors.full_messages }, status: 422
      end 
    rescue => e 
      render json: {errors: e}, status: 422
    end 
  end 
  
  def index
  end

  def show
  end

  def destroy
  end
end
