// AuthProvider.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/user/load-user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to load user data");
        const { user } = await response.json();
        console.log({ user });
        dispatch(loginRedux({ user }));
      } catch (error) {
        console.error(error);
        // localStorage.removeItem("accessToken");
      }
    };

    loadUser();
  }, [dispatch, accessToken]);

  return children;
};

export default AuthProvider;
