class RemoveCommentFromUser < ActiveRecord::Migration
  def change
    remove_reference :users, :comment, index: true, foreign_key: true
  end
end
