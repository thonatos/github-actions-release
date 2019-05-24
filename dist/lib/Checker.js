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
        const { currVersion, nextVersion, tools } = this;
        if (!nextVersion) {
            tools.log('CheckReleaseProposal Failed, skip!');
            return;
        }
        if (util_1.checkReleaseVersion(currVersion, nextVersion)) {
            tools.log('CheckReleaseVersion Failed, skip!', nextVersion, currVersion);
            return;
        }
        const label = util_1.searchReleaseLabel(currVersion, nextVersion);
        if (!label) {
            tools.log('SearchReleaseLabel Failed, skip!', label);
            return;
        }
        tools.log('Label', label);
        if (label) {
            await this.updateLabel(label);
        }
        if (this.event === 'pull_request' && this.action === 'closed') {
            await this.releaseVersion();
        }
    }
}
exports.default = Checker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvQ2hlY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtDQUFrRTtBQUNsRSxrREFBMEI7QUFFMUIsTUFBcUIsT0FBUSxTQUFRLGNBQUk7SUFDdkMsWUFBWSxLQUFVO1FBQ3BCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFTSxLQUFLLENBQUMsR0FBRztRQUNkLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUNoRCxPQUFPO1NBQ1I7UUFFRCxJQUFJLDBCQUFtQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsRUFBRTtZQUNqRCxLQUFLLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN6RSxPQUFPO1NBQ1I7UUFFRCxNQUFNLEtBQUssR0FBRyx5QkFBa0IsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFM0QsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLEtBQUssQ0FBQyxHQUFHLENBQUMsa0NBQWtDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckQsT0FBTztTQUNSO1FBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxLQUFLLEVBQUU7WUFDVCxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssY0FBYyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzdELE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztDQUNGO0FBakNELDBCQWlDQyJ9