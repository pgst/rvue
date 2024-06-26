class Occupation < ApplicationRecord
  belongs_to :user
  belongs_to :room
  scope :owned_by_user, ->(user_id) { where('user_id = ?', user_id) }
end
