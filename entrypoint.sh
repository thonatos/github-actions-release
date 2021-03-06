#!/bin/sh
set -e

# env
echo "# env";
sh -c "env";

# event.json
if [ -n "$GITHUB_EVENT_PATH" ]; then
  echo "# event.json";
  cat "$GITHUB_EVENT_PATH";
fi

# npm
if [ -n "$NPM_TOKEN" ]; then
  echo "# npm";

  # Respect NPM_CONFIG_USERCONFIG if it is provided, default to $HOME/.npmrc
  NPM_CONFIG_USERCONFIG="${NPM_CONFIG_USERCONFIG-"$HOME/.npmrc"}";
  NPM_REGISTRY_URL="${NPM_REGISTRY_URL-registry.npmjs.org}";
  NPM_STRICT_SSL="${NPM_STRICT_SSL-true}";
  NPM_REGISTRY_SCHEME="https";
  if ! $NPM_STRICT_SSL
  then
    NPM_REGISTRY_SCHEME="http";
  fi

  # Allow registry.npmjs.org to be overridden with an environment variable
  printf "//%s/:_authToken=%s\\nregistry=%s\\nstrict-ssl=%s" "$NPM_REGISTRY_URL" "$NPM_TOKEN" "${NPM_REGISTRY_SCHEME}://$NPM_REGISTRY_URL" "${NPM_STRICT_SSL}" > "$NPM_CONFIG_USERCONFIG";

  chmod 0600 "$NPM_CONFIG_USERCONFIG";
fi

sh -c "$*";