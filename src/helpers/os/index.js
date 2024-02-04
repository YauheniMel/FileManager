import * as OS from 'node:os';
import {INVALID_INPUT_MESSAGE, OPERATION_FAILED_MESSAGE} from "../../constants/errors.js";

export const os = (_, args) => {
    if(!args.length || args.length > 1) throw new Error(INVALID_INPUT_MESSAGE);

    let result = null;

    switch (args[0].slice(2)) {
        case "EOL": {
            result = JSON.stringify(os.EOL);

            break;
        }
        case "cpus": {
            const coresInfo = OS.cpus();

            result = {
                amount: coresInfo.length,
                list: coresInfo.map(coreInfo => ({
                    model: coreInfo.model,
                    clockRate: (coreInfo.speed/1000).toFixed(2) + 'GHz'
                }))
            };

            break;
        }
        case "homedir": {
            result = OS.homedir();

            break;
        }
        case "username": {
            result = OS.userInfo().username;

            break;
        }
        case "architecture": {
            result = OS.arch();

            break;
        }
    }

    if(!result) throw new Error(OPERATION_FAILED_MESSAGE);
    console.log(result);
}