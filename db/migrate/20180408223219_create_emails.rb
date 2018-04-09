class CreateEmails < ActiveRecord::Migration[5.1]
  def change
    create_table :emails do |t|
      t.string :first_name
      t.string :last_name
      t.string :email_address
      t.string :subject
      t.text :content

      t.timestamps
    end
  end
end
