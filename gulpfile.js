/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';
const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const path = require('path');
const bundleAnalyzer = require('webpack-bundle-analyzer');

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

const fontLoaderConfig = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/'
      }
    }
  ]
};

// Merge custom loader to web pack configuration
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    const lastDirName = path.basename(__dirname);
    const dropPath = path.join(__dirname, 'temp', 'stats');
    generatedConfiguration.plugins.push(
      new bundleAnalyzer.BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static',
        reportFilename: path.join(dropPath, `${lastDirName}.stats.html`),
        generateStatsFile: true,
        statsFilename: path.join(dropPath, `${lastDirName}.stats.json`),
        logLevel: 'error'
      })
    );

    generatedConfiguration.module.rules.push(fontLoaderConfig);

    if (!generatedConfiguration.resolve.alias) {
      generatedConfiguration.resolve.alias = {};
    }

    return generatedConfiguration;
  }
});

/* fast-serve */
const { addFastServe } = require('spfx-fast-serve-helpers');
addFastServe(build);
/* end of fast-serve */

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};
build.sass.setConfig({ warnOnNonCSSModules: false, useCssModules: true });
build.addSuppression(/Warning - \[sass\]/gi);

gulp.task('watch', (done) => {
  const watcher = gulp.watch(
    [
      'src/**/*.{ts,tsx,scss}', // Watch for TypeScript and SCSS file changes
      '!**/*.icloud', // Exclude iCloud files
      '!src/**/*.DS_Store', // Exclude macOS system files
      '!node_modules/**', // Exclude node_modules directory
      '!temp/**', // Exclude temporary files
      '!dist/**' // Exclude distribution files
    ],
    build.rig.getBuildTask()
  );

  watcher.on('change', (path) => {
    console.log(`[Watcher] File ${path} has been changed`);
  });

  watcher.on('add', (path) => {
    console.log(`[Watcher] File ${path} has been added`);
  });

  watcher.on('unlink', (path) => {
    console.log(`[Watcher] File ${path} has been removed`);
  });

  done();
});

gulp.task('default', gulp.series('watch'));

// build.tslintCmd.enabled = false;
// build.lintCmd.enabled = false;
build.initialize(gulp);
