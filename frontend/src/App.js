import logo from "./logo.svg";
import "./App.css";
import Layout from "./Layout";
import { useEffect } from "react";
import { store } from "./redux/store";
import { loadUser } from "./redux/actions/authActions";
function App() {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  //   return () => {
  //     //cleanup
  //   };
  // }, []);
  return <Layout />;
}

export default App;
