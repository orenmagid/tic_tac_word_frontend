class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.integer :user_id
      t.string :status
      t.integer :score
      t.string :r1c1
      t.string :r1c2
      t.string :r1c3
      t.string :r2c1
      t.string :r2c2
      t.string :r2c3
      t.string :r3c1
      t.string :r3c2
      t.string :r3c3

      t.timestamps
    end
  end
end
