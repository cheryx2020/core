module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['assets.vercel.com', 'i.pinimg.com', 'drive.google.com', 'api.cheryx.com', 'localhost'],
    },
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        // Important: return the modified config
        config.module.rules.push({ test: /\.js$/, use: 'babel-loader' })
        config.module.rules.push({
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
        })
        return config
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    }
                ],
            },
        ];
    }
}
