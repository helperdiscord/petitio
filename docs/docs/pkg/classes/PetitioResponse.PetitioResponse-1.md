---
id: "PetitioResponse.PetitioResponse-1"
title: "Class: PetitioResponse"
sidebar_label: "PetitioResponse"
custom_edit_url: null
---

[PetitioResponse](../modules/PetitioResponse.md).PetitioResponse

## Constructors

### constructor

• **new PetitioResponse**()

## Properties

### body

• **body**: `Buffer`

The response body received from the server.
This is updated through [PetitioResponse._addBody](PetitioResponse.PetitioResponse-1.md#_addbody), either
from [PetitioRequest.send](PetitioRequest.PetitioRequest-1.md#send) or directly on a response object from
another source.

#### Defined in

[lib/PetitioResponse.ts:11](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioResponse.ts#L11)

___

### headers

• **headers**: `Object` = `{}`

The response headers received from the server.
This is updated through [PetitioResponse._parseHeaders](PetitioResponse.PetitioResponse-1.md#_parseheaders).

#### Index signature

▪ [k: `string`]: `any`

#### Defined in

[lib/PetitioResponse.ts:16](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioResponse.ts#L16)

___

### statusCode

• **statusCode**: ``null`` \| `number` = `null`

The status code received from the server.
This is set only after the response is complete when headers are received
or it can be set manually.

#### Defined in

[lib/PetitioResponse.ts:22](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioResponse.ts#L22)

## Methods

### \_addBody

▸ **_addBody**(`chunks`): `void`

This takes the data chunks and creates a Buffer, and it sets
that buffer as the body.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chunks` | `Buffer`[] \| `Uint8Array`[] | The body to set for the response. |

#### Returns

`void`

In place operation with no return.

#### Defined in

[lib/PetitioResponse.ts:30](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioResponse.ts#L30)

___

### \_parseHeaders

▸ **_parseHeaders**(`headers`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `headers` | `Buffer`[] | The headers to add. This is done by splitting the array into chunks of two, where the first value becomes the header and the latter becomes its value. This will also append values to the header as an array if it already exists. |

#### Returns

`void`

In place operation with no return.

#### Defined in

[lib/PetitioResponse.ts:42](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioResponse.ts#L42)

___

### json

▸ **json**<`T`\>(`encoding?`): `T`

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | Type casting parameter for the JSON result. |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `encoding` | `BufferEncoding` | `"utf8"` |

#### Returns

`T`

A serialized object result parsed from the response body.

#### Defined in

[lib/PetitioResponse.ts:61](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioResponse.ts#L61)

___

### raw

▸ **raw**(): `Buffer`

#### Returns

`Buffer`

The raw response body as a buffer.

#### Defined in

[lib/PetitioResponse.ts:76](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioResponse.ts#L76)

___

### text

▸ **text**(`encoding?`): `string`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `encoding` | `BufferEncoding` | `"utf8"` |

#### Returns

`string`

The response body decoded as as a string from the buffer, using either the encoding specified in `encoding` or UTF-8 by default..

#### Defined in

[lib/PetitioResponse.ts:69](https://github.com/helperdiscord/petitio/blob/344b809/src/lib/PetitioResponse.ts#L69)
