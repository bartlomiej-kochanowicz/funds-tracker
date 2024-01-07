import Cookies from "js-cookie";

export const isUserLoggedIn = Cookies.get("isLoggedIn") === "true";
