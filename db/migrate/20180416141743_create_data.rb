class CreateData < ActiveRecord::Migration[5.1]
  def change
    create_table :data do |t|
      t.string :title
      t.string :file
      t.text :description

      t.timestamps
    end
  end
end
