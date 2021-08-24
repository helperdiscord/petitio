---
id: "PetitioRequest.PetitioRequest-1"
title: "Class: PetitioRequest"
sidebar_label: "PetitioRequest"
custom_edit_url: null
---

[PetitioRequest](../modules/PetitioRequest.md).PetitioRequest

## Constructors

### constructor

• **new PetitioRequest**(`url`, `httpMethod?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `url` | `string` \| `URL` | `undefined` | The URL to start composing a request for. |
| `httpMethod` | [`HTTPMethod`](../modules/PetitioRequest.md#httpmethod) | `"GET"` | - |

#### Defined in

[lib/PetitioRequest.ts:87](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L87)

## Properties

### controller

• `Optional` **controller**: `default` \| `AbortController`

The AbortController attached to the request
enableable with [PetitioRequest.signal](PetitioRequest.PetitioRequest-1.md#signal)

#### Defined in

[lib/PetitioRequest.ts:80](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L80)

___

### coreOptions

• **coreOptions**: [`Options`](../modules/PetitioRequest.md#options) = `{}`

Options to use for Undici under the hood.

**`see`** [Undici AgentOptions documentation](https://github.com/nodejs/undici/blob/main/docs/api/Agent.md#parameter-agentoptions)

#### Defined in

[lib/PetitioRequest.ts:42](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L42)

___

### data

• `Optional` **data**: `string` \| `Buffer` \| `Readable`

The data to be sent as the request body.
This will be a buffer or string for normal requests, or a stream.Readable
if the request is to be sent as a stream.

#### Defined in

[lib/PetitioRequest.ts:48](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L48)

___

### httpMethod

• **httpMethod**: [`HTTPMethod`](../modules/PetitioRequest.md#httpmethod) = `"GET"`

**`see`** [HTTPMethod](../modules/PetitioRequest.md#httpmethod)

#### Defined in

[lib/PetitioRequest.ts:52](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L52)

___

### kDispatch

• `Optional` **kDispatch**: `Agent` \| `Client`

**`see`** [PetitioRequest.dispatch](PetitioRequest.PetitioRequest-1.md#dispatch)

#### Defined in

[lib/PetitioRequest.ts:56](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L56)

___

### keepDispatcher

• **keepDispatcher**: `boolean` = `false`

Whether [PetitioRequest.kDispatch](PetitioRequest.PetitioRequest-1.md#kdispatch) will persist between [PetitioRequest.send](PetitioRequest.PetitioRequest-1.md#send)
calls. This is recommended to improve performance (if you will make more
than one request).

#### Defined in

[lib/PetitioRequest.ts:62](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L62)

___

### reqHeaders

• **reqHeaders**: `IncomingHttpHeaders` = `{}`

The headers to attach to the request.

#### Defined in

[lib/PetitioRequest.ts:66](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L66)

___

### timeoutOptions

• **timeoutOptions**: [`TimeoutOptions`](../interfaces/PetitioRequest.TimeoutOptions.md) = `{}`

The timeout options for the Undici agent.

**`see`** [TimeoutOptions](../interfaces/PetitioRequest.TimeoutOptions.md)

#### Defined in

[lib/PetitioRequest.ts:71](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L71)

___

### url

• **url**: `URL`

The URL destination for the request, targeted in [PetitioRequest.send](PetitioRequest.PetitioRequest-1.md#send).

#### Defined in

[lib/PetitioRequest.ts:75](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L75)

## Methods

### body

▸ **body**(`data`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` \| `Buffer` | The data to be set for the request body. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Defined in

[lib/PetitioRequest.ts:169](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L169)

▸ **body**(`data`, `sendAs?`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Record`<`string`, `any`\> | The data to be set for the request body. |
| `sendAs?` | ``"json"`` | If data is set to any object type value other than a buffer or this is set to `json`, the `Content-Type` header will be set to `application/json` and the request data will be set to the stringified JSON form of the supplied data. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Defined in

[lib/PetitioRequest.ts:177](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L177)

▸ **body**(`data`, `sendAs`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `string` \| `ParsedUrlQueryInput` | The data to be set for the request body. |
| `sendAs` | ``"form"`` | If data is a string or a parsed object of query parameters *AND* this is set to `form`, the `Content-Type` header will be set to `application/x-www-form-urlencoded` and the request data will be set to the URL encoded version of the query string. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Defined in

[lib/PetitioRequest.ts:185](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L185)

▸ **body**(`data`, `sendAs`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Readable` | The data to be set for the request body. |
| `sendAs` | ``"stream"`` | If data is a stream.Readable *AND* this is set to `stream`, the body will be sent as the stream with no modifications to it or the headers. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Defined in

[lib/PetitioRequest.ts:192](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L192)

___

### dispatch

▸ **dispatch**(`agent`, `keepAlive?`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

**`see`** [Undici Agent documentation](https://github.com/nodejs/undici/blob/main/docs/api/Agent.md)

**`see`** [Undici Client documentation](https://github.com/nodejs/undici/blob/main/docs/api/Client.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `agent` | `Agent` \| `Client` | - |
| `keepAlive?` | `boolean` | Whether to persist the dispatcher across requests or not. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

The request object for further composition.

#### Defined in

[lib/PetitioRequest.ts:101](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L101)

___

### header

▸ **header**(`header`, `value`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | `string` | The encoded header name to set. |
| `value` | `string` | The value to set the header to. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Defined in

[lib/PetitioRequest.ts:234](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L234)

▸ **header**(`header`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | `Record`<`string`, `string`\> | An object of keys and values to set headers to. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Defined in

[lib/PetitioRequest.ts:238](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L238)

___

### json

▸ **json**<`T`\>(): `Promise`<`T`\>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | Type casting parameter for the JSON result. |

#### Returns

`Promise`<`T`\>

A serialized object result from sending the request.

#### Defined in

[lib/PetitioRequest.ts:306](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L306)

___

### method

▸ **method**(`method`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `method` | [`HTTPMethod`](../modules/PetitioRequest.md#httpmethod) | The HTTP method to change the request to. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

The request object for further composition.

#### Defined in

[lib/PetitioRequest.ts:258](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L258)

___

### option

▸ **option**(`key`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

**`see`** [Undici Agent documentation](https://github.com/nodejs/undici/blob/main/docs/api/Agent.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | [`Options`](../modules/PetitioRequest.md#options) | An object of key-value options to set for Undici. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Defined in

[lib/PetitioRequest.ts:287](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L287)

▸ **option**<`T`\>(`key`, `value`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

**`see`** [Undici Agent documentation](https://github.com/nodejs/undici/blob/main/docs/api/Agent.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"bodyTimeout"`` \| ``"headersTimeout"`` \| ``"keepAliveTimeout"`` \| ``"keepAliveMaxTimeout"`` \| ``"keepAliveTimeoutThreshold"`` \| ``"pipelining"`` \| ``"connect"`` \| ``"maxHeaderSize"`` \| ``"strictContentLength"`` \| ``"tls"`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `T` | The agent options key to set. |
| `value` | [`Options`](../modules/PetitioRequest.md#options)[`T`] | The value to set the agent option to (type checked). |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Defined in

[lib/PetitioRequest.ts:294](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L294)

___

### path

▸ **path**(`relativePath`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

**`example`** `https://example.org/hello/world` with `.path("../petitio")`
would resolve to `https://example.org/hello/petitio`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `relativePath` | `string` | A path to resolve relative to the current URL. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

The request object for further composition.

#### Defined in

[lib/PetitioRequest.ts:144](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L144)

___

### query

▸ **query**(`key`, `value`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

**`example`**
If you wish to make a query at https://example.com/index?query=parameter
you can use `.query("query", "parameter")`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The query key to use for the URL query parameters. |
| `value` | `any` | The value to set the query key to. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Defined in

[lib/PetitioRequest.ts:115](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L115)

▸ **query**(`key`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

**`example`**
If you wish to make multiple queries at once, you can use
`.query({"keyOne": "hello", "keyTwo": "world!"})`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Record`<`string`, `any`\> | An object of query keys and their respective values. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Defined in

[lib/PetitioRequest.ts:122](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L122)

___

### raw

▸ **raw**(): `Promise`<`Buffer`\>

#### Returns

`Promise`<`Buffer`\>

The raw response body as a buffer.

#### Defined in

[lib/PetitioRequest.ts:314](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L314)

___

### send

▸ **send**(): `Promise`<[`PetitioResponse`](PetitioResponse.PetitioResponse-1.md)\>

Finalizes and sends the composable request to the target server.

**`throws`** {@link RequestAbortedError} Thrown when the request is aborted via
the abort controller.

**`throws`** {@link ClientDestroyedError} Thrown when you attempt to use an
already destroyed Undici client to make another request.

**`throws`** {@link ClientClosedError} Thrown when you attempt to use an
already closed Undici client to make another request.

**`throws`** {@link HeadersTimeoutError} Thrown when request headers were not
received before the timeout expired.

**`throws`** {@link BodyTimeoutError} Thrown when the request body was not
received before the timeout expired.

#### Returns

`Promise`<[`PetitioResponse`](PetitioResponse.PetitioResponse-1.md)\>

[PetitioRequest](PetitioRequest.PetitioRequest-1.md) The response object.

#### Defined in

[lib/PetitioRequest.ts:341](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L341)

___

### signal

▸ **signal**(`controller`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

**`example`**
```ts
const controller = new AbortController();
const result = petitio(URL).signal(controller);
setTimeout(() => controller.abort(), 5000) // serves as a request timeout
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `controller` | `default` \| `AbortController` | A controller instance that handles aborting the request. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

The request object for further composition.

#### Defined in

[lib/PetitioRequest.ts:160](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L160)

___

### text

▸ **text**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

The raw response body as a string.

#### Defined in

[lib/PetitioRequest.ts:322](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L322)

___

### timeout

▸ **timeout**(`timeout`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

**`see`** [TimeoutOptions.bodyTimeout](../interfaces/PetitioRequest.TimeoutOptions.md#bodytimeout)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeout` | `number` | The timeout (in milliseconds) to set the `bodyTimeout` to. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Defined in

[lib/PetitioRequest.ts:269](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L269)

▸ **timeout**(`timeout`, `time`): [`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

**`see`** [TimeoutOptions](../interfaces/PetitioRequest.TimeoutOptions.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeout` | keyof [`TimeoutOptions`](../interfaces/PetitioRequest.TimeoutOptions.md) | The timeout option to change. |
| `time` | `number` | The number of milliseconds to set the timeout to. |

#### Returns

[`PetitioRequest`](PetitioRequest.PetitioRequest-1.md)

#### Defined in

[lib/PetitioRequest.ts:275](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioRequest.ts#L275)
