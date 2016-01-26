class CreateFollowing < ActiveRecord::Migration
  def change
    create_table :followings do |t|
      t.integer :follower_id, null: false
      t.integer :folowee_id, null: false

      t.timestamps
    end
  end
end
