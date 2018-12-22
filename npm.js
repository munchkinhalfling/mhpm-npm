((EasyXHR, MHPMScripts) => {
  return {
    load(pkgName) {
      MHPMScripts.run("https://unpkg.com/@babel/standalone/babel.min.js"); // load Babel
      let npmPkgSource = EasyXHR.getSync("https://cdn.jsdelivr.net/npm/" + pkgName);
      let transformedPkgSrc = Babel.transform(npmPkgSource);
      let require = this.load;
      let module = {exports: {}};
      let exports = new Proxy(module.exports, {});
      eval(transformedPkgSrc);
      return module.exports;
    }
  }
})
