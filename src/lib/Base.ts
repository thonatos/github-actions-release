import Debug from 'debug';
import standardVersion from 'standard-version';
import { StandardVersionTypes } from '../constants';
import { checkReleaseProposal } from '../util';
export default class Base {
  public tools: any;
  public options: any;
  public debug: Debug.Debugger;

  public event: string = '';
  public action: string = '';
  public nextVersion: any = '';
  public currVersion: any = '';

  constructor(tools: any) {
    this.tools = tools;
    this.debug = Debug('Github-Actions-Release');
    this.init();
  }

  public async updateLabel(label: string) {
    const {
      repo,
      payload: { number: issueNumber },
    } = this.tools.context;

    await this.tools.github.issues.update({
      ...repo,
      issue_number: issueNumber,
      labels: [`semver:${label}`],
    });
  }

  public async releaseVersion() {
    const tools = this.tools;
    const { nextVersion } = this;
    const { state, merged } = this.tools.context.payload.pull_request;

    tools.log('@@releaseVersion', state, merged, nextVersion);

    if (state !== 'closed' || merged !== true) {
      return;
    }

    await tools.runInWorkspace('git', ['checkout', 'master']);
    await standardVersion({
      infile: 'CHANGELOG.md',
      noVerify: true,
      releaseAs: nextVersion,
      silent: true,
      types: StandardVersionTypes,
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

  public init() {
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
    this.nextVersion = checkReleaseProposal(payload.pull_request.title);
  }
}
