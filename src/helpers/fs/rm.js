import { resolve } from 'node:path';
import { rm as remove } from 'node:fs/promises';

import {INVALID_INPUT_MESSAGE, OPERATION_FAILED_MESSAGE} from "../../constants/errors.js";

export const rm = async (currentPath, args) => {
    if(!args.length || args.length > 1) throw new Error(INVALID_INPUT_MESSAGE);

    const filePath = resolve(currentPath, args[0]);

    try {
        await remove(filePath);
    } catch {
        throw new Error(OPERATION_FAILED_MESSAGE);
    }
}