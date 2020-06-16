//Core
import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth, doLogin } from "helpers/auth-context";
//Styles
import styles from "./styles.module.scss";

function Login(props) {
  const [{ isLogged, error }, setAuthState] = useAuth();
  const [user, setUser] = React.useState("");
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  if (isLogged) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    doLogin(user, setAuthState);
    setUser("");
  };

  const handleChange = (e) => setUser(e.target.value);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.title}>Welkom bij Keytask</div>
        <label htmlFor="name" />
        <input
          ref={inputRef}
          type="text"
          name="name"
          id="name"
          placeholder="Voer gebruiker in"
          className="login-input"
          value={user}
          onChange={handleChange}
          required
          autoComplete="off"
        />
        {error && (
          <p
            className={styles.error}
          >
            {error}
          </p>
        )}
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
