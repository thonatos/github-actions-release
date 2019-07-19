import Debug from 'debug';
import * as parse from 'git-changelog-parser';
import latestNpmVersion from 'latest-version';
import { checkReleaseProposal } from '../util';
export default class Base {
  public tools: any;
  public options: any;
  public debug: Debug.Debugger;

  public pkg: any = {};
  public event: string = '';
  public action: string = '';

  public changelog: any = '';
  public packageVersion: any = '';
  public releaseVersion: any = '';
  public latestVersion: any = '';

  constructor() {
    this.debug = Debug('Github-Actions-Release');
  }

  public async init(tools: any) {

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
    this.tools = tools;
    this.event = event;
    this.action = action;

    await this.prepare();
  }

  public async prepare() {
    const tools = this.tools;
    const pkg = tools.getPackageJSON() || {};
    const { payload } = tools.context;

    // changelog
    const content = tools.getFile('History.md');
    this.changelog = parse(content);

    // current npm version
    this.packageVersion = pkg.version || '*';

    // latest npm version
    this.latestVersion = await latestNpmVersion(pkg.packageName || '');

    // release npm version
    this.releaseVersion = checkReleaseProposal(payload.pull_request.title);
  }
}
