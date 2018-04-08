class Api::SettingsController < ApplicationController
   before_action :set_setting, only: [:update, :update_cv]

  def index 
    settings = Setting.all.first
    render json: settings
  end

  def update_cv 
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    file = params[:file]
    begin
      ext = File.extname(file.tempfile)
      obj = s3.bucket(s3_bucket).object("cvs/#{@setting.id}#{ext}")
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

  private 

  def set_setting
    @setting = Setting.find(params[:id])
  end 

  def setting_params
      params.require(:settings).permit(:pdf_url)
  end 

end
