import path from 'node:path';

import {INVALID_INPUT_MESSAGE} from "../../constants/errors.js";
import {Commander} from "../../commander/index.js";

export const up = (currentPath, args) => {
    if(args.length) throw new Error(INVALID_INPUT_MESSAGE);

    const commander = new Commander();

    commander.location = path.resolve(currentPath + '\\..');
}