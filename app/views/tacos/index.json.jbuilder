json.array!(@tacos) do |taco|
  json.extract! taco, :id, :name, :image, :rating, :comment_id, :lattitude, :longitude
  json.url taco_url(taco, format: :json)
end
