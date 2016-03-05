json.array!(@comments) do |comment|
  json.extract! comment, :id, :author_id, :body, :rating, :taco_id
  json.url comment_url(comment, format: :json)
end
