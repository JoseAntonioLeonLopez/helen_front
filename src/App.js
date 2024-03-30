import { BrowserRouter, Routes, Route }  from "react-router-dom";
import Users from './Components/Users'
import Publications from './Components/Publications'
import Login from './Components/Login'
import Register from './Components/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Publications></Publications>}></Route>
        <Route path="/users" element={<Users></Users>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
