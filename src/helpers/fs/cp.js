import {resolve, parse} from 'node:path';
import {pipeline} from 'node:stream';

import {createReadStream, createWriteStream} from 'node:fs';

import {INVALID_INPUT_MESSAGE, OPERATION_FAILED_MESSAGE} from "../../constants/errors.js";

export const cp = async (currentPath, args) => {
    if(args.length !== 2) throw new Error(INVALID_INPUT_MESSAGE);

    const sourceFilePath = resolve(currentPath, args[0]);
    const destinationFolderPath = resolve(currentPath, args[1], parse(sourceFilePath).base);

    return new Promise((resolve, reject) => {
        const readable = createReadStream(sourceFilePath, {flags: 'rs'});
        const writable = createWriteStream(destinationFolderPath, {flags: 'wx'});

        pipeline(readable, writable, (err) => {
                if(err) reject(new Error(OPERATION_FAILED_MESSAGE));

                resolve();
        });
    });
}