<a name="4.3.4" />

# 4.3.4 (March 11th, 2018)

### Features
- [NEW] `axlotl` animal command. Thanks to `Kuroha` and `Adrienne`!!

### Bug Fixes
- [FIX] If you have blacklist strictness off and you find an e6 image with a matched tag, it will now tell you what tag it matched first. Thanks `SockHungryClutz`!


<a name="4.3.3" />

# 4.3.3 (March 9th, 2018)

### Features
- [NEW] `wolf` animal command. Thanks to @Flare#0001!

### Bug Fixes
- [FIX] `poll` command now working properly. Thanks for reporting that Xavienth#0536!
- [FIX] The error message to wait between commands now removes itself after a while.


<a name="4.3.2" />

# 4.3.2 (January 24th, 2018)

### Features
- FurBot will now show a message if you use a command but aren't yet off cooldown.

### Bug Fixes
- [FIX] `crypto` command now has an error message if it can't find results for your given crypto coin.
- [FIX] `poll` now shows up in the help command list and also returns an error if you use it improperly.
- [FIX] `memelist` showing the old ! command operator.

### Technical Notes
- Changed up some error and success messages. The bot now uses 4 different levels of presenting errors.
  * Success (GREEN) will be for successful responses such as setting a blacklist, pruning messages or kicking members.
  * Information (BLUE) will be for informative messages such as "You have to use this in a server!".
  * Warning (YELLOW) will be for warning you that no results were found or you typed something wrong.
  * Error (RED) will be for when there's an actual error in the code, the command or the website it's searching on.


<a name="4.3.1" />

# 4.3.1 (January 19th, 2018)

### Bug Fixes
- [FIX] `shindan` command. Didn't work in Direct Messages, now it does. [Thanks Surge / Just Apple]
- [FIX] Added the latest champions to `lol` command. [Thanks Atoc_Faerwald]


<a name="4.3.0" />

# 4.3.0 (January 18th, 2018)

### Features
- [NEW] `bun` command in animal commands, posts pictures of adorable bunnies. **I NEED IMAGES FOR THIS. SEND IMGUR ALBUMS TO ME.**
- [NEW] `fox` command in animal commands, posts pictures of adorable foxes. **I NEED IMAGES FOR THIS. SEND IMGUR ALBUMS TO ME.**
- [NEW] `poll` command that allows you to create a strawpoll from within discord.

- **[NEW] `blacklist strict` command.**
This will toggle blacklist strictness in a channel. If it's on, results that match your blacklist will not be shown at all.

### Bug Fixes
- [FIX] `crypto` command, it didn't have 24H Volume in USD yet.
- [FIX] Some code consistency issues in the last few code additions have been addressed.


<a name="4.2.4" />

# 4.2.4 (January 15th, 2018)

### Features
- [NEW] `crypto` command that will look up information, pricing, trends about your given cryptocurrency. Will be improved a little bit in the next update.

### Bug Fixes
- [FIX] `userinfo` `serverinfo` `channelinfo` commands. They weren displaying the (I) image.
- [FIX] Changed image emoji for shindan to be a little more readable
- [FIX] `snake` command will now once again post snakes.
- [FIX] Slight typo in `translate`

### In the next one
- More animal commands (send imgur albums to me if you have tons of pics of a certain animal!)
- Strawpoll command (was gonna add it today but apparently it's a little dead)
- Lewd command optimizations. I'll see what i can do in terms of re-rolling blacklisted tags, showing blacklisted words, etc.


<a name="4.2.3" />

# 4.2.3 (November 23rd, 2017)

### Features
- NEW `shindan` command where you can get a diagnosis on several different topics.
- All of the action commands now use the receivers' nicknames instead of mentions (less spammy, yay!)
- Added more lines to the `hug`, `kiss`, `slap`, `shoot` actions and a nice addition to when you shoot yourself.
- Moderation commands that have a SUCCESS or WARNING response now delete that response after 10 seconds.


<a name="4.2.2" />

# 4.2.2 (November 18th, 2017)

### Features
- Added some random `other` images.. idk.

### Bug Fixes
- Temporarily removed server welcome message because of issues.


<a name="4.2.1" />

# 4.2.1 (November 10th, 2017)

### Features
- Not mentioning a user in the `nickname` command will now change your own nickname (if permitted).
- The `ustats` command is now known as `actions`.

### Bug Fixes
- Fixed `coin` not working properly
- Fixed `advice` not showing up in `help fun`
- Fixed `pet` not showing up in `help actions`
- Fixed `yt` error messages displaying in chat


<a name="4.2.0" />

# 4.2.0 (November 9th, 2017)

### Features
- Added `hearthstone` command that lets you look up Hearthstone card info.
- Added `advice` command that gives you some helpful life advice.

- Added a new command category titled `moderation` with the following additions:
- Added `kick` command that lets you kick users.
- Added `ban` command that lets you ban users.
- Added `softban` command that lets you softban users. This is a ban and immediate unban to remove messages.
- Added `nickname` command that lets you change users' nicknames.
- Added `prune` command in new moderation category that lets you prune messages.

### Bug Fixes
- Fixed `info` and `invite` command showing up twice when you use `help all`.
- Fixed an issue related to DuckDuckGo and showing IP Addresses.
- Slightly rewrote `prune` command.
- Slight fix in `userinfo` to please the linter.

### Technical Notes
- Made huge changes to how bot sharding works. Node now takes args instead of passing shard info in config files.


<a name="4.1.10" />

# 4.1.10 (October 8th, 2017)

### Features
- Improved `userinfo` command. Now shows more stats than ever before! Thanks to `Shax`.


<a name="4.1.9" />

# 4.1.9 (October 7th, 2017)

### Bug Fixes
- Fixed `comics css` (chainsawsuit). It now properly gets comics again.
- Removed `videocall` command since it's integrated into discord now, woo!
- Fixed `urban` just a tiny bit, added a slight amount of formatting.
- Changed `invite` (`join`) command to no longer show a huge link embed.

### Technical Notes
- Bumped node version to 6.11.4 and npm version to 3.10.10 !
- All js files once again conform to our linter.


<a name="4.1.8" />

# 4.1.8 (October 7th, 2017)

### Bug Fixes
- e926 is the safe for work version of e621. Sadly on the programming side it treats it as an extra search tag. FurBot gave an error when you tried to search for 5 tags on e9. This has now been limited to 4 tags and fixed the error. (Fixes #7)


<a name="4.1.7" />

# 4.1.7 (October 6th, 2017)

### Features
- Slightly rewrote the `avatar` command. This now shows you bigger resolution avatars (if available). Thanks to `Fox Wizard`.


<a name="4.1.6" />

# 4.1.6 (October 3rd, 2017)
Some quality of life improvements here, just so the bot functions a little bit better while we put our focus on the re-write.

### Features
- Changed the new bot welcome message completely. Try kicking & re-inviting FurBot if you want to see it in action!
- Changed all lewd commands to include a link to the full post on the source website.
- Changed all lewd commands to tell you if it's a video/webm/flash file or not.

### Bug Fixes
- Fixed the welcome message so it actually works since .generalChannel is no longer a thing.
- Fixed the game status no longer displaying. This should make it easier to see how to get a list of help commands.
- Fixed weather API update (have to stay on old version but hey it works).


<a name="4.1.5" />

# 4.1.5 (August 14th, 2017)

### Features
- Added `pet` action in the action commands. (Also added it to `userstats`). Thanks `@skorpina18`.

### Bug Fixes
- Changed `info` command to grab version from the package file. Idk why i didn't do this a long time ago.
- Fixed `pokemon` command to now differentiate between pokemon forms. Try using `pokemon giratina origin` or `pokemon shaymin sky`. Thanks `@Dragon Shark`.


<a name="4.1.4" />

# 4.1.4 (July 30th, 2017)

### Bug Fixes
- Changed NSFW channel recognition to the new standard that looks for the NSFW setting when you edit channels.

### Technical Notes
- Above bugfix means a change to the dev branch of discordie.


<a name="4.1.3" />

# 4.1.3 (May 24th, 2017)

### Bug Fixes
- Fixed lewd commands shitting out 5 error messages when it can't find one tag but you used a number to repeat the command.

### Technical Notes
- **FurBot's Prefix is now `f.`**
- *Example:* `f.8ball Will i get lucky?`

<a name="4.1.2" />

# 4.1.2 (May 15th, 2017)

### Bug Fixes
- Fixed `!feed` not showing up in help list. Yeah that's about it for this one.


<a name="4.1.1" />

# 4.1.1 (May 13th, 2017)

### Features
- Added more help information to the `!blacklist` command. Should be easier to understand and use now.
- The blacklist command is now `!blacklist` not `!blacklist-set` etc. Anymore. Keep that in mind.
- Added more help information to the lewd commands. Should also be easier to understand.
- Changed `!food` to `!feed`. Made more sense.

### Bug Fixes
- Fixed `!wolfram` with a temporary workaround provided by the npm package. Thanks `@Waggle` for the bug report.
- Fixed `!translate` command. Thanks `@Aserani` and `@Komoru` for bringing that up.
- Fixed `!dota2` command stuff related to roles.
- Temporary fix for `!wiki` it shouldn't spout out a trillion pages worth of information anymore.
- Fixed CHANGELOG.md displaying version number incorrectly.

### Technical Notes
- Updated some code related stuff regarding bracket placement in help export.


<a name="4.1.0" />

# 4.1.0 (May 11th, 2017)

### Features
- Added `!boop` command for those exquisite nose booping moments!
- Added `!kiss` command. Sometimes you just want to smooch someone!
- Added `!ustats` command. Now you can see how many times you've been hugged, booped or fed!
- Added `!e9` command. This will search **e926** for safe for work images. It skips the NSFW check.
- Removed `!chat` command response for now. We'll see how patreon goes and if we need it back.
- Removed some old administrative features.

### Bug Fixes
- Changed `!drama [number]` to also include a popcorn emoji. Before this was only on random drama images.
- Fixed the bot being incapable of having more than 1 character for a prefix.

### Technical Notes
- Updated some package information. More libs are up to date now.

<a name="4.0.1" />
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

### Technical Notes
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

### Technical Notes
I noticed FurBot crashed last night - not sure why. If you see errors or anything use the feedback or info commands to get in touch.


<a name="3.2.4" />

## 3.2.4 (January 10th, 2017)

### Bug Fixes
- Fixed tag limit to all lewd commands, maximum is now 6
- Fixed changelog `!version` command. Should now display properly

### Technical Notes
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

### Technical Notes
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

### Technical Notes
- Added admin command to set the game FurBot is playing
- Created a server for FurBot, type "!feedback" without anything else to get the invite link
