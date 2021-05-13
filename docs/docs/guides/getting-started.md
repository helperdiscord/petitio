---
id: "getting-started"
title: "Getting Started"
---

**Note: Petitio supports both `require` and `import` syntax out of the box, so
there's no need to do any pesky ESM or CJS hacks.**

## Basic Usage

The [default export] of Petitio is a wrapper function for [PetitioRequest],
meaning all you need to get started is as follows:

```typescript
import petitio from "petitio";

const request = petitio("https://example.com");
```

That instantiates a [PetitioRequest] for `example.com`. Simple right?
Let's take a look at how we send requests and work with responses.

```typescript
const result = await request.send().text();
// equivalent to
const result = await request.text();
```

Fast and clean. Beautiful, even. But how does that work?
[PetitioRequest#send][send] instructs Petitio to send the current
[PetitioRequest] and returns a [PetitioResponse] with the response data, and
then [PetitioResponse#text][response-text] parses the response body from
a buffer to a string. The shorthand form of this is
[PetitioRequest#text][request-text], which sends the request and invokes text
parsing for you in one call.

That's the basics covered! Feel free to read through our [other
guides], or take a look at more [basic examples].

[default export]: ../pkg/modules/petitio#export
[PetitioRequest]: ../pkg/classes/petitiorequest.petitiorequest-1
[PetitioResponse]: ../pkg/classes/petitioresponse.petitioresponse-1
[send]: ../pkg/classes/petitiorequest.petitiorequest-1#send
[response-text]: ../pkg/classes/petitioresponse.petitioresponse-1#text
[request-text]: ../pkg/classes/petitiorequest.petitiorequest-1#text
[other guides]: ../
[basic examples]: ./basic-examples
