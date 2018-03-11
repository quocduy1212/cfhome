class CreateBookmarks < ActiveRecord::Migration[5.1]
  def change
    create_table :bookmarks do |t|
      t.string :name
      t.string :base
      t.string :symbol
      t.string :exchange
      t.string :note
      t.string :user_id

      t.timestamps
    end
  end
end
