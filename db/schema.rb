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

ActiveRecord::Schema.define(version: 20150715155605) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "gotchis", force: :cascade do |t|
    t.integer  "fullity",    default: 100, null: false
    t.integer  "rest",       default: 100, null: false
    t.integer  "age",        default: 1,   null: false
    t.integer  "user_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "gotchis", ["user_id"], name: "index_gotchis_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",                                            null: false
    t.string   "password_digest",                                 null: false
    t.string   "gotchi_name",                                     null: false
    t.datetime "last_login",      default: '2015-07-16 23:19:47', null: false
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
  end

  add_foreign_key "gotchis", "users"
end
