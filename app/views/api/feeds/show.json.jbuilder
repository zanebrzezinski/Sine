json.array!(@loops) do |loop|
  json.partial!("api/loops/loop", loop: loop)
end
