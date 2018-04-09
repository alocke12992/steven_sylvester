class Api::EmailsController < ApplicationController
  
   def create
    @email = Email.new(email_params)
    @email.first_name = params[:first]
    @email.last_name = params[:last]
    @email.email_address = params[:email]
    respond_to do |format|
      if @email.save
        # Tell the emailMailer to send a welcome email after save
        ContactMailer.welcome_email(@email).deliver_now
 
        format.html { redirect_to(@email, notice: 'email was successfully created.') }
        format.json { render json: @email, status: :created, location: @email }
      else
        format.html { render action: 'new' }
        format.json { render json: @email.errors, status: :unprocessable_entity }
      end
    end 
  end 

  private

  def email_params
    params.permit(:first_name, :last_name, :subject, :email_address, :content)
  end 
end
