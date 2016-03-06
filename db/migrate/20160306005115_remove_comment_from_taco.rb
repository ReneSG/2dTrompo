class RemoveCommentFromTaco < ActiveRecord::Migration
  def change
    remove_reference :tacos, :comment, index: true, foreign_key: true
  end
end
