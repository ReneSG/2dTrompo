json.array!(@users) do |user|
  json.extract! user, :id, :firstname, :lastname, :comment_id
  json.url user_url(user, format: :json)
end
