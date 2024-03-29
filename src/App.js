import { BrowserRouter, Routes, Route }  from "react-router-dom";
import Users from './Components/Users'
import Publications from './Components/Publications'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users></Users>}></Route>
        <Route path="/publications" element={<Publications></Publications>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
