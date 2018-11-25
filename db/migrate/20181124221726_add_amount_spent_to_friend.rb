class AddAmountSpentToFriend < ActiveRecord::Migration[5.2]
  def change
    change_table :friends do |t|
      t.integer :amount_spent
    end
  end
end
