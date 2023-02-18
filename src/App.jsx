import "./App.css";
import React from "react";
import { auth } from "./firebase/init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  function register() {
    // Register a user
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    // Login a user
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log("logged in", auth);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    // Logout the user
    signOut(auth);
    setUser([]);
    console.log("logged out", auth);

  }

  function logging() {
    return (
      <>
        {auth.currentUser ? (
          <button className="btn btn--color login" onClick={logout}>
            {user.email}
          </button>
        ) : (
          <>
            <button className="btn" onClick={login}>
              Login
            </button>
            <button className="btn btn--color" onClick={register}>
              Register
            </button>
          </>
        )}
      </>
    );
  }

  return (
    <div className="row">
      <div className="App">
        <figure>
          <a href="/">
            <img src="https://frontendsimplified.com/_nuxt/img/Frontend%20Simplified%20Logo.853fbda.png" />
          </a>
        </figure>

        <div className="nav__login">
          {loading ? (
            <>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
            </>
          ) : (
            <>{logging()}</>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
