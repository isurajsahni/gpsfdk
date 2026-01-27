import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/layout/UserLayout";
import { Home } from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          {/* Home Page */}
          <Route index element={<Home />} />
        </Route>
        <Route path="/admin" element={<div>{/*Admin Route*/}</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
