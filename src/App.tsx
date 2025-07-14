import { BrowserRouter, Route, Routes } from "react-router-dom";
import Crud from "./pages/Crud/Index";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Crud />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="bottom-right" />
    </>
  );
};

export default App;
