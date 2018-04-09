class ContactMailer < ApplicationMailer

  def welcome_email(email)
    @email = email
    @url = 'http://theandrewlocke.com'
    mail(to: @email.email_address, subject: 'Thanks for your email')
  end
end
