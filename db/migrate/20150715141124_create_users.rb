class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, null: false, uniqueness: true
      t.string :password_digest, null: false
      t.string :gotchi_name, null: false
      t.datetime :last_login

      t.timestamps null: false
    end
  end
end
