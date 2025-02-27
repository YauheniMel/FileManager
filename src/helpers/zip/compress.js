import {createReadStream, createWriteStream} from 'node:fs';
import {resolve} from 'node:path';
import {pipeline} from 'node:stream';
import {createBrotliCompress} from 'node:zlib';

import {INVALID_INPUT_MESSAGE, OPERATION_FAILED_MESSAGE} from "../../constants/errors.js";

export const compress = async (currentPath, args) => {
    if(args.length !== 2) throw new Error(INVALID_INPUT_MESSAGE);

    const sourceFilePath = resolve(currentPath, args[0]);
    const destinationFolderPath = resolve(currentPath, args[1] + '.br');

    return new Promise((resolve, reject) => {
        const readable = createReadStream(sourceFilePath, {flags: 'rs'});
        const writable = createWriteStream(destinationFolderPath, {flags: 'wx'});

        const brotli = createBrotliCompress();

        pipeline(readable, brotli, writable, (err) => {
            if(err) reject(new Error(OPERATION_FAILED_MESSAGE));

            resolve();
        });
    });
}