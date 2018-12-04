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

ActiveRecord::Schema.define(version: 2018_12_04_202630) do

  create_table "friend_gifts", force: :cascade do |t|
    t.integer "friend_id"
    t.integer "gift_id"
  end

  create_table "friends", force: :cascade do |t|
    t.string "name"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "gift_status"
    t.integer "amount_spent"
  end

  create_table "gifts", force: :cascade do |t|
    t.integer "user_id"
    t.string "name"
    t.string "link"
    t.integer "price"
    t.string "status"
    t.integer "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "friend_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.integer "budget"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "amount_spent"
  end

end
