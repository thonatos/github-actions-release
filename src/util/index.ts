import semver from 'semver';

/**
 * Release Proposal Checker
 * @param {String} proposal Release {semver}
 *
 */
export const checkReleaseProposal = (proposal: string) => {
  if (proposal.length < 13) {
    return null;
  }

  if (proposal.slice(0, 7) !== 'Release') {
    return null;
  }
  return semver.valid(proposal.slice(8));
};

export const checkChangelogVersion = (changelog: any = [], releaseVersion: string) => {
  const { version = '' } = changelog[0] || {};
  return version === releaseVersion;
};

/**
 * Release Label Searcher
 * @param {String} currVersion
 * @param {String} nextVersion
 */
export const searchReleaseLabel = (
  currVersion: string,
  nextVersion: string
) => {
  const currSemVer = semver.parse(currVersion) as ReleaseActions.PlainObject;
  const nextSemVer = semver.parse(nextVersion) as ReleaseActions.PlainObject;
  if (!currSemVer || !nextSemVer) {
    return;
  }

  return ['major', 'minor', 'patch'].find((label) => {
    return nextSemVer[label] !== currSemVer[label];
  });
};

/**
 * Check Release Version
 * @param {String} currVersion
 * @param {String} nextVersion
 */
export const checkReleaseVersion = (
  currVersion: string,
  nextVersion: string
) => {
  if (!nextVersion) {
    return false;
  }
  return semver.satisfies(nextVersion, currVersion ? `>${currVersion}` : '*');
};
