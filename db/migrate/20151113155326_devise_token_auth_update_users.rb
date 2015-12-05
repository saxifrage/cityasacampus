class DeviseTokenAuthUpdateUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      ## Required for devise token auth
      t.string :provider, null: false, default: "email"
      t.string :uid
      t.json :tokens
    end

    # update existing users uid to their email address and add a NOT NULL
    # restriction on uid now that it has a value
    User.update_all("uid=email")
    change_column_null :users, :uid, false

    add_index :users, [:uid, :provider], unique: true
  end
end
