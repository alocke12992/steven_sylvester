class Api::PublicationsController < ApplicationController
  before_action :set_publication, only: [:show, :update, :destroy]
  
  def index
    render json: Publication.all.order(created_at: :desc)
  end

  def show
    render json: @publication
  end

  def new
  end 

  def create
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    publication = Publication.new(publication_params)
    publication.title = params[:title]
    publication.authors = params[:authors]
    publication.abstract = params[:abstract]
    publication.journal = params[:journal]
    publication.links = params[:links]
    publication.date = params[:date]
    publication.pub_type = params[:pub_type]
    file = params[:file]
    begin
      if !file.blank?
        ext = File.extname(file.tempfile)
        obj = s3.bucket(s3_bucket).object("publications/#{publication.id}#{ext}")
        obj.upload_file(file.tempfile, acl: 'public-read' )
        publication.file = obj.public_url
      end
      if publication.save
				render json: publication
			else
				handle_error(publication)
			end
    rescue => e
			render json: { errors: e }, status: 422
		end
  end

def update
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    @publication.title = params[:title]
    @publication.authors = params[:authors]
    @publication.abstract = params[:abstract]
    @publication.journal = params[:journal]
    @publication.links = params[:links]
    @publication.date = params[:date]
    @publication.pub_type = params[:pub_type]
    file = params[:file]
    begin
      if !file.blank? 
        ext = File.extname(file.tempfile)
        obj = s3.bucket(s3_bucket).object("publications/#{@publication.id}#{ext}")
        obj.upload_file(file.tempfile, acl: 'public-read')
        @publication.file = obj.public_url
      end 
      if @publication.save
        render json: @publication
      else
        render json: { errors: @publication.errors.full_messages.join(',') }, status: 422
      end
    rescue => e 
      render json: {errors: e}, status: 422
    end
  end


  def destroy
    @publication.destroy
  end

  private
    def set_publication
      @publication = Publication.find(params[:id])
    end

    def publication_params
      params.permit(:title, :abstract, :authors, :file, :journal, :links, :date, :pub_type )
    end
end
