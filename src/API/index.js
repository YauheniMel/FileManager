import * as fsHelpers from '../helpers/fs/index.js';
import {os} from "../helpers/os/index.js";
import {hash} from "../helpers/crypto/hash.js";
import {compress} from "../helpers/zip/compress.js";
import {decompress} from "../helpers/zip/decompress.js";

export const API = {
    ...fsHelpers,
    os,
    hash,
    compress,
    decompress
}