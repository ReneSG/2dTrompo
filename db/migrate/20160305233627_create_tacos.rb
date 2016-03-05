class CreateTacos < ActiveRecord::Migration
  def change
    create_table :tacos do |t|
      t.string :name
      t.string :image
      t.integer :rating
      t.references :comment, index: true, foreign_key: true
      t.decimal :lattitude
      t.decimal :longitude

      t.timestamps null: false
    end
  end
end
