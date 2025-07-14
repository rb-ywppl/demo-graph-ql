import { BrowserRouter, Route, Routes } from "react-router-dom";
import MaterialCategory from "./pages/MaterialCategory/Index";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MaterialCategory />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="bottom-right" />
    </>
  );
};

export default App;
