class CreateResearchInterests < ActiveRecord::Migration[5.1]
  def change
    create_table :research_interests do |t|
      t.string :topic
      t.string :title
      t.text :body

      t.timestamps
    end
  end
end
