class CreateReposts < ActiveRecord::Migration
  def change
    create_table :reposts do |t|
      t.integer :loop_id, null: false
      t.integer :reposter_id, null: false

      t.timestamps null: false
    end
  end
end
