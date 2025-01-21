import { Route, Routes } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import { Login } from "./views/auth/Login";
import { Home } from "./views/Home";
import { Profile } from "./views/Profile";
import { CreatePost } from "./views/CreatePost";
import { Register } from "./views/auth/Register";

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/create" element={<CreatePost />} />
      </Route>
    </Routes>
  );
}

export default App;
