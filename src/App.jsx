import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./assets/components/Home";
import Profiles from "./assets/components/Profiles";

function App() {
  // All users related tasks are handled here such as adding, deleting, updating, and storing users in local storage
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    user.id = new Date().getTime();
    const newUsers = [...users, user];
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const deleteUser = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const updateUser = (id, updatedUser) => {
    const newUsers = users.map((user) => (user.id === id ? updatedUser : user));
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Routes for the application
  //  the user related tasks are passed as props from one componenet to other components
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                users={users}
                addUser={addUser}
                deleteUser={deleteUser}
                updateUser={updateUser}
              />
            }
          />
          <Route
            path="/profiles"
            element={
              <Profiles
                users={users}
                addUser={addUser}
                deleteUser={deleteUser}
                updateUser={updateUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
