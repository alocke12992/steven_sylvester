class Api::PasswordsController < ApplicationController
  before_action :authenticate_user! 
  def set_new_password
    if current_user && current_user.reset_password(params[:password], params[:passwordConfirmation])
      render json: 'Password changed successfully.'
    else   
      unprocessable('Error changing password. Try again')
    end
  end
end
