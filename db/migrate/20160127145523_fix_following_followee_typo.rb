class FixFollowingFolloweeTypo < ActiveRecord::Migration
  def change
    rename_column :followings, :folowee_id, :followee_id
  end
end
