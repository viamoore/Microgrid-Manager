import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import MicrogridProvider from "./context/microgridProvider";
import { CoreLayout } from "./layouts/index";
import { Toaster } from "./components/ui/toaster";

const App: React.FC = () => {
  return (
    <Router>
      <MicrogridProvider>
        <CoreLayout />
      </MicrogridProvider>
      <Toaster />
    </Router>
  );
};

export default App;
