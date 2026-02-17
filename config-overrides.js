module.exports = function override(config, env) {
  // Add polyfills for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify"),
    "url": require.resolve("url"),
    "zlib": require.resolve("browserify-zlib"),
    "path": require.resolve("path-browserify"),
    "fs": false,
    "net": false,
    "tls": false,
    "child_process": false,
    "async_hooks": false,
    "buffer": require.resolve("buffer"),
    "util": require.resolve("util"),
    "querystring": require.resolve("querystring-es3")
  };

  env = 'development';
  
  // Add proxy for API requests
  if (env === 'development') {
    config.devServer = {
      ...config.devServer,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          timeout: 60000, // Increase timeout to 60 seconds
          proxyTimeout: 60000,
        },
      },
    };
  }

  return config;
};
