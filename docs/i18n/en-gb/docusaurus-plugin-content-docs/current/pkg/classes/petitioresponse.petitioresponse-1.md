---
id: "petitioresponse.petitioresponse-1"
title: "Class: PetitioResponse"
sidebar_label: "PetitioResponse"
custom_edit_url: null
hide_title: true
---

# Class: PetitioResponse

[PetitioResponse](../modules/petitioresponse.md).PetitioResponse

## Constructors

### constructor

\+ **new PetitioResponse**(): [*PetitioResponse*](petitioresponse.petitioresponse-1.md)

**Returns:** [*PetitioResponse*](petitioresponse.petitioresponse-1.md)

## Properties

### body

• **body**: *Buffer*

The response body received from the server.
This is updated in chunks through [PetitioResponse._addChunk](petitioresponse.petitioresponse-1.md#_addchunk), either
from [PetitioRequest.send](petitiorequest.petitiorequest-1.md#send) or directly on a response object from
another source.

Defined in: [lib/PetitioResponse.ts:12](https://github.com/helperdiscord/petitio/blob/585315e/src/lib/PetitioResponse.ts#L12)

___

### headers

• **headers**: *object*

The response headers received from the server.
This is updated through [PetitioResponse._parseHeaders](petitioresponse.petitioresponse-1.md#_parseheaders).

#### Type declaration:

Defined in: [lib/PetitioResponse.ts:17](https://github.com/helperdiscord/petitio/blob/585315e/src/lib/PetitioResponse.ts#L17)

___

### statusCode

• **statusCode**: *null* \| *number*= null

The status code received from the server.
This is set only after the response is complete when headers are received
or it can be set manually.

Defined in: [lib/PetitioResponse.ts:23](https://github.com/helperdiscord/petitio/blob/585315e/src/lib/PetitioResponse.ts#L23)

## Methods

### \_addChunk

▸ **_addChunk**(`chunk`: *Buffer* \| *Uint8Array*): *void*

This appends data to the body, dynamically reallocating the buffer size
as chunks are added. Therefore, this is currently unsuitable for handling
large responses, as the exact size is allocated in memory as a buffer.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`chunk` | *Buffer* \| *Uint8Array* | The chunk of data to append to the body.   |

**Returns:** *void*

In place operation with no return.

Defined in: [lib/PetitioResponse.ts:32](https://github.com/helperdiscord/petitio/blob/585315e/src/lib/PetitioResponse.ts#L32)

___

### \_parseHeaders

▸ **_parseHeaders**(`headers`: *string*[]): *void*

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`headers` | *string*[] | The headers to add. This is done by splitting the array into chunks of two, where the first value becomes the header and the latter becomes its value. This will also append values to the header as an array if it already exists.   |

**Returns:** *void*

In place operation with no return.

Defined in: [lib/PetitioResponse.ts:43](https://github.com/helperdiscord/petitio/blob/585315e/src/lib/PetitioResponse.ts#L43)

___

### json

▸ **json**<T\>(): T

#### Type parameters:

Name | Default | Description |
:------ | :------ | :------ |
`T` | *any* | Type casting parameter for the JSON result.   |

**Returns:** T

A serialized object result parsed from the response body.

Defined in: [lib/PetitioResponse.ts:61](https://github.com/helperdiscord/petitio/blob/585315e/src/lib/PetitioResponse.ts#L61)

___

### text

▸ **text**(): *string*

**Returns:** *string*

The response body decoded as a UTF-8 string from the buffer.

Defined in: [lib/PetitioResponse.ts:68](https://github.com/helperdiscord/petitio/blob/585315e/src/lib/PetitioResponse.ts#L68)
