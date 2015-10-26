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

ActiveRecord::Schema.define(version: 20151214180556) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pg_trgm"

  create_table "grids", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "map_id",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "grids", ["map_id"], name: "index_grids_on_map_id", using: :btree

  create_table "maps", force: :cascade do |t|
    t.integer  "organizer_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "maps", ["organizer_id"], name: "index_maps_on_organizer_id", using: :btree

  create_table "nodes", force: :cascade do |t|
    t.integer  "pathway_id",     null: false
    t.integer  "opportunity_id", null: false
    t.integer  "position",       null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "nodes", ["opportunity_id"], name: "index_nodes_on_opportunity_id", using: :btree
  add_index "nodes", ["pathway_id"], name: "index_nodes_on_pathway_id", using: :btree

  create_table "opportunities", force: :cascade do |t|
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
    t.integer  "organizer_id"
    t.integer  "topic_id"
    t.string   "badge_class_id"
    t.integer  "resource_sub_type_id"
  end

  add_index "opportunities", ["organizer_id"], name: "index_opportunities_on_organizer_id", using: :btree
  add_index "opportunities", ["resource_sub_type_id"], name: "index_opportunities_on_resource_sub_type_id", using: :btree
  add_index "opportunities", ["topic_id"], name: "index_opportunities_on_topic_id", using: :btree

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
    t.integer  "opportunity_id"
    t.integer  "venue_id"
    t.boolean  "ongoing"
    t.integer  "price"
    t.string   "url"
    t.string   "external_url"
    t.boolean  "listed"
    t.integer  "topic_id"
    t.text     "short_description"
    t.string   "neighborhood"
    t.integer  "duration"
    t.integer  "difficulty"
    t.integer  "resource_sub_type_id"
  end

  add_index "opportunity_instances", ["difficulty"], name: "index_opportunity_instances_on_difficulty", using: :btree
  add_index "opportunity_instances", ["duration"], name: "index_opportunity_instances_on_duration", using: :btree
  add_index "opportunity_instances", ["opportunity_id"], name: "index_opportunity_instances_on_opportunity_id", using: :btree
  add_index "opportunity_instances", ["resource_sub_type_id"], name: "index_opportunity_instances_on_resource_sub_type_id", using: :btree
  add_index "opportunity_instances", ["topic_id"], name: "index_opportunity_instances_on_topic_id", using: :btree
  add_index "opportunity_instances", ["venue_id"], name: "index_opportunity_instances_on_venue_id", using: :btree

  create_table "organizer_users", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",      null: false
    t.integer  "organizer_id", null: false
  end

  add_index "organizer_users", ["organizer_id", "user_id"], name: "index_organizer_users_on_organizer_id_and_user_id", using: :btree

  create_table "organizers", force: :cascade do |t|
    t.string   "name",             null: false
    t.string   "description",      null: false
    t.string   "url"
    t.string   "logo_url"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "draft_map_id"
    t.integer  "published_map_id"
  end

  add_index "organizers", ["name"], name: "index_organizers_on_name", using: :btree

  create_table "pathways", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "grid_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "pathways", ["grid_id"], name: "index_pathways_on_grid_id", using: :btree

  create_table "resource_sub_types", force: :cascade do |t|
    t.string  "name"
    t.integer "resource_type_id"
  end

  add_index "resource_sub_types", ["resource_type_id"], name: "index_resource_sub_types_on_resource_type_id", using: :btree

  create_table "resource_types", force: :cascade do |t|
    t.string "name"
  end

  create_table "topics", force: :cascade do |t|
    t.string   "name"
    t.string   "short_name"
    t.string   "child_of_topic"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "name",                                     null: false
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                                      null: false
    t.json     "tokens"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

  create_table "venues", force: :cascade do |t|
    t.string   "name"
    t.string   "url"
    t.string   "neighborhood"
    t.string   "map_url"
    t.text     "address"
    t.string   "latitude"
    t.string   "longitude"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "organizer_id"
  end

  add_index "venues", ["organizer_id"], name: "index_venues_on_organizer_id", using: :btree

  add_foreign_key "grids", "maps"
  add_foreign_key "maps", "organizers"
  add_foreign_key "nodes", "opportunities"
  add_foreign_key "nodes", "pathways"
  add_foreign_key "opportunities", "topics"
  add_foreign_key "opportunity_instances", "topics"
  add_foreign_key "opportunity_instances", "venues"
  add_foreign_key "organizers", "maps", column: "draft_map_id"
  add_foreign_key "organizers", "maps", column: "published_map_id"
  add_foreign_key "pathways", "grids"
  add_foreign_key "venues", "organizers"
end
