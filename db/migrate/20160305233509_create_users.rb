class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.references :comment, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
