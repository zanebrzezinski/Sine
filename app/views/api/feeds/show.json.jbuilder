json.array!(@loops) do |loop|
  json.partial!("loops/loop", loop: loop)
end
