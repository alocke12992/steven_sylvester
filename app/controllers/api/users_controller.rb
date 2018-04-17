class Api::UsersController < ApplicationController
  before_action :authenticate_user!

    def update
      current_user.name = params[:name]
      current_user.email = params[:email]
    if current_user.save
      render json: current_user
    else
      render json: { errors: current_user.errors.full_messages.join(',') }, status: 422
    end
  end
end
