import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserTable from "./UserTable";
import axios from "axios";

const Profiles = ({ users, addUser, deleteUser, updateUser }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data.map((country) => country.name.common));
    });
  }, []);

  return (
    <div className="m-4">
      <UserTable
        users={users}
        deleteUser={deleteUser}
        updateUser={updateUser}
        countries={countries}
        usersPerPage={100}
      />
    </div>
  );
};

export default Profiles;
