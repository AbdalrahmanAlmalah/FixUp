const checkCookie = () => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie;
      if (name === "jwt") {
        return true;
      }
    }
    return false;
  };
  
  module.exports = { checkCookie };
  