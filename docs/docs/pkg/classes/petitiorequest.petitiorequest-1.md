---
id: "petitiorequest.petitiorequest-1"
title: "Class: PetitioRequest"
sidebar_label: "PetitioRequest"
custom_edit_url: null
hide_title: true
---

# Class: PetitioRequest

[PetitioRequest](../modules/petitiorequest.md).PetitioRequest

## Constructors

### constructor

\+ **new PetitioRequest**(`url`: *string* \| *URL*, `httpMethod?`: [*HTTPMethod*](../modules/petitiorequest.md#httpmethod)): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`url` | *string* \| *URL* | - | The URL to start composing a request for.   |
`httpMethod` | [*HTTPMethod*](../modules/petitiorequest.md#httpmethod) | "GET" | - |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

The Petitio request instance for your URL.

Defined in: [lib/PetitioRequest.ts:72](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L72)

## Properties

### controller

• `Optional` **controller**: *default*

The AbortController attached to the request
enableable with [PetitioRequest.signal](petitiorequest.petitiorequest-1.md#signal)

Defined in: [lib/PetitioRequest.ts:72](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L72)

___

### coreOptions

• **coreOptions**: Options

Options to use for Undici under the hood.

**`see`** [Undici ClientOptions documentation](https://github.com/nodejs/undici/blob/main/docs/api/Client.md#parameter-clientoptions)

Defined in: [lib/PetitioRequest.ts:35](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L35)

___

### data

• `Optional` **data**: *string* \| *Buffer* \| *Readable*

The data to be sent as the request body.
This will be a buffer or string for normal requests, or a stream.Readable
if the request is to be sent as a stream.

Defined in: [lib/PetitioRequest.ts:41](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L41)

___

### httpMethod

• **httpMethod**: [*HTTPMethod*](../modules/petitiorequest.md#httpmethod)= "GET"

**`see`** [HTTPMethod](../modules/petitiorequest.md#httpmethod)

Defined in: [lib/PetitioRequest.ts:45](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L45)

___

### kClient

• `Optional` **kClient**: *Client*

**`see`** [PetitioRequest.client](petitiorequest.petitiorequest-1.md#client)

Defined in: [lib/PetitioRequest.ts:49](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L49)

___

### keepClient

• `Optional` **keepClient**: *boolean*

Whether [PetitioRequest.kClient](petitiorequest.petitiorequest-1.md#kclient) will persist between [PetitioRequest.send](petitiorequest.petitiorequest-1.md#send)
calls. It is recommended to enable this for superior performance.

Defined in: [lib/PetitioRequest.ts:54](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L54)

___

### reqHeaders

• **reqHeaders**: *IncomingHttpHeaders*

The headers to attach to the request.

Defined in: [lib/PetitioRequest.ts:58](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L58)

___

### timeoutOptions

• **timeoutOptions**: [*TimeoutOptions*](../interfaces/petitiorequest.timeoutoptions.md)

The timeout options for the Undici client.

**`see`** [TimeoutOptions](../interfaces/petitiorequest.timeoutoptions.md)

Defined in: [lib/PetitioRequest.ts:63](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L63)

___

### url

• **url**: *URL*

The URL destination for the request, targeted in [PetitioRequest.send](petitiorequest.petitiorequest-1.md#send).

Defined in: [lib/PetitioRequest.ts:67](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L67)

## Methods

### body

▸ **body**(`data`: *string* \| *Buffer*): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`data` | *string* \| *Buffer* | The data to be set for the request body.    |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

Defined in: [lib/PetitioRequest.ts:156](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L156)

▸ **body**(`data`: *Record*<string, any\>, `sendAs?`: *json*): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`data` | *Record*<string, any\> | The data to be set for the request body.   |
`sendAs?` | *json* | If data is set to any object type value other than a buffer or this is set to `json`, the `Content-Type` header will be set to `application/json` and the request data will be set to the stringified JSON form of the supplied data.    |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

Defined in: [lib/PetitioRequest.ts:164](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L164)

▸ **body**(`data`: *string* \| *ParsedUrlQueryInput*, `sendAs`: *form*): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`data` | *string* \| *ParsedUrlQueryInput* | The data to be set for the request body.   |
`sendAs` | *form* | If data is a string or a parsed object of query parameters *AND* this is set to `form`, the `Content-Type` header will be set to `application/x-www-form-urlencoded` and the request data will be set to the URL encoded version of the query string.    |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

Defined in: [lib/PetitioRequest.ts:172](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L172)

▸ **body**(`data`: *Readable*, `sendAs`: *stream*): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`data` | *Readable* | The data to be set for the request body.   |
`sendAs` | *stream* | If data is a stream.Readable *AND* this is set to `stream`, the body will be sent as the stream with no modifications to it or the headers.    |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

Defined in: [lib/PetitioRequest.ts:179](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L179)

___

### client

▸ **client**(`client`: *Client*, `keepAlive?`: *boolean*): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

**`see`** [Undici Client documentation](https://github.com/nodejs/undici/blob/main/docs/api/Client.md)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`client` | *Client* | The Undici client instance you wish to use.   |
`keepAlive?` | *boolean* | Whether to persist the client across requests or not.   |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

The request object for further composition.

Defined in: [lib/PetitioRequest.ts:91](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L91)

___

### header

▸ **header**(`header`: *string*, `value`: *string*): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`header` | *string* | The encoded header name to set.   |
`value` | *string* | The value to set the header to.    |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

Defined in: [lib/PetitioRequest.ts:223](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L223)

▸ **header**(`header`: *Record*<string, string\>): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`header` | *Record*<string, string\> | An object of keys and values to set headers to.    |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

Defined in: [lib/PetitioRequest.ts:227](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L227)

___

### json

▸ **json**<T\>(): *Promise*<T\>

#### Type parameters:

Name | Default | Description |
:------ | :------ | :------ |
`T` | *any* | Type casting parameter for the JSON result.   |

**Returns:** *Promise*<T\>

A serialized object result from sending the request.

Defined in: [lib/PetitioRequest.ts:295](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L295)

___

### method

▸ **method**(`method`: [*HTTPMethod*](../modules/petitiorequest.md#httpmethod)): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`method` | [*HTTPMethod*](../modules/petitiorequest.md#httpmethod) | The HTTP method to change the request to.   |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

The request object for further composition.

Defined in: [lib/PetitioRequest.ts:247](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L247)

___

### option

▸ **option**(`key`: Options): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

**`see`** [Undici Client documentation](https://github.com/nodejs/undici/blob/main/docs/api/Client.md)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | Options | An object of key-value options to set for Undici.   |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

Defined in: [lib/PetitioRequest.ts:276](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L276)

▸ **option**<T\>(`key`: T, `value`: Options[T]): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

**`see`** [Undici Client documentation](https://github.com/nodejs/undici/blob/main/docs/api/Client.md)

#### Type parameters:

Name | Type |
:------ | :------ |
`T` | keyof Options |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | T | The client options key to set.   |
`value` | Options[T] | The value to set the client option to (type checked).   |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

Defined in: [lib/PetitioRequest.ts:283](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L283)

___

### path

▸ **path**(`relativePath`: *string*): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

**`example`** `https://example.org/hello/world` with `.path("../petitio")`
would resolve to `https://example.org/hello/petitio`.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`relativePath` | *string* | A path to resolve relative to the current URL.   |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

The request object for further composition.

Defined in: [lib/PetitioRequest.ts:132](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L132)

___

### query

▸ **query**(`key`: *string*, `value`: *any*): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

**`example`** 
If you wish to make a query at https://example.com/index?query=parameter
you can use `.query("query", "parameter")`.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *string* | The query key to use for the URL query parameters.   |
`value` | *any* | The value to set the query key to.   |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

Defined in: [lib/PetitioRequest.ts:105](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L105)

▸ **query**(`key`: *Record*<string, any\>): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

**`example`** 
If you wish to make multiple queries at once, you can use
`.query({"keyOne": "hello", "keyTwo": "world!"})`.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`key` | *Record*<string, any\> | An object of query keys and their respective values.   |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

Defined in: [lib/PetitioRequest.ts:112](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L112)

___

### raw

▸ **raw**(): *Promise*<Buffer\>

**Returns:** *Promise*<Buffer\>

The raw response body as a buffer.

Defined in: [lib/PetitioRequest.ts:303](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L303)

___

### send

▸ **send**(): *Promise*<[*PetitioResponse*](petitioresponse.petitioresponse-1.md)\>

Finalizes and sends the composable request to the target server.

**Returns:** *Promise*<[*PetitioResponse*](petitioresponse.petitioresponse-1.md)\>

The response object.

Defined in: [lib/PetitioRequest.ts:321](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L321)

___

### signal

▸ **signal**(`controller`: *default*): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

**`example`** 
```ts
const controller = new AbortController();
const result = petitio(URL).signal(controller);
setTimeout(() => controller.abort(), 5000) // serves as a request timeout
```

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`controller` | *default* | A controller instance that handles aborting the request.   |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

The request object for further composition.

Defined in: [lib/PetitioRequest.ts:147](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L147)

___

### text

▸ **text**(): *Promise*<string\>

**Returns:** *Promise*<string\>

The raw response body as a string.

Defined in: [lib/PetitioRequest.ts:311](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L311)

___

### timeout

▸ **timeout**(`timeout`: *number*): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

**`see`** [TimeoutOptions.bodyTimeout](../interfaces/petitiorequest.timeoutoptions.md#bodytimeout)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`timeout` | *number* | The timeout (in milliseconds) to set the `bodyTimeout` to.   |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

Defined in: [lib/PetitioRequest.ts:258](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L258)

▸ **timeout**(`timeout`: keyof [*TimeoutOptions*](../interfaces/petitiorequest.timeoutoptions.md), `time`: *number*): [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

**`see`** [TimeoutOptions](../interfaces/petitiorequest.timeoutoptions.md)

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`timeout` | keyof [*TimeoutOptions*](../interfaces/petitiorequest.timeoutoptions.md) | The timeout option to change.   |
`time` | *number* | The number of milliseconds to set the timeout to.   |

**Returns:** [*PetitioRequest*](petitiorequest.petitiorequest-1.md)

Defined in: [lib/PetitioRequest.ts:264](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioRequest.ts#L264)
