class CreateCvs < ActiveRecord::Migration[5.1]
  def change
    create_table :cvs do |t|
      t.string :file

      t.timestamps
    end
  end
end
