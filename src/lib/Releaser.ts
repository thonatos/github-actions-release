import Base from './Base';

export default class Checker extends Base {
  public async publishNodePackage() {
    const { pkg, tools } = this;
    tools.log('@@publishNodePackage', pkg);
    await tools.runInWorkspace('git', ['checkout', 'master']);
    await tools.runInWorkspace('npm', ['publish', '--access', 'public']);
  }

  public async run(tools: any) {
    await super.init(tools);

    const { event, packageVersion } = this;
    const commitMessage = await this.getCommitMessage();

    if (event !== 'push') {
      tools.log('Releaser: should be triggered with event:push');
      return;
    }

    if (commitMessage === `Release ${packageVersion}`) {
      tools.log(`Releaser: release npm package ${packageVersion}`);
      await this.publishNodePackage();
    }
  }

  private async getCommitMessage() {
    const { tools } = this;
    const { stdout } = await tools.runInWorkspace('git', ['log', '--format=%B', '-n', '1']);
    return stdout.toString().replace(/\n*$/, '');
  }
}
