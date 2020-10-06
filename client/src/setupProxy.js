const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://gentle-mountain-82880.herokuapp.com',
            changeOrigin: true,
        })
    );
};