---
id: "petitio"
title: "Module: Petitio"
sidebar_label: "Petitio"
custom_edit_url: null
hide_title: true
---

# Module: Petitio

## Properties

### export&#x3D;

• **export=**: (`url`: *string* \| *URL*, `method`: [*HTTPMethod*](petitiorequest.md#httpmethod)) => [*PetitioRequest*](../classes/petitiorequest.petitiorequest-1.md)

#### Type declaration:

▸ (`url`: *string* \| *URL*, `method?`: [*HTTPMethod*](petitiorequest.md#httpmethod)): [*PetitioRequest*](../classes/petitiorequest.petitiorequest-1.md)

**`see`** [PetitioRequest.constructor](../classes/petitiorequest.petitiorequest-1.md#constructor)

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`url` | *string* \| *URL* | - | The URL to start composing a request for.   |
`method` | [*HTTPMethod*](petitiorequest.md#httpmethod) | "GET" | - |

**Returns:** [*PetitioRequest*](../classes/petitiorequest.petitiorequest-1.md)

The Petitio request instance for your URL.

Defined in: [index.ts:5](https://github.com/helperdiscord/petitio/blob/eff2aca/src/index.ts#L5)
