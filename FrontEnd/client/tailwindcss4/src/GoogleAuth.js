// GoogleAuth.js
import { useEffect } from "react";
import { gapi } from "gapi-script";

export const initGoogleAuth = () => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/drive.file",
    });
  });
};

export const signInGoogle = () => {
  return gapi.auth2.getAuthInstance().signIn();
};

export const signOutGoogle = () => {
  gapi.auth2.getAuthInstance().signOut();
};
