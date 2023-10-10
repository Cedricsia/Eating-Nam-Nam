import { BrowserRouter } from "react-router-dom";

import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CurrentUserContextProvider from "./contexts/CurrentUserContext";

function App() {
  return (
    <BrowserRouter>
      <CurrentUserContextProvider>
        <Navbar />
        <AppRoutes />
        <Footer />
      </CurrentUserContextProvider>
    </BrowserRouter>
  );
}

export default App;
