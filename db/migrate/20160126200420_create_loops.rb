class CreateLoops < ActiveRecord::Migration
  def change
    create_table :loops do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.integer :author_id, null: false
      t.timestamps null: false
    end
  end
end
