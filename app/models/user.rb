class User < ApplicationRecord
  has_many :user_words
  has_many :words, through: :user_words
  has_many :boards
end
