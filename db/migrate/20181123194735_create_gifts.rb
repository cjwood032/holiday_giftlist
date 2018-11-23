class CreateGifts < ActiveRecord::Migration[5.2]
  def change
    create_table :gifts do |t|
      t.integer :user_id
      t.integer :friend_id
      t.string :name
      t.string :link
      t.integer :price
      t.string :status
      t.integer :quantity
      t.timestamps
    end
  end
end
