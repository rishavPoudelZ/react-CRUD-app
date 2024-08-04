import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./assets/components/Home";
import Profiles from "./assets/components/Profiles";

function App() {
  // All users related tasks are handled here such as adding, deleting, updating, and storing users in local storage
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    const newUsers = [...users, user];
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const deleteUser = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const updateUser = (index, updatedUser) => {
    const newUsers = users.map((user, i) => (i === index ? updatedUser : user));
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
