# @helperdiscord/centra

A cool library to use for rest requests in nodejs :) <a href="https://helperdiscord.github.io/centra/">docs</a>

## Examples

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

const res = await req('https://discord.com/api/gateway').json<Gateway>();
```

## @helperdiscord/centra vs other http libraries

#### Here's a size comparison table:

Here you can see how efficient @helperdiscord/centra is compared in bundle size to other libraries

Package | Size
--- | ---
request | [![request package size](https://packagephobia.now.sh/badge?p=request)](https://packagephobia.now.sh/result?p=request)
superagent | [![superagent package size](https://packagephobia.now.sh/badge?p=superagent)](https://packagephobia.now.sh/result?p=superagent)
got | [![got package size](https://packagephobia.now.sh/badge?p=got)](https://packagephobia.now.sh/result?p=got)
axios | [![axios package size](https://packagephobia.now.sh/badge?p=axios)](https://packagephobia.now.sh/result?p=axios)
isomorphic-fetch | [![isomorphic-fetch package size](https://packagephobia.now.sh/badge?p=isomorphic-fetch)](https://packagephobia.now.sh/result?p=isomorphic-fetch)
r2 | [![r2 package size](https://packagephobia.now.sh/badge?p=r2)](https://packagephobia.now.sh/result?p=r2)
node-fetch | [![node-fetch package size](https://packagephobia.now.sh/badge?p=node-fetch)](https://packagephobia.now.sh/result?p=node-fetch)
phin | [![phin package size](https://packagephobia.now.sh/badge?p=phin)](https://packagephobia.now.sh/result?p=phin)
@helperdiscord/centra | [![@helperdiscord/centra package size](https://packagephobia.now.sh/badge?p=@helperdiscord/centra)](https://packagephobia.now.sh/result?p=@helperdiscord/centra)

---

#### Here's a performance comparison of @helperdiscord/centra vs other http libraries

These results were procured using [this](https://github.com/helperdiscord/http-benchmarks)


```
Results (i7-7700k, CPU governor: performance):
got - promise x 2,770 ops/sec ±6.67% (71 runs sampled)
request - callback x 4,888 ops/sec ±7.46% (74 runs sampled)
node-fetch - promise x 5,457 ops/sec ±3.33% (74 runs sampled)
centra - promise x 8,263 ops/sec ±2.10% (84 runs sampled)
https - stream x 7,453 ops/sec ±3.19% (78 runs sampled)
@helperdiscord/centra - promise x 8,202 ops/sec ±1.30% (82 runs sampled)
Fastest is @helperdiscord/centra - promise
```