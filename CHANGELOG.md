## [1.3.2](https://github.com/helperdiscord/petitio/compare/v1.3.1...v1.3.2) (2021-05-13)


### Bug Fixes

* master -> main [ci_release] ([a0dafd6](https://github.com/helperdiscord/petitio/commit/a0dafd656349e6df692208e28033afcc837da77e))

## [1.3.1](https://github.com/helperdiscord/petitio/compare/v1.3.0...v1.3.1) (2021-04-21)


### Bug Fixes

* support node 16 [ci_release] ([#28](https://github.com/helperdiscord/petitio/issues/28)) ([9d4dec5](https://github.com/helperdiscord/petitio/commit/9d4dec59f44d44742c765de6fc53c03aa4343e89))

# [1.3.0](https://github.com/helperdiscord/petitio/compare/v1.2.1...v1.3.0) (2021-04-13)


### Bug Fixes

* change build target for backwards compat ([#25](https://github.com/helperdiscord/petitio/issues/25)) ([87cbbd3](https://github.com/helperdiscord/petitio/commit/87cbbd34851f132870e819d34d70bf032f7bde6f))
* **ci:** make filepaths correct ([9299fc0](https://github.com/helperdiscord/petitio/commit/9299fc00137be6ea195d93c871395f22fd579196))


### Features

* abort-controllers ([#23](https://github.com/helperdiscord/petitio/issues/23)) ([1ad4a5d](https://github.com/helperdiscord/petitio/commit/1ad4a5d86044d3dd77c8234703189c162fe93134))
* add all http methods ([#17](https://github.com/helperdiscord/petitio/issues/17)) ([f869666](https://github.com/helperdiscord/petitio/commit/f869666169a39c5f0baacc48d23b48c6a6073163))
* **ci:** build on every commit ([443070b](https://github.com/helperdiscord/petitio/commit/443070b8b09a9b6b087f634bf16ab4d69c0f8783))


### Performance Improvements

* improve response buffer handling ([#20](https://github.com/helperdiscord/petitio/issues/20)) ([26d84e2](https://github.com/helperdiscord/petitio/commit/26d84e22d88359869a747c0828e4d21e0fbdce95))
* optimize loops ([#24](https://github.com/helperdiscord/petitio/issues/24)) ([01b8012](https://github.com/helperdiscord/petitio/commit/01b80124bd8baa89e9b8ee4e40987c0cba1e57b8))

## [1.2.1](https://github.com/helperdiscord/petitio/compare/v1.2.0...v1.2.1) (2021-04-07)


### Bug Fixes

* **docs:** new baseUrl ([cc50d17](https://github.com/helperdiscord/petitio/commit/cc50d176ad14f2ca10a865c3eb0ed7d2b511f84a))

# [1.2.0](https://github.com/helperdiscord/petitio/compare/v1.1.0...v1.2.0) (2021-04-07)


### Bug Fixes

* **PetitioResponse:** support non-ascii json responses ([#11](https://github.com/helperdiscord/petitio/issues/11)) ([d8344e4](https://github.com/helperdiscord/petitio/commit/d8344e44bb2ca247082c7f330354a76869e49793))


### Features

* add support for stream ([c706801](https://github.com/helperdiscord/petitio/commit/c7068011464ce003d4443ab975b48bab9b0ac74f))
* add text encoding option & tests ([7f6f5c6](https://github.com/helperdiscord/petitio/commit/7f6f5c63f3dddc2838c7dc1975c8a5c9335f120d))


### Performance Improvements

* remove spread operators and callback loops ([#12](https://github.com/helperdiscord/petitio/issues/12)) ([3bf48cc](https://github.com/helperdiscord/petitio/commit/3bf48cc1d002fb342af932f720dfc833c94461fe))

# [1.1.0](https://github.com/helperdiscord/petitio/compare/v1.0.0...v1.1.0) (2021-03-22)


### Features

* add _parseHeaders to PetitioResponse ([188bf94](https://github.com/helperdiscord/petitio/commit/188bf94cafa4df4f54f5354fa8b42313aace6e0d))
* add docs and adjust types [ci_release] ([76e8bf9](https://github.com/helperdiscord/petitio/commit/76e8bf92dfbe9c6aae18b76412024ba6897271e8))
* **ci:** test workflow ([c8e101d](https://github.com/helperdiscord/petitio/commit/c8e101d91f8c41f016ff630c663b6367b748c4b6))
* **tests:** 100% coverage :rocket: ([27d9f0b](https://github.com/helperdiscord/petitio/commit/27d9f0bae2cbbf51b6a1c8b8cd9fda0fccc1cdd4))
* **tests:** finalize petitioresponse tests ([e0a770a](https://github.com/helperdiscord/petitio/commit/e0a770ad7f7a6ccbdcc0d240282de040c9869c36))
* add client method ([b257087](https://github.com/helperdiscord/petitio/commit/b257087d3d92412857de2f0c733050b4f16a6c52))
* proper import mapping ([410e534](https://github.com/helperdiscord/petitio/commit/410e53457e7dcd87ed5f4f0bd6f536a0b66d547b))
* type the dispatch funcs ([c630078](https://github.com/helperdiscord/petitio/commit/c630078330877f46dd4dea6a4edb25b99753fd81))
