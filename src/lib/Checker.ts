import { checkReleaseVersion, searchReleaseLabel } from '../util';
import Base from './Base';

export default class Checker extends Base {
  constructor(tools: any) {
    super(tools);
  }

  public async run() {
    const { currVersion, nextVersion, tools, action, event } = this;
    if (!nextVersion) {
      tools.log('CheckReleaseProposal Failed, skip!');
      return;
    }

    if (!checkReleaseVersion(currVersion, nextVersion)) {
      tools.log('CheckReleaseVersion Failed, skip!', currVersion, nextVersion);
      return;
    }

    const label = searchReleaseLabel(currVersion, nextVersion);

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
    await this.publishNodePackage();
  }
}
