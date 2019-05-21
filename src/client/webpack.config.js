const Path                 = require("path");
const HtmlWebPackPlugin    = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostcssPresetEnv     = require("postcss-preset-env");
const Autoprefixer         = require("autoprefixer");
const TsconfigRelativePath = "tsconfig.json";

module.exports = {
    entry: {
        bundle: [ relativePath("index.tsx"), relativePath("index.scss") ]
    },
    output: {
        publicPath: "/",
        filename:   "bundle.js",
        path:       relativePath("../../dist")
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", '.mjs', ".json"] ,
        alias: { 
            "@app":        relativePath("."),
            "@components": relativePath("components"),
            "@reducers":   relativePath("reducers"),
            "@actions":    relativePath("actions"),
            "@configs":    relativePath("configs"),
            "@route":      relativePath("components/route")
        }
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: `awesome-typescript-loader?configFileName=${relativePath(TsconfigRelativePath)}` 
            },
            // {
            //     type: 'javascript/auto',
            //     test: /\.mjs$/,
            //     use: []
            // },
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader",
                exclude: [/node_modules/, /build/],
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                    }, 
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                PostcssPresetEnv(),
                                Autoprefixer()
                            ]
                        }
                    }, 
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: relativePath("index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // We want to avoid bundling all of React into the same file, since this 
    // increases compilation time and browsers will typically be able to cache 
    // a library if it doesn’t change.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // }
};

function relativePath(pathString) {
    return Path.join(__dirname, pathString);
}