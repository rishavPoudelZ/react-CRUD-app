import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import axios from "axios";

// Home component is the main component that renders the UserForm and UserTable components
const Home = ({users, addUser, deleteUser, updateUser}) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data.map((country) => country.name.common));
    });
  }, []);

  return (
    <div>
      <div className="mx-auto p-4 h-[100vh] overflow-auto ">
        <h1 className="text-2xl font-bold mb-4 ml-4font-serif">User Management</h1>
        <UserForm addUser={addUser} countries={countries} />
        <UserTable
          users={users}
          deleteUser={deleteUser}
          updateUser={updateUser}
          countries={countries}
          usersPerPage={5}
        />
      </div>
    </div>
  );
};

export default Home;
