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
        this.pkg = {};
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
        const { nextVersion, tools } = this;
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
    async publishNodePackage() {
        const { pkg, tools } = this;
        tools.log('@@publishNodePackage', pkg);
        await tools.runInWorkspace('npm', ['publish', '--access', 'public']);
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
        this.pkg = pkg;
        this.event = event;
        this.action = action;
        this.currVersion = pkg.version || '*';
        this.nextVersion = util_1.checkReleaseProposal(payload.pull_request.title);
    }
}
exports.default = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQix3RUFBK0M7QUFDL0MsNENBQW9EO0FBQ3BELGtDQUErQztBQUMvQyxNQUFxQixJQUFJO0lBV3ZCLFlBQVksS0FBVTtRQU5mLFFBQUcsR0FBUSxFQUFFLENBQUM7UUFDZCxVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFHM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFhO1FBQ3BDLE1BQU0sRUFDSixJQUFJLEVBQ0osT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUNqQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBRXZCLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNwQyxHQUFHLElBQUk7WUFDUCxZQUFZLEVBQUUsV0FBVztZQUN6QixNQUFNLEVBQUUsQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDO1NBQzVCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsY0FBYztRQUN6QixNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQztRQUNwQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFFbEUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRTFELElBQUksS0FBSyxLQUFLLFFBQVEsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3pDLE9BQU87U0FDUjtRQUVELE1BQU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMxRCxNQUFNLDBCQUFlLENBQUM7WUFDcEIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsV0FBVztZQUN0QixNQUFNLEVBQUUsSUFBSTtZQUNaLEtBQUssRUFBRSxnQ0FBb0I7U0FDNUIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVwQyxNQUFNLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO1lBQ2hDLE1BQU07WUFDTixlQUFlO1lBQ2YsUUFBUTtZQUNSLFFBQVE7U0FDVCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLGtCQUFrQjtRQUM3QixNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQztRQUM1QixLQUFLLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXZDLE1BQU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLElBQUk7UUFDVCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDekMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUMvQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBRTNCLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdCLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLDJCQUFvQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNGO0FBdEZELHVCQXNGQyJ9