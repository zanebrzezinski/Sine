# Sine

[Sine][http://sine-app.heroku.com]

Sine is a web application built with Ruby on Rails, PostgreSQUL, and React.js,
that allows users to upload and view short loops of video content, as well as
liking, reposting, and commenting on the posts along with following other users.

### Main Functionality:

* Upload videos, which will be cropped to the assigned length and uploaded on the
server side
* Liking, reposting, and commenting on Loops.
* Viewing of feeds, user feeds, and a feed consisting of all uploaded loops.
* Sign up with profile picture and default profile picture if none is provided.
* Tagging loops and fetching a feed of loops with that tag.

### Additional Features
* Authentication with Rails and React integration.
* Server side search and pagination.
* AWS integration for asset storage.
* Server side trimming of loops with FFMPEG and saving of only trimmed assets
to preserve server space.


[Design Documentation][Design Documentation]
[Design Documentation]: ./docs/Design_documentation.md
