#!/usr/bin/env bash
set -e

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

GET_VERSION=$(cat <<-END
  const pkgPath = './package.json';
  const pkg = require(pkgPath);
  console.log(pkg.version);
END
)

UPDATE_PKG_JSON=$(cat <<-END
  const pkgPath = './package.json';
  const fs = require('fs');
  const pkg = require(pkgPath);
  pkg.devDependencies['semver'] = pkg.version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
END
)

pushd $ROOT &&
VERSION=$(node -e "$GET_VERSION") &&
echo Started creating SemVer UMD module v$VERSION &&
node -e "$UPDATE_PKG_JSON" &&
npm i &&
npm run build &&
npm run test &&
git commit -a -m "release v$VERSION" &&
git tag "v$VERSION" &&
npm publish &&
echo Successfully finished creating SemVer UMD module v$VERSION
popd
