class Add < ActiveRecord::Migration[5.2]
  def change
    add_column :gifts, :friend_id, :integer
  end
end
