module.exports = function (w) {
    return {
        files: ['src/**/*.ts', '!src/**/*.spec.ts', 'src/**/*.json', 'jest.json'],

        tests: ['src/**/*.spec.ts'],

        env: {
            type: 'node',
        },
        setup: function (wallaby) {
            var jestConfig = require('./jest.json');
            /* for example:
             * jestConfig.globals = { "__DEV__": true }; */
            wallaby.testFramework.configure(jestConfig);
        },
        compilers: {
            '**/*.ts?(x)': w.compilers.typeScript({
                resolveJsonModule: true,
                esModuleInterop: true
            }),
        },
        // or any other supported testing framework:
        // https://wallabyjs.com/docs/integration/overview.html#supported-testing-frameworks
        testFramework: 'jest',
    };
};
