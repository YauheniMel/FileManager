import {resolve} from 'node:path';
import {rename} from 'node:fs/promises';

import {INVALID_INPUT_MESSAGE, OPERATION_FAILED_MESSAGE} from "../../constants/errors.js";

export const rn = async (currentPath, args) => {
    if(!args.length || args.length > 2) throw new Error(INVALID_INPUT_MESSAGE);

    const sourceFilePath = resolve(currentPath, args[0]);
    const destinationFilePath = resolve(currentPath, args[1]);

    try {
        await rename(sourceFilePath, destinationFilePath);
    } catch {
        throw new Error(OPERATION_FAILED_MESSAGE);
    }
}