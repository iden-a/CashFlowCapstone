import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";

export default function GoogleOAuth({ setAppState }) {
  const navigateTo = useNavigate();
  async function register(email, username, first_name, last_name, password) {
    try {
      const { data, error, message } = await apiClient.register({
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: password,
        confirmPassword: password,
      });
      if (error) {
        return;
      }

      if (data) {
        setAppState((prevState) => ({
          ...prevState,
          user: data.user,
          isAuthenticated: true,
          goals: data.goals,
          quizzes: data.quizzes,
        }));
        localStorage.setItem("CashFlow_Token", data.token);
        apiClient.setToken(data.token);
        navigateTo("/registerquiz");
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleCallbackResponse(response) {
    console.log(response.credential);
    const user = jwt_decode(response.credential);
    console.log(user);
    if (user) {
      register(
        user.email,
        user.name,
        user.given_name,
        user.family_name,
        user.sub
      );
    }
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "477805064769-8qp811kp2mhb4aim7g8c5agcjaq9bdpk.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      context: "signup",
      size: "large",
    });
  }, []);

  return (
    <div
      style={{
        margin: "0 auto",
        backgroundColor: "red",
        width: "fit-content",
        textAlign: "center",
      }}
      id="signInDiv"
    ></div>
  );
}
