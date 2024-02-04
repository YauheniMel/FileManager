import path from 'node:path';
import {createReadStream} from 'node:fs';

import {INVALID_INPUT_MESSAGE, OPERATION_FAILED_MESSAGE} from "../../constants/errors.js";

export const cat = async (currentPath, args) => {
    if(!args.length || args.length > 1) throw new Error(INVALID_INPUT_MESSAGE);

    const location = path.resolve(currentPath, args[0]);

    const readable = createReadStream(location);

    return new Promise((resolve, reject) => {
        readable.on("data", chunk => {
            console.log(chunk.toString());
        });

        readable.on("error", _ => {
            reject(new Error(OPERATION_FAILED_MESSAGE));
        })

        readable.on("end", () => {
            resolve();
        });
    });
}