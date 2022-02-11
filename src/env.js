(function (window) {
  window.__env = window.__env || {};
  window.__env.logoName = "Saydyz";

  // local
  window.__env.configurationProfile = "dev";
  window.__env.baseHref = "/saydyz-platform/";
  window.__env.production = true;
  window.__env.showLog = true;
  window.__env.dynamicSideNav = true;
  window.__env.permissionHandling = true;
  // window.__env.fontPack = "font-awesome";
  window.__env.fontPack = "";


  window.__env.apiBaseUrl = "http://localhost:5001/api/";
  window.__env.hubConnection = "http://localhost:5001/";


  window.__env.device = "web";
  window.__env.grant_type = "password";
  window.__env.client_id = "ro.web.client";
  window.__env.client_secret = "secret";

}(this));
