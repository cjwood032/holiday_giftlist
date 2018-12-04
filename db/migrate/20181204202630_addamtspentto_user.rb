class AddamtspenttoUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :amount_spent, :integer
  end
end
