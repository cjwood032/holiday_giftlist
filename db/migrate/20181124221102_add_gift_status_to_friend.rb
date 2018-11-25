class AddGiftStatusToFriend < ActiveRecord::Migration[5.2]
  def change
    change_table :friends do |t|
      t.string :gift_status
    end
  end
end
