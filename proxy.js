const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/api', createProxyMiddleware({
    target: 'http://NBAINSIGHTSORIGINAL.somee.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
}));

app.listen(3000, () => {
    console.log('Proxy escuchando en http://localhost:3000');
});
