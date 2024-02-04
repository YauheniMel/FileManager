import {resolve} from 'node:path';
import {createReadStream} from 'node:fs';
import {createHash} from 'node:crypto';
import { stdout } from 'node:process';

import {INVALID_INPUT_MESSAGE, OPERATION_FAILED_MESSAGE} from "../../constants/errors.js";

export const hash = async (currentPath, args) => {
    if(!args.length || args.length > 1) throw new Error(INVALID_INPUT_MESSAGE);

    const sourceFilePath = resolve(currentPath, args[0]);

    const readable = createReadStream(sourceFilePath, {flags: 'rs'});
    const hash = createHash('sha256');

    readable
        .pipe(hash)
        .setEncoding('hex')
        .on('end', result => console.log(result + '\n'))
        .pipe(stdout);


    return new Promise((resolve, reject) => {
        hash.on('end', () => resolve());
        readable.on('error', () => reject(new Error(OPERATION_FAILED_MESSAGE)));
    });
}