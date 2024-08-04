// src/components/UserForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const UserForm = ({ addUser, countries }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
    profilePicture: null,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      newErrors.name =
        "Name can only contain alphabets, spaces, hyphens, and apostrophes";
    } else if (formData.name.trim().length > 30) {
      newErrors.name = "Name cannot exceed 30 characters";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{7,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be at least 7 digits";
    }
    if (formData.city.trim()) {
      if (!/^[a-zA-Z\s'-]+$/.test(formData.city.trim())) {
        newErrors.city =
          "City can only contain alphabets, spaces, hyphens, and apostrophes";
      } else if (formData.city.trim().length > 30) {
        newErrors.city = "City cannot exceed 30 characters";
      }
    }
    if (formData.district.trim()) {
      if (!/^[a-zA-Z\s'-]+$/.test(formData.district.trim())) {
        newErrors.district =
          "District can only contain alphabets, spaces, hyphens, and apostrophes";
      } else if (formData.district.trim().length > 30) {
        newErrors.district = "District cannot exceed 30 characters";
      }
    }
    if (
      formData.profilePicture &&
      formData.profilePicture.type !== "image/png"
    ) {
      newErrors.profilePicture = "Only PNG images are allowed";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setFormData({ ...formData, profilePicture: files[0] });
      setImageSrc(URL.createObjectURL(files[0]));
      setFileName(files[0].name);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addUser(formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        city: "",
        district: "",
        province: "",
        country: "Nepal",
        profilePicture: null,
      });
      setImageSrc(null);
      setFileName(null);
      setErrors({});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-4 space-y-6 rounded-lg shadow-lg mx-auto font-sans  p-2 text-white"
    >
      <div className="flex flex-col md:flex-row w-full justify-between md:space-x-4">
        <div className="flex flex-col w-full sm:w-full md:w-1/3">
          <label htmlFor="name" className="mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
          {errors.name && (
            <span className="text-red-500 mt-1">{errors.name}</span>
          )}
        </div>
        <div className="flex flex-col sm:w-full md:w-1/3">
          <label htmlFor="email" className="mb-1">
            Email{" "}
            {!/\S+@\S+\.\S+/.test(formData.email) ? (
              <span className="text-red-500"> *</span>
            ) : (
              <span className="text-green-500"> ✔</span>
            )}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
          {errors.email && (
            <span className="text-red-500 mt-1">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col sm:w-full md:w-1/3">
          <label className="mb-1" htmlFor="phone">
            Phone Number{" "}
            {!/^\d{7,}$/.test(formData.phone) ? (
              <span className="text-red-500">*</span>
            ) : (
              <span className="text-green-500">✔</span>
            )}
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
          {errors.phone && (
            <span className="text-red-500 mt-1">{errors.phone}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between md:space-x-4">
        <div className="flex flex-col w-full sm:w-full md:w-1/3">
          <label htmlFor="dob" className="mb-1">DOB:</label>
          <input
            type="date"
            name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col w-full sm:w-full md:w-1/3">
          <label htmlFor="city" className="mb-1">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
          {errors.city && (
            <span className="text-red-500 mt-1">{errors.city}</span>
          )}
        </div>
        <div className="flex flex-col w-full sm:w-full md:w-1/3">
          <label htmlFor="district" className="mb-1">District:</label>
          <input
            type="text"
            name="district"
            id="district"
            value={formData.district}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
          {errors.district && (
            <span className="text-red-500 mt-1">{errors.district}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between md:space-x-4">
        <div className="flex flex-col w-full sm:w-full md:w-1/3">
          <label htmlFor="province" className="mb-1">Province</label>
          <select
            name="province"
            id="province"
            value={formData.province}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
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
          <label htmlFor="country" className="mb-1">Country</label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
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
      <div className="flex items-center">
        <div className="flex flex-col">
          <span className="mb-1 mr-2">Select Profile Picture:</span>
          <label
            htmlFor="profilePicture"
            style={{ cursor: "pointer", display: "inline-block" }}
            className="text-white"
          >
            <FontAwesomeIcon
              icon={faImage}
              className="w-[50px] h-[50px] hover:text-gray-300 transition-colors"
            />
          </label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/png"
            onChange={handleChange}
            style={{ display: "none" }}
            className="px-2 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
          />
        </div>

        {errors.profilePicture && (
          <span className="text-red-500 mt-1">{errors.profilePicture}</span>
        )}
        {imageSrc && (
          <div className="mt-4 flex justify-center">
            <img
              src={imageSrc}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full border border-gray-700 object-cover"
            />
          </div>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="bg-indigo-500 rounded-sm text-white px-4 py-2 hover:bg-indigo-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserForm;
