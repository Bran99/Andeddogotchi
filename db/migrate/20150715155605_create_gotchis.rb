class CreateGotchis < ActiveRecord::Migration
  def change
    create_table :gotchis do |t|
      t.integer :fullity, null: false, default: 15
      t.integer :rest, null: false, default: 15
      t.integer :age, null: false, default: 1
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
