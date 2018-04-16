class CreatePublications < ActiveRecord::Migration[5.1]
  def change
    create_table :publications do |t|
      t.string :title
      t.text :abstract
      t.string :authors
      t.string :file
      t.string :journal
      t.string :links
      t.string :date
      t.string :pub_type

      t.timestamps
    end
  end
end
