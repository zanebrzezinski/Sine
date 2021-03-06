## Design Documentation
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./views.md
[schema]: ./schema.md


## Minimum Viable Product

Sine is a web application inspired by Vine built using Ruby on rails and React.js.  Sine allows the user to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, watch, and delete loops. Edit loop meta-data.
- [ ] Like and repost other users loops
- [ ] Tag loops with tags
- [ ] Search through loops by title and tags
- [ ] Scroll through a feed of loops by other users
- [ ] Follow other users
- [ ] Comment on posts
- [ ] Set an avatar image

## Implementation Timeline

### Phase 1: Sign Up / Log in, JSON Api (1.5 days)

In Phase 1, I will set up the standard user signup/sign in authentication using
BCrypt.  I will create a json API to create a list of loops posted by the user(index).
I will also create a json API to send the data for individual loops which will
populate the index view (show). Finally, I will implement a feed model which will
create an index view to display all loops relevant to a user as determined by
the users he is following and the posts he has made.


[Details][phase-one]

### Phase 2: Flux Architecture and Loop CRUD (2.5 days)

Phase 2 will implement the basic Flux and React architecture for the app as a
whole.  Each loop will be rendered as a
react component, and the User index (userloops) as a whole will be rendered as a list of the loop
components.  There will also be an upload page for loops, which will allow a
user to upload a loop and set the data on it such as tags.  At the end of Phase
2, a user will be able to create, view edit and destroy his own loops,
and view an index of his own posted loops.

[Details][phase-two]

### Phase 3: Social Functionality and Feed (2.5 days)

Phase 3 will be where the loop's social functionality is implemented.  The user will
have a feed, consisting of an index of the loops that he has posted and the loops from
the users who he follows.  Each loop will be able to be commented on and liked,
as well as re-posted to all users feeds who follow the current-user. Reposted loops will
indicate which user reposted them.  Likes will indicate how many people liked a post
and who liked it. Comments will be displayed below the loop. A user page will now
also have a view to watch all of a users liked loops.

[Details][phase-three]

### Phase 4: Notifications (.5 days)

When a user has a loop liked or reposted, he will get a notification blip that
informs him of which vine was interacted with, by whom, and it what manner (like or repost).
The blip will consist of a bubble informing the user of how many notifications he has.
When the user clicks the bubble, a drop down will inform the user of the full
information.


[Details][phase-four]

### Phase 5: Search (1 day)

In phase 5 I will add the ability to create a new feed view with loops determined by
a search of titles or of taggings.  The relevant videos will populate a new feed
which the user will be able to like, repost, and interact with as normal.

[Details][phase-five]

### Phase 6: Styling & Seeding (1 day)

Because of the nature of videos, it will probably take a while to get sufficient videos
to seed the database.  I will use this last day to continue adding seeds to the database
and continue tweaking stylings on the page.

[phase-one]: ./phases/phase1.md
[phase-two]: ./phases/phase2.md
[phase-three]: ./phases/phase3.md
[phase-four]: ./phases/phase4.md
[phase-five]: ./phases/phase5.md
