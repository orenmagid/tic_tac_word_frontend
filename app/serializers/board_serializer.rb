class BoardSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :status, :score, :play_date, :r1c1, :r1c2, :r1c3, :r2c1, :r2c2, :r2c3, :r3c1, :r3c2, :r3c3
  belongs_to :user
end
