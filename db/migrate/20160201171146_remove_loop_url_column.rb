class RemoveLoopUrlColumn < ActiveRecord::Migration
  def change

    remove_column :loops, :url

  end
end
