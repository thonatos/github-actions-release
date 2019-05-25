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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxREFBMEM7QUFDMUMsNERBQW9DO0FBRXBDLE1BQU0sT0FBTyxHQUFHO0lBQ2QsS0FBSyxFQUFFLGNBQWM7SUFDckIsT0FBTyxFQUFFO1FBQ1Asb0JBQW9CO1FBQ3BCLHdCQUF3QjtRQUN4QixnQkFBZ0I7UUFDaEIsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtLQUN6QjtDQUNGLENBQUM7QUFFRixNQUFNLElBQUksR0FBRyxLQUFLLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDaEMsTUFBTSxJQUFJLEdBQVEsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUNsQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUUvQixNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsTUFBTSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdEIsQ0FBQyxDQUFDO0FBRUYseUJBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDIn0=