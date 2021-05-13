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
This is updated through [PetitioResponse._addBody](petitioresponse.petitioresponse-1.md#_addbody), either
from [PetitioRequest.send](petitiorequest.petitiorequest-1.md#send) or directly on a response object from
another source.

Defined in: [lib/PetitioResponse.ts:12](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioResponse.ts#L12)

___

### headers

• **headers**: *object*

The response headers received from the server.
This is updated through [PetitioResponse._parseHeaders](petitioresponse.petitioresponse-1.md#_parseheaders).

#### Type declaration:

Defined in: [lib/PetitioResponse.ts:17](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioResponse.ts#L17)

___

### statusCode

• **statusCode**: *null* \| *number*= null

The status code received from the server.
This is set only after the response is complete when headers are received
or it can be set manually.

Defined in: [lib/PetitioResponse.ts:23](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioResponse.ts#L23)

## Methods

### \_addBody

▸ **_addBody**(`chunks`: *Buffer*[] \| *Uint8Array*[]): *void*

This takes the data chunks and creates a Buffer, and it sets
that buffer as the body.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`chunks` | *Buffer*[] \| *Uint8Array*[] | The body to set for the response.   |

**Returns:** *void*

In place operation with no return.

Defined in: [lib/PetitioResponse.ts:31](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioResponse.ts#L31)

___

### \_parseHeaders

▸ **_parseHeaders**(`headers`: *string*[]): *void*

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`headers` | *string*[] | The headers to add. This is done by splitting the array into chunks of two, where the first value becomes the header and the latter becomes its value. This will also append values to the header as an array if it already exists.   |

**Returns:** *void*

In place operation with no return.

Defined in: [lib/PetitioResponse.ts:43](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioResponse.ts#L43)

___

### json

▸ **json**<T\>(`encoding?`: BufferEncoding): T

#### Type parameters:

Name | Default | Description |
:------ | :------ | :------ |
`T` | *any* | Type casting parameter for the JSON result.   |

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`encoding` | BufferEncoding | "utf8" |

**Returns:** T

A serialized object result parsed from the response body.

Defined in: [lib/PetitioResponse.ts:62](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioResponse.ts#L62)

___

### text

▸ **text**(`encoding?`: BufferEncoding): *string*

#### Parameters:

Name | Type | Default value |
:------ | :------ | :------ |
`encoding` | BufferEncoding | "utf8" |

**Returns:** *string*

The response body decoded as as a string from the buffer, using either the encoding specified in `encoding` or UTF-8 by default..

Defined in: [lib/PetitioResponse.ts:70](https://github.com/helperdiscord/petitio/blob/23c8120/src/lib/PetitioResponse.ts#L70)
