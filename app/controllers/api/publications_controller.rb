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
    file = params[:file]
    begin
      obj = s3.bucket(s3_bucket).object("publications/#{file.original_filename}")
      obj.upload_file(file.tempfile, acl: 'public-read' )
      publication.file = obj.public_url
      if publication.save
				render json: publication
			else
				handle_error(publication)
			end
    rescue => e
      binding.pry
			render json: { errors: e }, status: 422
		end
  end

  def update
    if @publication.update(research_params)
      render json: @publication
    else
      render json: { errors: @publication.errors.full_messages.join(',') }, status: 422
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
      params.permit(:title, :abstract, :authors, :file, :journal, :links, :date)
    end
end
