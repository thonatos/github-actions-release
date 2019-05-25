#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions_toolkit_1 = require("actions-toolkit");
const Checker_1 = __importDefault(require("./lib/Checker"));
const options = {
    event: 'pull_request',
    secrets: [
        'RELEASE_SSH_ID_RSA',
        'RELEASE_SSH_ID_RSA_PUB',
        'NPM_AUTH_TOKEN',
        'RELEASE_GIT_USER_NAME',
        'RELEASE_GIT_USER_EMAIL',
    ],
};
const task = async (tools) => {
    const args = tools.arguments;
    tools.log('@@arguments', args);
    const checker = new Checker_1.default(tools);
    await checker.run();
};
actions_toolkit_1.Toolkit.run(task, options);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEscURBQTBDO0FBQzFDLDREQUFvQztBQUVwQyxNQUFNLE9BQU8sR0FBRztJQUNkLEtBQUssRUFBRSxjQUFjO0lBQ3JCLE9BQU8sRUFBRTtRQUNQLG9CQUFvQjtRQUNwQix3QkFBd0I7UUFDeEIsZ0JBQWdCO1FBQ2hCLHVCQUF1QjtRQUN2Qix3QkFBd0I7S0FDekI7Q0FDRixDQUFDO0FBRUYsTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ2hDLE1BQU0sSUFBSSxHQUFRLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFDbEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFL0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLE1BQU0sT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLENBQUMsQ0FBQztBQUVGLHlCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyJ9