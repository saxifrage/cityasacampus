class CreateOpportunities < ActiveRecord::Migration
  def change
    create_table :opportunities do |t|
      t.string :name
      t.text :address
      t.text :description
      t.string :registration_url
      t.string :location_name
      t.datetime :registration_deadline
      t.string :program_type
      t.string :logo_url
      t.datetime :starts_at
      t.datetime :ends_at
      t.string :online_address
      t.string :zipcode
      t.string :city
      t.string :state
      t.boolean :is_online
      t.string :hide_reason
      t.boolean :hide
      t.string :contact_name
      t.string :contact_email
      t.string :contact_phone
      t.string :registration_url
      t.integer :price_level
      t.integer :min_age
      t.integer :max_age
      t.text :extra_data

      t.timestamps null: false
    end
  end
end
