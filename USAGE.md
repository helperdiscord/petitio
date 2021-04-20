# Examples

### Basic GET Request

```js
const req = require("petitio");

const res = await req("https://discord.com/api/gateway").json()
console.log(res);
 
// { url: "wss://gateway.discord.gg" }
```

### Simple POST Request with payload

```js
const req = require("petitio");

const res = await req("https://discord.com/api/channels/ID/messages", "POST")
	.body({ content: "hi" })
	.header({ "Authorization": "Bot TOKEN" })
	.json();
console.log(res);

/* {
  id: "805925621561163806",
  type: 0,
  content: "hi",
  channel_id: "418933739540840451",
  author: [Object],
  attachments: [],
  embeds: [],
  mentions: [],
  mention_roles: [],
  pinned: false,
  mention_everyone: false,
  tts: false,
  timestamp: "2021-02-01T2220:41.554000+00:00",
  edited_timestamp: null,
  flags: 0,
  referenced_message: null
} */
```

### Type casting JSON responses

```ts
import req from "petitio";

interface Gateway {
    url: string;
}

const res = await req("https://discord.com/api/gateway").json<Gateway>();
```
