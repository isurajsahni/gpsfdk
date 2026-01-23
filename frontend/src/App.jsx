import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/layout/UserLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout/>}>{/*User Route*/}</Route>
        <Route path="/admin" element={<div>{/*Admin Route*/}</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
