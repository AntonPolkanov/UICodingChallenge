

const REDIRECT_ON_LOGIN = "redirect_on_login";
const REDIRECT_ON_LOGOUT = "redirect_on_logout";

class Auth {

  constructor(history) {
    this.history = history;
  }

  isAuthenticated = () => {
    return localStorage.getItem("isLoggedIn") === null
      ? false
      : localStorage.getItem("isLoggedIn");
  }

  login = () => {
    localStorage.setItem(REDIRECT_ON_LOGIN, JSON.stringify(this.history.location));
    this.handleAuthentication();
  }

  handleAuthentication = () => {
    this.setSession();
    const redirectLocation = localStorage.getItem(REDIRECT_ON_LOGIN) === null
      ? '/'
      : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
    this.history.push(redirectLocation);
    localStorage.removeItem(REDIRECT_ON_LOGIN);
  }

  setSession = () => {
    localStorage.setItem("isLoggedIn", true);
  }

  clearSession = () => {
    localStorage.removeItem("isLoggedIn");
  }

  logout = () => {
    localStorage.setItem(REDIRECT_ON_LOGOUT, JSON.stringify(this.history.location))
    this.handleLogout();
  }

  handleLogout = () => {
    this.clearSession();
    this.history.push(JSON.parse(localStorage.getItem(REDIRECT_ON_LOGOUT)));
    localStorage.removeItem(REDIRECT_ON_LOGOUT);
  }
}

export default Auth;

