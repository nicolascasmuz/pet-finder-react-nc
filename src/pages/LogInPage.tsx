import React, { useEffect } from "react";
import { ButtonComp } from "../components/ButtonComp";
import { FormInputComp } from "../components/FormInputComp";
import { Link } from "react-router-dom";
import { useLogIn } from "../hooks/useLogIn";
import "./log-in-page.css";
import { useLogOut } from "../hooks/useLogOut";

function LogInPage() {
  const logOut = useLogOut();
  useEffect(() => {
    logOut();
  }, []);

  const logIn = useLogIn();

  const HandleLogIn = async (e) => {
    e.preventDefault();

    const emailValue = e.target.email.value;
    const passValue = e.target.pass.value;

    if (emailValue && passValue) {
      try {
        await logIn(emailValue, passValue);
      } catch (error) {
        console.error("Error al iniciar sesión: ", error);
      }
    }
  };

  return (
    <div className="general-container">
      <h1 className="log-in-main-title">Iniciar sesión</h1>
      <p className="paragraph-01">
        Ingresá los siguientes datos para iniciar sesión
      </p>
      <form className="login-form" onSubmit={HandleLogIn}>
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
        <p className="paragraph-02">
          ¿Aún no estás registrado?{" "}
          <Link to="/sign-up" className="login-link">
            Registrarse.
          </Link>
        </p>
        <div className="button-next">
          <ButtonComp color="#ff7f87" textContent="Acceder" />
        </div>
      </form>
    </div>
  );
}

export { LogInPage };
