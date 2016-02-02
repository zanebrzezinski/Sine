class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :loop_id, null: false
      t.integer :liker_id, null: false
      
      t.timestamps null: false
    end
  end
end
