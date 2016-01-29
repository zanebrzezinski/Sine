json.extract! @loop, :id, :title, :url, :author_id, :created_at
json.author @loop.author.username
json.profile_picture asset_path(@loop.author.profile_picture)
