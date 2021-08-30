const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(createProxyMiddleware("/uac", { target: "http://192.168.0.96:9999" }));
  app.use(createProxyMiddleware("/cif", { target: "http://192.168.0.96:9999" }));
  app.use(
    createProxyMiddleware("/mha", {
      target: "http://192.168.0.96:9999",
    })
  );
};
