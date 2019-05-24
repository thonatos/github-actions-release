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
        const { state, merged } = this.tools.context.payload;
        if (state === 'closed' && merged === true) {
            await tools.runInWorkspace('git', ['checkout', 'master']);
            await standard_version_1.default({
                infile: 'docs/CHANGELOG.md',
                noVerify: true,
                releaseAs: nextVersion,
                silent: true,
                types: constants_1.StandardVersionTypes,
            });
            await tools.runInWorkspace('git', [
                'push',
                '--follow-tags',
                'origin',
                'master',
            ]);
        }
    }
    init() {
        const tools = this.tools;
        const pkg = tools.getPackageJSON() || {};
        const { event, payload, repo } = tools.context;
        tools.log('@@@pkg', JSON.stringify(pkg, null, 2));
        tools.log('@@@repo', JSON.stringify(repo, null, 2));
        tools.log('@@@event', JSON.stringify(event, null, 2));
        tools.log('@@@payload', JSON.stringify(payload, null, 2));
        this.event = event;
        this.action = payload.action;
        this.currVersion = pkg.version || '*';
        this.nextVersion = util_1.checkReleaseProposal(payload.pull_request.title);
    }
}
exports.default = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQix3RUFBK0M7QUFDL0MsNENBQW9EO0FBQ3BELGtDQUErQztBQUMvQyxNQUFxQixJQUFJO0lBVXZCLFlBQVksS0FBVTtRQUxmLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQixnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixnQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUczQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLGVBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWE7UUFDcEMsTUFBTSxFQUNKLElBQUksRUFDSixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQ2pDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFdkIsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3BDLEdBQUcsSUFBSTtZQUNQLFlBQVksRUFBRSxXQUFXO1lBQ3pCLE1BQU0sRUFBRSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUM7U0FDNUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUM3QixNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUVyRCxJQUFJLEtBQUssS0FBSyxRQUFRLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUN6QyxNQUFNLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDMUQsTUFBTSwwQkFBZSxDQUFDO2dCQUNwQixNQUFNLEVBQUUsbUJBQW1CO2dCQUMzQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxTQUFTLEVBQUUsV0FBVztnQkFDdEIsTUFBTSxFQUFFLElBQUk7Z0JBQ1osS0FBSyxFQUFFLGdDQUFvQjthQUM1QixDQUFDLENBQUM7WUFDSCxNQUFNLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxNQUFNO2dCQUNOLGVBQWU7Z0JBQ2YsUUFBUTtnQkFDUixRQUFRO2FBQ1QsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRU0sSUFBSTtRQUNULE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN6QyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBRS9DLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUcsMkJBQW9CLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0Y7QUFuRUQsdUJBbUVDIn0=