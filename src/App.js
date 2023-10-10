import { FirebaseConfig } from "./config/Config"
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth"
import { initializeApp } from "firebase/app"
import { Routes, Route } from "react-router-dom"
import { useState } from "react"


import { Header } from "./components/Header"
import './App.css'
import { About } from "./pages/About"
import { Home } from "./pages/Home"
import { Contact } from "./pages/Contact"
import { Signup } from "./pages/Signup"
import { Signout } from "./pages/Signout"
import { Signin } from "./pages/Signin"

//contexts
import { AuthContext } from "./contexts/AuthContext"

function App() {
  const FBapp = initializeApp(FirebaseConfig)
  const FBauth = getAuth()

  // navigation array
  const NavItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
    { label: "Create Account", link: "signup" },
    { label: "Log in", link: "/signin" },
  ]

  // navigation for authenticated user
  const AuthNavItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
    { label: "Log out", link: "/signout" },
  ]
  // application states
  const [nav, setNav] = useState(NavItems)
  const [auth, setAuth] = useState(false)
  // authentication observer
  onAuthStateChanged(FBauth, (user) => {
    if (user) {
      // currently authentication
      setAuth(user)
      setNav(AuthNavItems)
    }
    else {
      // currently unauthenticated
      setAuth(false)
      setNav(NavItems)
    }
  })
  // signing up a user
  const signUp = (email, password) => {
    createUserWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => {
        // do something
      })
      .catch((error) => console.log(error.message))
  }
  const logOut = () => {
    signOut(FBauth).then(() => {
      // user is signed out
    })

  }

  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(FBauth, email, password)
        .then(() => {
          // user is signed in
          resolve(true)
        })
        .catch((error) => { 
          console.log(error)
          reject( error.code )
        })
    })

  }

  return (
    <div className="App">
      <Header items={nav} />
      <AuthContext.Provider value={auth}>
        <Routes>
          <Route path="/" element={<Home greeting="Hey you are at home!" />} />
          <Route path="/about" element={<About greeting="Hey you, About this page" />} />
          <Route path="/contact" element={<Contact greeting="Hey this your contact" />} />
          <Route path="/signup" element={<Signup handler={signUp} />} />
          <Route path="/signout" element={<Signout handler={logOut} />} />
          <Route path="/signin" element={<Signin handler={signIn} authstate={auth} />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;