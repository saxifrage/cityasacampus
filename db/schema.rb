# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150320184050) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "opportunity_instances", force: :cascade do |t|
    t.string   "name"
    t.text     "address"
    t.text     "description"
    t.string   "registration_url"
    t.string   "location_name"
    t.datetime "registration_deadline"
    t.string   "program_type"
    t.string   "logo_url"
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.string   "online_address"
    t.string   "zipcode"
    t.string   "city"
    t.string   "state"
    t.boolean  "is_online"
    t.string   "hide_reason"
    t.boolean  "hide"
    t.string   "contact_name"
    t.string   "contact_email"
    t.string   "contact_phone"
    t.integer  "price_level"
    t.integer  "min_age"
    t.integer  "max_age"
    t.text     "extra_data"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

end
