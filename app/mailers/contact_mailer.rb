class ContactMailer < ApplicationMailer

  def contact_email(email, admin)
    @email = email
    @admin = admin.email
    mail(to: @admin, subject: 'You have a new message')
  end

  def welcome_email(email)
    @email = email
    user = @email.email_address
    mail(to: user, subject: 'Thanks for connecting!')
  end
end
