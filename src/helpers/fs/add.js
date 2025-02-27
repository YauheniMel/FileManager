import {resolve} from "node:path";
import {open} from "node:fs/promises";

import {INVALID_INPUT_MESSAGE, OPERATION_FAILED_MESSAGE} from "../../constants/errors.js";


export const add = async (currentPath, args) => {
    if(!args.length || args.length > 1) throw new Error(INVALID_INPUT_MESSAGE);

    const filePath = resolve(currentPath, args[0]);

    try {
        const fd = await open(filePath,  "wx");

        await fd.close();
    } catch {
        throw new Error(OPERATION_FAILED_MESSAGE);
    }
}