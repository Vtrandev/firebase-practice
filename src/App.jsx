import "./App.css";
import React from "react";
import { auth, db } from "./firebase/init";
import { collection, addDoc, getDocs, doc, getDoc, query, where, updateDoc, deleteDoc } from "firebase/firestore"
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

  async function updatePost() {
    const hardcodedId = "pXqRZ9z4zIahjAeRjtTA"
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId)
    console.log(post)
    const newPost = {
      ...post,
    //   description: "Finish Frontend Simplified",
      title: "Land a $400k job",
    //   uid: "1"
    }
    updateDoc(postRef, newPost);
  }

  function deletePost() {
    const hardcodedId = "pXqRZ9z4zIahjAeRjtTA"
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef);
  }




  function createPost() {
    const post = {
      title: "Land a $100k job",
      description: "Finish Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const data = await getDocs(collection(db, "posts"));
    console.log(data);
    const { docs} = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({...elem.data(), id: elem.id}))
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef)
    return postSnap.data();
  }

  async function getPostsByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    )
    const { docs } = await getDocs(postCollectionRef);
    console.log (docs.map(doc => doc.data()));
  }




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
    }, 1000);
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
        {/* {auth.currentUser ? ( */}
          <button className="btn btn--color login" onClick={logout}>
            {user.email}
          </button>
        {/* ) : ( */}
          <>
            <button className="btn" onClick={login}>
              Login
            </button>
            <button className="btn btn--color" onClick={register}>
              Register
            </button>
            <button onClick={createPost}>Create Post</button>
            <button onClick={getAllPosts}>Get All Posts</button>
            <button onClick={getPostById}>Get Posts by Id</button>
            <button onClick={getPostsByUid}>Get Posts by Uid</button>
            <button onClick={updatePost}>Update Post</button>
            <button onClick={deletePost}>Delete Post</button>
          </>
        {/* )} */}
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
