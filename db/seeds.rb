# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

word_array = ["jump", "gun", "fight", "cooperate", "chair", "hair", "care", "dare", "fun", "computer", "steady", "abate", "aberrant", "abjure", "abscond", "abstain", "disinterested", "disparage", "diverge", "impudent", "inadvertent", "precipitate", "zeal", "whimsical", "vexation", "venerate", "tortuous", "timorous", "soporific", "sediment", "placate", "opportunism", "opaque"]


word_array.each do |value|
  Word.create(label: value)
end
