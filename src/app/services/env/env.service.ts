export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  // public apiUrl = '';

  // Whether or not to enable debug mode
  // public enableDebug = true;

  public logoName = "";
  public configurationProfile = "";
  public baseHref = "";
  public production = true;
  public showLog = false;
  public dynamicSideNav = true;
  public permissionHandling = true;
  public fontPack = "";

  public authBaseUrl = "";
  public authRevokeUrl = "";
  public apiBaseUrl = "";
  public hubConnection = "";

  public device = "";
  public grant_type = "";
  public client_id = "";
  public client_secret = "";

  constructor() {
  }

}
