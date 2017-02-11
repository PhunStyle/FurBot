<a name="3.4.2" />
## 3.4.2 (February 11th, 2016)

### Bug Fixes
- Fixed `!chat`
- Fixed `!gelbooru`

<a name="3.4.1" />
## 3.4.1 (January 21st, 2016)

### Bug Fixes
- Fixed `!chat`.

<a name="3.4.0" />
## 3.4.0 (January 18th, 2016)

### Features
- Added Google Translate to the `!translate` command.

### Bug Fixes
- Fixed a bug that caused a SIGSEGV error, causing FurBot to restart - making the experimental prune command useless.
- Fixed a bug that caused a help text error for the `!pokemon` command. If it has no suffix it should now properly display usage.


<a name="3.3.3" />
## 3.3.3 (January 16th, 2016)

### Features
- Added a more forgiving search to the pokedex, it now tries to fix your spelling errors!

### Bug Fixes
- Removed some overhead from the lewd commands
- Fixed a bug that caused Errors in the log file
- Fixed a bug that allowed the `!e6` command to be repeated more than the allowed number of times

<a name="3.3.2" />
## 3.3.2 (January 12th, 2016)

### Technical Features
- Hopefully optimized a lot of the lewd commands, they should also be less large and bulky now.
- Optimized all the commands that use embeds.

<a name="3.3.1" />
## 3.3.1 (January 11th, 2016)

### Bug Fixes
- Fixed `!db` returning a TypeError, new API rules since yesterday. You can only search for 2 tags on Danbooru at once now!
- Fixed `!youtube` command returning an error.

<a name="3.3.0" />
## 3.3.0 (January 10th, 2016)

### Features
- Added about 30 more `!emoji` responses
- Several command output responses have been streamlined to use Icons
- REMOVED `!butts` - Feature was not furry enough!
- REMOVED `!boobs` - Feature was not furry enough!
- Updated `!help`, `!info` and `!feedback`

- ADDED NSFW Commands Filtering, you now need to enable channels to use NSFW commands by typing `!setnsfw`.

### Bug Fixes
- Fixed some random ass bugs.

### Technical Note
I noticed FurBot crashed last night - not sure why. If you see errors or anything use the feedback or info commands to get in touch.

<a name="3.2.4" />
## 3.2.4 (January 10th, 2016)

### Bug Fixes
- Fixed tag limit to all lewd commands, maximum is now 6
- Fixed changelog `!version` command. Should now display properly

### Technical Note
I have seen FurBot crash and i am trying to figure out why - for now the bot may randomly go offline which is something i really hate seeing. I will try to keep a close eye on things moving forward.

<a name="3.2.3" />
## 3.2.3 (January 9th, 2016)

### Features
- Added more `!emoji` responses
- More icons to several command responses
- REMOVED `!butts`
- REMOVED `!boobs`
- Updated `!help`, `!info` and `!feedback`

### Bug Fixes
- Fixed konachan returning `Error: "Bad Request"`

### Technical Features
- NSFW Restrictions coming soonTM?

<a name="3.2.2" />
## 3.2.2 (December 13th, 2016)

### Features
- `!kc` Search konachan.com for images
- `!yd` Search yande.re for images
- `!help lewd` Get information about all the lewd commands
- `!pokemon` Get information about a pokemon (sorry, no gen 7!)
- Improved `!ping`, `!userinfo`, `!channelinfo` and `!serverinfo` commands
- `!butts` command for irl butts
- `!boobs` command for irl boobs

### Bug Fixes
- Fixed pokedex not searching capitalized pokemon names and wrong stats!
- Fixed long standing bug that would output a commandline error message when using a non-existing tag on the lewd commands
- Fixed !chat command
- Fixed !feedback command

### Technical Features
- Added admin command to set the game FurBot is playing
- Created a server for FurBot, type "!feedback" without anything else to get the invite link
