class ContactMailer < ApplicationMailer

  def welcome_email(email)
    @email = email
    admin = 'SSylvester@uvu.edu'
    mail(to: admin, subject: 'You have a new message')
  end
end
