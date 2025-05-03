import React, { useState, useEffect, useRef } from "react";
import { ButtonComp } from "../components/ButtonComp";
import { FormInputComp } from "../components/FormInputComp";
import "./sign-up-page.css";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";
import { useLogOut } from "../hooks/useLogOut";

function SignUpPage() {
  const logOut = useLogOut();
  useEffect(() => {
    logOut();
  }, []);

  const signUp = useSignUp();

  const HandleLogIn = async (e) => {
    e.preventDefault();

    const emailValue = e.target.email.value;
    const passValue = e.target.pass.value;

    try {
      await signUp(emailValue, passValue);
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
    }
  };

  return (
    <div className="general-container">
      <h1 className="sign-up-main-title">Registrarse</h1>
      <p className="paragraph-01">
        Ingresá los siguientes datos para realizar el registro
      </p>
      <form className="signup-form" onSubmit={HandleLogIn}>
        <FormInputComp
          className="input1"
          type="email"
          name="email"
          textContent="EMAIL"
        />
        <FormInputComp
          className="input2"
          type="password"
          name="pass"
          textContent="CONTRASEÑA"
        />
        <FormInputComp
          className="input3"
          type="password"
          name="checkpass"
          textContent="CONFIRMAR CONTRASEÑA"
        />
        <p className="paragraph-02">
          ¿Ya tenés una cuenta?{" "}
          <Link to="/log-in" className="login-link">
            Iniciar sesión.
          </Link>
        </p>
        <div className="button-access">
          <ButtonComp color="#ff7f87" textContent="Siguiente" />
        </div>
      </form>
    </div>
  );
}

export { SignUpPage };
