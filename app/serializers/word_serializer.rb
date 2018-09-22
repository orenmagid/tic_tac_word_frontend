class WordSerializer < ActiveModel::Serializer
  attributes :id, :label
  has_many :user_words
  has_many :users, through: :user_words
end
