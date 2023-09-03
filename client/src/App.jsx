import DrawingCanvas from "./DrawingCanvas";
import Landing from "./Landing";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/rooms/:roomId" element={<DrawingCanvas />} />
      </Routes>
    </>
  );
};

export default App;
