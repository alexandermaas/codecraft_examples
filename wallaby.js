module.exports = function (w) {
    return {
        files: ['src/**/*.ts', '!src/**/*.spec.ts', 'src/**/*.json'],

        tests: ['src/**/*.spec.ts'],

        env: {
            type: 'node',
        },

        compilers: {
            '**/*.ts?(x)': w.compilers.typeScript({
                resolveJsonModule: true,
                esModuleInterop: true,
            }),
        },
        // or any other supported testing framework:
        // https://wallabyjs.com/docs/integration/overview.html#supported-testing-frameworks
        testFramework: 'jasmine',
    };
};
