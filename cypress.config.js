const { defineConfig } = require("cypress");

const execa = require("execa");
const findBrowser = () => {
  const browserPath =
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";

  return execa(browserPath, ["--version"]).then((result) => {
    const [, version] = /Brave Browser (\d+\.\d+\.\d+\.\d+)/.exec(
      result.stdout
    );
    const majorVersion = parseInt(version.split(".")[0]);

    return {
      name: "Brave",
      channel: "stable",
      family: "chromium",
      displayName: "Brave",
      version,
      path: browserPath,
      majorVersion,
    };
  });
};

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return findBrowser().then((browser) => {
        return {
          browsers: config.browsers.concat(browser),
        };
      });
    },

    excludeSpecPattern: [
      "cypress/e2e/1-getting-started/*.js",
      "cypress/e2e/2-advanced-examples/*.js",
    ],
  },
});
