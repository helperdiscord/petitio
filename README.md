# @helperdiscord/centra

A cool library to use for rest requests in nodejs :) <a href="https://helperdiscord.github.io/centra/">docs</a>

Examples

Basic GET Request

```js
const req = require('@helperdiscord/centra');

const res = await req('https://discord.com/api/gateway').json()

console.log(res);
 
// { url: 'wss://gateway.discord.gg' }

```

Simple POST Request with payload

```js
const req = require('@helperdiscord/centra');

const res = await req('https://discord.com/api/channels/418933739540840451/messages', 'POST').body({ content: 'hi' }).header({ 'Authorization': 'Bot youryoken' }).json()

console.log(res);

/* {
  id: '805925621561163806',
  type: 0,
  content: 'hi',
  channel_id: '418933739540840451',
  author: [Object],
  attachments: [],
  embeds: [],
  mentions: [],
  mention_roles: [],
  pinned: false,
  mention_everyone: false,
  tts: false,
  timestamp: '2021-02-01T22:20:41.554000+00:00',
  edited_timestamp: null,
  flags: 0,
  referenced_message: null
} */
```

Type casting json responses

```ts
import req from '@helperdiscord/centra';

type Gateway {
    url: string
}

const res = await req<Gateway>('https://discord.com/api/gateway').json();
```