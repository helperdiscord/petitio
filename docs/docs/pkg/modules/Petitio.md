---
id: "Petitio"
title: "Module: Petitio"
sidebar_label: "Petitio"
sidebar_position: 0
custom_edit_url: null
---

## Properties

### export&#x3D;

• **export=**: (`url`: `string` \| `URL`, `method`: [`HTTPMethod`](PetitioRequest.md#httpmethod)) => [`PetitioRequest`](../classes/PetitioRequest.PetitioRequest-1.md)

#### Type declaration

▸ (`url`, `method?`): [`PetitioRequest`](../classes/PetitioRequest.PetitioRequest-1.md)

**`see`** [PetitioRequest.constructor](../classes/PetitioRequest.PetitioRequest-1.md#constructor)

##### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `url` | `string` \| `URL` | `undefined` | The URL to start composing a request for. |
| `method` | [`HTTPMethod`](PetitioRequest.md#httpmethod) | `"GET"` | - |

##### Returns

[`PetitioRequest`](../classes/PetitioRequest.PetitioRequest-1.md)

The Petitio request instance for your URL.
