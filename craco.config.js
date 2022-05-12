const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#0a6cc2',
              '@link-color': '#0a6cc2',
              '@table-header-bg': '#e7e7e7',
              '@table-row-hover-bg': '#dfe7f1',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
