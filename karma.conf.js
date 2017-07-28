const sauceLabs = process.env.SL;

const sauceLabsLaunchers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 10'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 10'
  },
  sl_safari: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.11'
  },
  sl_edge: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10'
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '11.103',
    platform: 'Windows 10'
  },
  sl_ie_10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '10.0',
    platform: 'Windows 7'
  },
  sl_ie_9: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '9.0',
    platform: 'Windows 7'
  }
};

module.exports = function (config) {
  config.set({
    browsers: sauceLabs ? Object.keys(sauceLabsLaunchers) : ['PhantomJS'],
    browserNoActivityTimeout: 30000,
    files: [
      {pattern: 'test/**/*.spec.js', watched: true}
    ],
    frameworks: ['browserify', 'jasmine'],
    preprocessors: {
      'test/**/*spec.js': ['browserify']
    },
    browserify: {
      transform: [
        ['babelify'],
        ['browserify-istanbul', {
          instrumenterConfig: {
            embedSource: true   // this is important for HTML reports
          }
        }]
      ]
    },

   sauceLabs: {
      testName: 'Unit Tests',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      startConnect: false,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY
    },

   reporters: ['progress'].concat(
      sauceLabs ? 'saucelabs' : 'coverage'
    ),
    coverageReporter: {
      dir: './coverage',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'},
        {type: 'lcovonly', subdir: '.', file: 'lcov.info'}
      ]
    },
    customLaunchers: sauceLabs ? sauceLabsLaunchers : null
  });
};
