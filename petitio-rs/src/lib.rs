#![deny(clippy::all)]

use napi::bindgen_prelude::*;
use napi_derive::napi;

#[napi]
pub fn test(n: u32) -> u32 {
	n
}
