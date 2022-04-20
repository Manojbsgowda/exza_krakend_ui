import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Layout from "./components/layout/Layout";
import { store } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
// minified version is also included

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Layout />
        </Provider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={false}
        hideProgressBar={true}
        closeOnClick
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
