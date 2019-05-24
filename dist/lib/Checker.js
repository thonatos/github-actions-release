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
        const { currVersion, nextVersion, tools, action, event } = this;
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
    }
}
exports.default = Checker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvQ2hlY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtDQUFrRTtBQUNsRSxrREFBMEI7QUFFMUIsTUFBcUIsT0FBUSxTQUFRLGNBQUk7SUFDdkMsWUFBWSxLQUFVO1FBQ3BCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRztRQUNkLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ2hELE9BQU87U0FDUjtRQUVELElBQUksQ0FBQywwQkFBbUIsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLEVBQUU7WUFDbEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDekUsT0FBTztTQUNSO1FBRUQsTUFBTSxLQUFLLEdBQUcseUJBQWtCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixLQUFLLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JELE9BQU87U0FDUjtRQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU5QixJQUFJLEtBQUssS0FBSyxjQUFjLElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUNuRCxLQUFLLENBQUMsR0FBRyxDQUFDLDhCQUE4QixFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6RCxPQUFPO1NBQ1I7UUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzlCLENBQUM7Q0FDRjtBQW5DRCwwQkFtQ0MifQ==