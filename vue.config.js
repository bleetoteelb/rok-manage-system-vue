module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  "devServer": {
    "public": "bleetoteelb.iptime.org",
    "port": 8080,
    "hotOnly": true,
    "disableHostCheck": true,
    "clientLogLevel": "warning",
    "inline": true,
    "headers": {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  "lintOnSave": false,
  "outputDir": "../rok/public"
}
