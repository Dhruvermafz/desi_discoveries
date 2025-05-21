import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Router from "./router/Router";
function App() {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  //   return () => {
  //     //cleanup
  //   };
  // }, []);
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
}

export default App;
