import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MicrogridProvider from "./context/microgridProvider";
import Layout from "./layouts";
import RoutesProvider from "./routes/routes";
import { Toaster } from "./components/ui/toaster";

const App: React.FC = () => {
  return (
    <Router>
      <MicrogridProvider>
        <Layout>
          <RoutesProvider />
        </Layout>
      </MicrogridProvider>
      <Toaster />
    </Router>
  );
};

export default App;
