import * as path from 'path'
import * as webpack from 'webpack'

const config: webpack.Configuration = {
    target: 'node',
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        libraryTarget: 'umd',
        filename: './app.bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{ test: /\.ts$/, use: 'ts-loader' }],
    },
}

export default config
