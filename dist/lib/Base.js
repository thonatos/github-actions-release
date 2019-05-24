"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const standard_version_1 = __importDefault(require("standard-version"));
const constants_1 = require("../constants");
const util_1 = require("../util");
class Base {
    constructor(tools) {
        this.event = '';
        this.action = '';
        this.nextVersion = '';
        this.currVersion = '';
        this.tools = tools;
        this.debug = debug_1.default('Github-Actions-Release');
        this.init();
    }
    async updateLabel(label) {
        const { repo, payload: { number: issueNumber }, } = this.tools.context;
        await this.tools.github.issues.update({
            ...repo,
            issue_number: issueNumber,
            labels: [`semver:${label}`],
        });
    }
    async releaseVersion() {
        const tools = this.tools;
        const { nextVersion } = this;
        const { state, merged } = this.tools.context.payload.pull_request;
        tools.log('@@releaseVersion', state, merged, nextVersion);
        if (state !== 'closed' || merged !== true) {
            return;
        }
        await tools.runInWorkspace('git', ['checkout', 'master']);
        await standard_version_1.default({
            infile: 'CHANGELOG.md',
            noVerify: true,
            releaseAs: nextVersion,
            silent: true,
            types: constants_1.StandardVersionTypes,
        });
        const changelog = tools.getFile('CHANGELOG.md');
        tools.log('@@changelog', changelog);
        await tools.runInWorkspace('git', [
            'push',
            '--follow-tags',
            'origin',
            'master',
        ]);
    }
    init() {
        const tools = this.tools;
        const pkg = tools.getPackageJSON() || {};
        const { event, payload, repo } = tools.context;
        const { action } = payload;
        tools.log('@@@event', event);
        tools.log('@@@action', action);
        tools.log('@@@pkg', JSON.stringify(pkg, null, 2));
        tools.log('@@@repo', JSON.stringify(repo, null, 2));
        tools.log('@@@event', JSON.stringify(event, null, 2));
        tools.log('@@@payload', JSON.stringify(payload, null, 2));
        this.event = event;
        this.action = action;
        this.currVersion = pkg.version || '*';
        this.nextVersion = util_1.checkReleaseProposal(payload.pull_request.title);
    }
}
exports.default = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQix3RUFBK0M7QUFDL0MsNENBQW9EO0FBQ3BELGtDQUErQztBQUMvQyxNQUFxQixJQUFJO0lBVXZCLFlBQVksS0FBVTtRQUxmLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQixnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUczQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLGVBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWE7UUFDcEMsTUFBTSxFQUNKLElBQUksRUFDSixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQ2pDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFdkIsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3BDLEdBQUcsSUFBSTtZQUNQLFlBQVksRUFBRSxXQUFXO1lBQ3pCLE1BQU0sRUFBRSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUM7U0FDNUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUM3QixNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFFbEUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRTFELElBQUksS0FBSyxLQUFLLFFBQVEsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3pDLE9BQU87U0FDUjtRQUVELE1BQU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMxRCxNQUFNLDBCQUFlLENBQUM7WUFDcEIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsV0FBVztZQUN0QixNQUFNLEVBQUUsSUFBSTtZQUNaLEtBQUssRUFBRSxnQ0FBb0I7U0FDNUIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVwQyxNQUFNLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO1lBQ2hDLE1BQU07WUFDTixlQUFlO1lBQ2YsUUFBUTtZQUNSLFFBQVE7U0FDVCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sSUFBSTtRQUNULE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN6QyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQy9DLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFM0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLDJCQUFvQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNGO0FBOUVELHVCQThFQyJ9