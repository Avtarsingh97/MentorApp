import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Toaster from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import routes from "./routes";


function App() {
  return (
    <div className='mx-auto max-w-screen-3xl'>
      {/* <Toaster position='top-center' /> */}
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<RouteElement route={route} />}
            />
          ))}
        </Routes>
      </Router>
    </div>
    
  )
}

const RouteElement = ({ route }) => {
  return route.isProtected ? (<ProtectedRoute>{route.element}</ProtectedRoute>) : (<>{route.element}</>);
};
export default App;
