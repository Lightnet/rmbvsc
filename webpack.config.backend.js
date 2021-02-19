/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 */

const path = require("path");
const outputDir = path.resolve(__dirname,".");
module.exports = {
    mode:"development",
    entry: path.resolve(__dirname,"./src/server/server.js"),
    output:{
        path:outputDir,
        filename:'backend.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ["@babel/plugin-transform-runtime", { "regenerator": true }
                            ]
                        ]
                    }
                }
            }
        ]
    }
}