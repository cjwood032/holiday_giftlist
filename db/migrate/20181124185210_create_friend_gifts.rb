class CreateFriendGifts < ActiveRecord::Migration[5.2]
  def change
    create_table :friend_gifts do |t|
      t.integer "friend_id"
      t.integer "gift_id"
    end
  end
end
