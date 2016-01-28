json.extract! @loop, :id, :title, :url, :author_id, :created_at
json.author @loop.author.username
