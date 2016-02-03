json.array!(@loops) do |loop|
  json.partial!("loop", loop: loop)
end
