// src/components/UserTable.jsx
import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

const UserTable = ({
  users,
  deleteUser,
  updateUser,
  countries,
  usersPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  Modal.setAppElement("#root");

  const validate = () => {
    const newErrors = {};
    if (!editingUser.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s'-]+$/.test(editingUser.name.trim())) {
      newErrors.name =
        "Name can only contain alphabets, spaces, hyphens, and apostrophes";
    } else if (editingUser.name.trim().length > 30) {
      newErrors.name = "Name cannot exceed 30 characters";
    }
    if (!editingUser.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(editingUser.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!editingUser.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{7,}$/.test(editingUser.phone)) {
      newErrors.phone = "Phone number must be at least 7 digits";
    }
    if (editingUser.city.trim()) {
      if (!/^[a-zA-Z\s'-]+$/.test(editingUser.city.trim())) {
        newErrors.city =
          "City can only contain alphabets, spaces, hyphens, and apostrophes";
      } else if (editingUser.city.trim().length > 30) {
        newErrors.city = "City cannot exceed 30 characters";
      }
    }
    if (editingUser.district.trim()) {
      if (!/^[a-zA-Z\s'-]+$/.test(editingUser.district.trim())) {
        newErrors.district =
          "District can only contain alphabets, spaces, hyphens, and apostrophes";
      } else if (editingUser.district.trim().length > 30) {
        newErrors.district = "District cannot exceed 30 characters";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingUser(users[index]);
    openModal();
  };

  const handleSave = () => {
    if (validate()) {
      updateUser(editingIndex, editingUser);
      setEditingIndex(null);
      setEditingUser(null);
      closeModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
  const handleFilterChange = (e) => setFilterCriteria(e.target.value);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return faSort;
    return sortConfig.direction === "asc" ? faSortUp : faSortDown;
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.phone.includes(searchTerm) ||
        user.city.toLowerCase().includes(searchTerm) ||
        user.district.toLowerCase().includes(searchTerm) ||
        user.province.toLowerCase().includes(searchTerm) ||
        user.country.toLowerCase().includes(searchTerm)
    )
    .filter((user) => (filterCriteria ? user.country === filterCriteria : true))
    .sort((a, b) => {
      if (sortConfig.key) {
        if (sortConfig.direction === "asc") {
          return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        } else {
          return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
        }
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="">
      <h1 className="text-2xl font-bold font-serif text-white mb-4">
        Profiles
      </h1>
      <div className="mb-4 flex flex-col gap-y-2 lg:flex-row">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-700 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
        />
        <select
          value={filterCriteria}
          onChange={handleFilterChange}
          className="lg:ml-4 px-4 py-2 border border-gray-700 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
        >
          <option value="">All Countries</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {usersPerPage === 5 ? (
          <Link
            to="/profiles"
            className="px-4 py-2 my-2 bg-indigo-500 hover:bg-indigo-700 float-right rounded-sm transition-colors ml-auto"
          >
            Show All Users
          </Link>
        ) : (
          <Link
            to="/"
            className="px-4 py-2 my-2 bg-indigo-500 hover:bg-indigo-700 float-right rounded-sm transition-colors ml-auto"
          >
            Back to home
          </Link>
        )}
      </div>
      <div className="overflow-x-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full">
        <table className="bg-gray-800 w-full">
          <thead className="bg-gray-700">
            <tr>
              {[
                "name",
                "email",
                "phone",
                "dob",
                "city",
                "district",
                "province",
                "country",
              ].map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <FontAwesomeIcon icon={getSortIcon(key)} className="ml-2" />
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {currentUsers.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700 transition duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {user.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {user.dob}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {user.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {user.district}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {user.province}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {user.country}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    onClick={() => handleEdit(startIndex + index)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(startIndex + index)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
            }
            className="bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-700 transition-colors"
          >
            ← Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
            className="bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-700 transition-colors"
          >
            Next →
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit User"
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-[70%] mt-4 h-[50vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl text-white mb-4">Edit User</h2>
        {editingUser && (
          <form>
            <div className="flex flex-col md:flex-row w-full justify-between md:space-x-4">
              <div className="flex flex-col w-full sm:w-full md:w-1/3">
                <label>
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-700 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name}</span>
                )}
              </div>
              <div className="flex flex-col w-full sm:w-full md:w-1/3">
                <label>
                  Email{" "}
                  {!/\S+@\S+\.\S+/.test(editingUser.email) ? (
                    <span className="text-red-500"> *</span>
                  ) : (
                    <span className="text-green-500"> ✔</span>
                  )}
                </label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-700 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col w-full sm:w-full md:w-1/3">
                <label>
                  Phone Number{" "}
                  {!/^\d{7,}$/.test(editingUser.phone) ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <span className="text-green-500">✔</span>
                  )}
                </label>
                <input
                  type="text"
                  name="phone"
                  value={editingUser.phone}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-700 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full justify-between md:space-x-4">
              <div className="flex flex-col w-full sm:w-full md:w-1/3">
                <label>DOB:</label>
                <input
                  type="date"
                  name="dob"
                  value={editingUser.dob}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-700 rounded bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col w-full sm:w-full md:w-1/3">
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={editingUser.city}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-700 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                />
              </div>
              <div className="flex flex-col w-full sm:w-full md:w-1/3">
                <label>District:</label>
                <input
                  type="text"
                  name="district"
                  value={editingUser.district}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-700 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row w-full justify-between md:space-x-4">
              <div className="flex flex-col w-full sm:w-full md:w-1/3">
                <label>Province:</label>
                <select
                  name="province"
                  value={editingUser.province}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-700 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                >
                  <option value="">Select Province</option>
                  {[1, 2, 3, 4, 5, 6, 7].map((province) => (
                    <option key={province} value={province}>
                      Province {province}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full sm:w-full md:w-1/3">
                <label>Country:</label>
                <select
                  name="country"
                  value={editingUser.country}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-700 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full sm:w-full md:w-1/3"></div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default UserTable;
