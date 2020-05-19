const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    configureWebpack: {
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: './manifest.json',
                    },
                    {
                        from: './src/assets/img',
                        to: 'img'
                    },
                    {
                        from: './src/background.js',
                    },
                    {
                        from: './src/content.js'
                    }
                ]
            })
        ]
    }
}