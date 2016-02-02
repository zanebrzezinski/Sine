# Schema Information

## loops
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
loop_url    | string    | not null, unique
author_id   | integer   | not null, foreign key (references users), indexed

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
loop_id     | integer   | not null, foreign key (references loops)
liker_id    | integer   | not null, foreign key (references users)

## reposts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
loop_id     | integer   | not null, foreign key (references loops)
reposter_id | integer   | not null, foreign key (references users), indexed

## followings

column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foreign key (references users)
followee_id | integer   | not null, foreign key (references users)

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
tag         | string    | not null


## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
loop_id     | integer   | not null, foreign key (references loops), indexed
tag_id      | integer   | not null, foreign key (references tags), indexed


## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
comment     | text      | not null
Author_id   | integer   | not null, foreign key (references users)

## commentings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
Comment_id  | integer   | not null, foreign key (references comments)
Loop_id     | integer   | not null, foreign key (references loop)

## notifications
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
Event_id    | integer   | not null, foreign key (references comment/like/reposting as determined by event_type)
Event_type  | string    | not null
User_id     | integer   | not null, foreign key (references users)


## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
