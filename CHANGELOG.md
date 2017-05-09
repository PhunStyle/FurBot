<a name="3.7.2" />
## 4.0.1 (May 9th, 2017)

### Technical Notes
- Changed all the lewd commands to check channel NSFW setting instead of `!setnsfw`. Thus `!setnsfw` has been removed.


<a name="4.0.0" />
## 4.0.0 (April 14th, 2017)

### Features
- New `!info` command layout plus shard specific information
- New `!8ball` command layout
- New `!decide` command layout
- New action commands, type `!help actions` to see them
- Some new `!drama` images
- Changed `!ping` to an embed aswell
- Changed lewd commands to have site icon in footer plus user icon in header
- Changed most command responses to respond with a fancy embed color + icon
- New `!weather` command to lookup the current weather forecast for your place
- New welcome message when FurBot joins a guild for the first time.

### Bug Fixes
- Fixed the dates in the changelog, it's 2017 dammit!
- Fixed google translate API unofficially. Might break again
- Changed `!feedback` to include username so i can chat with you, hi!
- Changed `!{user/server/channel}info` commands embed color to match icon

### Technical Notes
- Moved /data/ folder inside /src/ and renamed it to /static/ (images are there now too)


<a name="3.7.3" />
## 3.7.3 (April 6th, 2017)

### Features
- Divided the bot up in to four shards
- Added shard details to `!info`

### Bug Fixes
- Fixed a bug where the bot would improperly count the total amount of servers and send them to DiscordBots
- Fixed the years in the changelog - ITS TWENTY SEVENTEEN PEOPLE
- Fixed some command line stuff

### To Do
- Will probably do something to some command outputs to make them more logical.
- Will re-visit the lewd commands, they do not show who made certain requests which is bothersome for moderation.


<a name="3.7.2" />
## 3.7.2 (February 27th, 2017)

### Bug Fixes
- Fixed a bug where DerpiBooru could post images in all channels regardless of `!setnsfw`


<a name="3.7.1" />
## 3.7.1 (February 24th, 2017)

### Bug Fixes
- Fixed over 300 code lines to be compliant with the JavaScript linter.


<a name="3.7.0" />
## 3.7.0 (February 22nd, 2017)

### Features
- Changed the lewd commands to only retrieve the tag list for your search once. This should improve performance and not fire as many requests at the target website.
- Added the lewd sites' respective icons to the search results.
- Added a little pokeball icon to `!pokemon` results.

### Bug Fixes
- Updated `!wiki` to their new preferred code style. Nothing changed on user end but it should stop putting errors in my log files now.
- Changed some language strings. Better wording, hooray!


<a name="3.6.0" />
## 3.6.0 (February 16th, 2017)

### Features
- Added blacklisting for the lewd commands. This is a major feature that will allow you to filter out nasty images you don't want to see. However if you're still curious you can click the link at the top of the embed to still visit the site's page with the image on there. (Did you know this was a feature all along? Clicking the tags you searched for?).

### Bug Fixes
- Updated `!chat` but now requires API key. Limited to 5000 calls per month so not sure how long it will last.


<a name="3.5.1" />
## 3.5.1 (February 13th, 2017)

### Features
- Added `!dog` for adorable dogs as a new random animal image thingamabob.

### Bug Fixes
- Added some missing language strings.


<a name="3.5.0" />
## 3.5.0 (February 11th, 2017)

### Features
- Added `!dp` derpibooru image searching to the lewd commands.

### Bug Fixes
- Fixed `!chat`
- Fixed `!gb` gelbooru


<a name="3.4.1" />
## 3.4.1 (January 21st, 2017)

### Bug Fixes
- Fixed `!chat`.


<a name="3.4.0" />
## 3.4.0 (January 18th, 2017)

### Features
- Added Google Translate to the `!translate` command.

### Bug Fixes
- Fixed a bug that caused a SIGSEGV error, causing FurBot to restart - making the experimental prune command useless.
- Fixed a bug that caused a help text error for the `!pokemon` command. If it has no suffix it should now properly display usage.


<a name="3.3.3" />
## 3.3.3 (January 16th, 2017)

### Features
- Added a more forgiving search to the pokedex, it now tries to fix your spelling errors!

### Bug Fixes
- Removed some overhead from the lewd commands
- Fixed a bug that caused Errors in the log file
- Fixed a bug that allowed the `!e6` command to be repeated more than the allowed number of times


<a name="3.3.2" />
## 3.3.2 (January 12th, 2017)

### Technical Features
- Hopefully optimized a lot of the lewd commands, they should also be less large and bulky now.
- Optimized all the commands that use embeds.


<a name="3.3.1" />
## 3.3.1 (January 11th, 2017)

### Bug Fixes
- Fixed `!db` returning a TypeError, new API rules since yesterday. You can only search for 2 tags on Danbooru at once now!
- Fixed `!youtube` command returning an error.


<a name="3.3.0" />
## 3.3.0 (January 10th, 2017)

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
## 3.2.4 (January 10th, 2017)

### Bug Fixes
- Fixed tag limit to all lewd commands, maximum is now 6
- Fixed changelog `!version` command. Should now display properly

### Technical Note
I have seen FurBot crash and i am trying to figure out why - for now the bot may randomly go offline which is something i really hate seeing. I will try to keep a close eye on things moving forward.


<a name="3.2.3" />
## 3.2.3 (January 9th, 2017)

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
