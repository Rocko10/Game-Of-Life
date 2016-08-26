module.exports = {

    entry: './src/Main.js',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['babel-preset-es2015', 'react']
            }
        }]
    }

};
