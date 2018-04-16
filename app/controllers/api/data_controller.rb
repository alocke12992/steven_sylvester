class Api::DataController < ApplicationController

  before_action :set_datum, only: [:show, :update, :destroy]
  
  def index
    render json: Datum.all.order(created_at: :desc)
  end

  def show
    render json: @datum
  end

  def new    
  end 

  def create
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    datum = Datum.new(datum_params)
    datum.title = params[:title]
    datum.description = params[:description]
    file = params[:file]
    begin
      if !file.blank?
        ext = File.extname(file.tempfile)
        obj = s3.bucket(s3_bucket).object("data/#{datum.id}#{ext}")
        obj.upload_file(file.tempfile, acl: 'public-read' )
        datum.file = obj.public_url
      end
      if datum.save
				render json: datum
			else
				handle_error(datum)
			end
    rescue => e
			render json: { errors: e }, status: 422
		end
  end

def update
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    @datum.title = params[:title]
    @datum.description = params[:description]
    file = params[:file]
    begin
      if !file.blank? 
        ext = File.extname(file.tempfile)
        obj = s3.bucket(s3_bucket).object("data/#{@datum.id}#{ext}")
        obj.upload_file(file.tempfile, acl: 'public-read')
        @datum.file = obj.public_url
      end 
      if @datum.save
        render json: @datum
      else
        render json: { errors: @datum.errors.full_messages.join(',') }, status: 422
      end
    rescue => e 
      render json: {errors: e}, status: 422
    end
  end


  def destroy
    @datum.destroy
  end

  private
    def set_datum
      @datum = Datum.find(params[:id])
    end

    def datum_params
      params.permit(:title, :description, :file,  )
    end
end

