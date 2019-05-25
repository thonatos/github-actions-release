"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const Base_1 = __importDefault(require("./Base"));
class Checker extends Base_1.default {
    constructor(tools) {
        super(tools);
    }
    async run() {
        const { currVersion, nextVersion, tools, action, event, pkg } = this;
        if (!nextVersion) {
            tools.log('CheckReleaseProposal Failed, skip!');
            return;
        }
        if (!util_1.checkReleaseVersion(currVersion, nextVersion)) {
            tools.log('CheckReleaseVersion Failed, skip!', currVersion, nextVersion);
            return;
        }
        const label = util_1.searchReleaseLabel(currVersion, nextVersion);
        if (!label) {
            tools.log('SearchReleaseLabel Failed, skip!', label);
            return;
        }
        tools.log('UpdateLabel', label);
        await this.updateLabel(label);
        if (event !== 'pull_request' || action !== 'closed') {
            tools.log('ReleaseVersion Failed, skip!', event, action);
            return;
        }
        tools.log('ReleaseVersion', nextVersion);
        await this.releaseVersion();
        tools.log('PublishNodePackage', pkg);
        await this.publishNodePackage();
    }
}
exports.default = Checker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvQ2hlY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtDQUFrRTtBQUNsRSxrREFBMEI7QUFFMUIsTUFBcUIsT0FBUSxTQUFRLGNBQUk7SUFDdkMsWUFBWSxLQUFVO1FBQ3BCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRztRQUNkLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyRSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUNoRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsMEJBQW1CLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxFQUFFO1lBQ2xELEtBQUssQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3pFLE9BQU87U0FDUjtRQUVELE1BQU0sS0FBSyxHQUFHLHlCQUFrQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyRCxPQUFPO1NBQ1I7UUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUIsSUFBSSxLQUFLLEtBQUssY0FBYyxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDbkQsS0FBSyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDekQsT0FBTztTQUNSO1FBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN6QyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUU1QixLQUFLLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDbEMsQ0FBQztDQUNGO0FBdENELDBCQXNDQyJ9