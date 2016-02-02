class AddAttachmentLoopVideoToLoops < ActiveRecord::Migration
  def self.up
    change_table :loops do |t|
      t.attachment :loop_video
    end
  end

  def self.down
    remove_attachment :loops, :loop_video
  end
end
