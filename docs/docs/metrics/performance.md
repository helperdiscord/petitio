---
id: "performance"
title: "Performance"
---

## Preface

These results are collected from [a suite] managed by helperdiscord and verified
by Kludge Cyber Systems. Anyone may add to them with the results from their own
system, and they are kept up to date with at least two samples from each
version.

[a suite]: https://github.com/helperdiscord/http-benchmarks

## Package Size

Here you can see how efficient Petitio is in contrast to its competitors in
terms of bundle size.

<details>
	<summary>Results table</summary>

| Package          | Size                                                                                                                           |
|------------------|--------------------------------------------------------------------------------------------------------------------------------|
| request          | [![request package size](../assets/request.svg)](https://packagephobia.now.sh/result?p=request@2.88.2)                         |
| superagent       | [![superagent package size](../assets/superagent.svg)](https://packagephobia.now.sh/result?p=superagent@6.1.0)                 |
| got              | [![got package size](../assets/got.svg)](https://packagephobia.now.sh/result?p=got@11.8.2)                                     |
| axios            | [![axios package size](../assets/axios.svg)](https://packagephobia.now.sh/result?p=axios@0.21.1)                               |
| isomorphic-fetch | [![isomorphic-fetch package size](../assets/isomorphic-fetch.svg)](https://packagephobia.now.sh/result?p=isomorphic-fetch@3.0) |
| r2               | [![r2 package size](../assets/r2.svg)](https://packagephobia.now.sh/result?p=r2@2.0.1)                                         |
| node-fetch       | [![node-fetch package size](../assets/node-fetch.svg)](https://packagephobia.now.sh/result?p=node-fetch@2.6.1)                 |
| petitio          | [![petitio package size](../assets/petitio.svg)](https://packagephobia.now.sh/result?p=petitio@1.1.0)                          |
| phin             | [![phin package size](../assets/phin.svg)](https://packagephobia.now.sh/result?p=phin@3.5.1)                                   |
</details>

## Package Speed

If you wish to verify these results, you may run [the suite] yourself. You can
find the latest results [here].

[the suite]: https://github.com/helperdiscord/http-benchmarks
[here]: https://github.com/helperdiscord/http-benchmarks/blob/main/RESULTS.md

Format key for package results: `N ops/sec ±MOE% (R)` where N is the number of
operations per second achieved, MOE is the margin of error, and R is the number
of times the test was ran.

|      CPU      |   Governor  |         Fastest         |       `got`         |     `request`       |    `node-fetch`     |      `centra`       |      `https`         | `petitio (undici)`      | `petitio (http)`    |
|:-------------:|:-----------:|:-----------------------:|:-------------------:|:-------------------:|:-------------------:|:-------------------:|:--------------------:|:-----------------------:|:-------------------:|
| [i7-7700k][1] | Performance | `petitio (undici)`      | 2,119 ±4.93% (70)   | 5,786 ±6.52% (69)   | 6,011 ±3.94% (70)   | 9,245 ±4.46% (74)   | 10,275 ±0.84% (83)   | 16,349 ±2.44% (85)      | N/A.                |
| [i7-6600U][2] | Performance | `petitio (undici)`      | 1,913 ±0.54% (2073) | 4,738 ±0.59% (2068) | 4,393 ±0.56% (2072) | 5,800 ±0.92% (2068) | 5,912  ±0.55% (2071) | 13,088 ±0.54% (2074)    | 7,301 ±0.53% (2073) |

[1]: https://github.com/tbnritzdoge
[2]: https://github.com/nytelife26
