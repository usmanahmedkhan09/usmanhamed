
module.exports = {
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  },
  externals: {
    // only define the dependencies you are NOT using as externals!
    canvg: "canvg",
    html2canvas: "html2canvas",
    dompurify: "dompurify"
  }
};