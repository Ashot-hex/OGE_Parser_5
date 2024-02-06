const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: "development",
    entry: {
        ContentScript: path.resolve(__dirname, "src/ContentScript.ts"),
        Popup: path.resolve(__dirname, "src/Popup/PopupScript.ts"),
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "Model/[name].bundle.js"
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: ".", context: "public" }]
        }),
    ],
    devtool: 'source-map'
};