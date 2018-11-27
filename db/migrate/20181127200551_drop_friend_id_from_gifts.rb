class DropFriendIdFromGifts < ActiveRecord::Migration[5.2]
  def change
    remove_column :gifts, :friend_id
  end
end
