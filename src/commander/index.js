import os from "node:os";

import { API } from "../API/index.js";
import {OPERATION_FAILED_MESSAGE} from "../constants/errors.js";

export class Commander {
    command = null;
    args = null;
    location = null;

    constructor(name) {
        if (Commander._instance) {
            return Commander._instance;
        }
        Commander._instance = this;

        this.name = name;
        this.location = os.homedir();

        this.sayHello();
        this.showLocation();
    }

    set command(command) {
        this.command = command;
    }

    set args(args) {
        this.args = args;
    }

    set location(path) {
        this.location = path;
    }

    async action() {
        try {
           await API[this.command](this.location, this.args);

        } catch (error) {
            if(error instanceof TypeError) {
                console.log(new Error(OPERATION_FAILED_MESSAGE));
            } else {
                console.log(error);
            }
        } finally {
            this.showLocation();
        }
    }

    sayHello() {
        console.log(`Welcome to the File Manager, ${this.name}!`);
    }

    showLocation() {
        console.log('You are currently in ' + this.location);
    }

    sayBye() {
        console.log(`Thank you for using File Manager, ${this.name}, goodbye!`);
    }
}