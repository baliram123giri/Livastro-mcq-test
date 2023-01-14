import Questions from "./Pages/Questions/Questions";
import Result from "./Pages/Result/Result";
import DataProvider from "./Utils/DataProvider";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <DataProvider>
      <div
        style={{
          background: "url(../img/bg.jpg)",
          height: "100vh",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Questions />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </BrowserRouter>
      </div>
    </DataProvider>
  );
}

export default App;
