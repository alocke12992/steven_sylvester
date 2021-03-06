class CreateCourses < ActiveRecord::Migration[5.1]
  def change
    create_table :courses do |t|
      t.string :title
      t.string :syllabus
      t.belongs_to :university, foreign_key: true

      t.timestamps
    end
  end
end
