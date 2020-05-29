const child_process = require('child_process');
const fs = require('fs');
const notarize = require('electron-notarize');

exports.default = function (context) {
    if (context.electronPlatformName === 'darwin' && context.packager.platformSpecificBuildOptions.type !== 'development') {
        const appPath = context.appOutDir + '/' + context.packager.appInfo.productFilename + '.app';
        const configuration = fs.readFileSync('electron-builder.yml', 'utf-8');
        const appBundleId = (/^appId:\s(.*)\s/m.exec(configuration) || [ '', '' ])[1];
        const appleApiKey = process.env.API_KEY_ID;
        const appleApiIssuer = process.env.API_KEY_ISSUER_ID;
        return notarize.notarize({
            appBundleId: appBundleId,
            appPath: appPath,
            appleApiKey: appleApiKey,
            appleApiIssuer: appleApiIssuer,
        });
    }
};