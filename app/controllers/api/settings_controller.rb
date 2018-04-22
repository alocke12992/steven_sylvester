class Api::SettingsController < ApplicationController
   before_action :set_setting, only: [:update, :update_cv, :update_avatar]

  def index 
    settings = Setting.all.first
    render json: settings
  end

  def update_cv 
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    file = params[:file]
    begin
      obj = s3.bucket(s3_bucket).object("cvs/#{file.original_filename}")
      obj.upload_file(file.tempfile, acl: 'public-read')
      @setting.pdf_url = obj.public_url
      if @setting.save
        render json: @setting
      else 
        render json: { errors: @setting.errors.full_messages }, status: 422
      end 
    rescue => e 
      render json: {errors: e}, status: 422
    end 
  end 

  def update_avatar
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    file = params[:file]
    begin
      ext = File.extname(file.tempfile)
      obj = s3.bucket(s3_bucket).object("avatars/#{@setting.id}#{ext}")
      obj.upload_file(file.tempfile, acl: 'public-read')
      @setting.avatar_url = obj.public_url
      if @setting.save
        render json: @setting
      else 
        render json: { errors: @setting.errors.full_messages }, status: 422
      end 
    rescue => e 
      render json: {errors: e}, status: 422
    end 
  end

  private 

  def set_setting
    @setting = Setting.find(params[:id])
  end 

  def setting_params
      params.require(:settings).permit(:pdf_url, :avatar_url)
  end 

end
