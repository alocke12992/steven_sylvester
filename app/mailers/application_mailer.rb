class ApplicationMailer < ActionMailer::Base
  default from: 'testforrailsmailer@gmail.com'
  layout 'mailer'

  class ContactMailer < ApplicationMailer
  end
end
