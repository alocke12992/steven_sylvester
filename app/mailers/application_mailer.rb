class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'

  class ContactMailer < ApplicationMailer
  end
end
