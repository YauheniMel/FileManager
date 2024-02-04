import path from 'node:path';
import {stat} from 'node:fs/promises';

import {INVALID_INPUT_MESSAGE} from "../../constants/errors.js";
import {Commander} from "../../commander/index.js";

export const cd = async (currentPath, args) => {
    if(!args.length || args.length > 1) throw new Error(INVALID_INPUT_MESSAGE);

    const commander = new Commander();

    const location = path.resolve(currentPath, args[0]);

    try {
        const stats = await stat(location);

        if(!stats.isFile()) {
            commander.location = path.normalize(location);
        }
    } catch {
        throw new Error(INVALID_INPUT_MESSAGE);
    }
}