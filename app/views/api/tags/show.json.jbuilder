json.tag @tag.tag

json.loops do
  json.array!(@loops) do |loop|
    json.partial!("api/loops/loop", loop: loop)
  end
end
