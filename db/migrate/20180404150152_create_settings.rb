class CreateSettings < ActiveRecord::Migration[5.1]
  def change
    create_table :settings do |t|
      t.string :pdf_url, default: 'https://s3.amazonaws.com/sylvester/Cv/cv.pdf'
      t.string :avatar_url, default: 'https://s3.amazonaws.com/sylvester/images/profile.jpg'
      t.timestamps
    end
  end
end
