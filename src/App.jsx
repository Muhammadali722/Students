

import React, { useState } from "react";

const initialStudents = [
  {
    id: 1,
    nickname: "Muka",
    salary: 10000,
    firstName: "Rovshan",
    lastName: "Grafin",
  },
  {
    id: 2,
    nickname: "Risk",
    salary: 200,
    firstName: "no rink",
    lastName: "no ferrari",
  },
  {
    id: 3,
    nickname: "Dasha",
    salary: 41200000,
    firstName: "Dasha",
    lastName: "Grafinovna",
  },
  {
    id: 4,
    nickname: "Ergash ketmon",
    salary: 300,
    firstName: "Ergash aka",
    lastName: "Ketmon boy ogli",
  },
];

function App() {
  const [users, setUsers] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    nickname: "",
    salary: "",
  });

  const openCreateModal = () => {
    setFormData({
      id: null,
      firstName: "",
      lastName: "",
      nickname: "",
      salary: "",
    });
    setModalType("create");
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setFormData(user);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "create") {
      const newUser = { ...formData, id: Date.now(), salary: +formData.salary };
      setUsers((prev) => [...prev, newUser]);
    } else {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === formData.id ? { ...formData, salary: +formData.salary } : u
        )
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) =>
    sortOrder === "Sort ishlatish" ? a.salary - b.salary : b.salary - a.salary
  );

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6 bg-blue-700">
        <input
          type="text"
          placeholder="Search students by their name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={() =>
            setSortOrder((prev) =>
              prev === "Sort ishlatish" ? "Sort ishlatmaslik" : "ishlatish"
            )
          }
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sort: {sortOrder}
        </button>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          + Add New Student
        </button>
      </div>
      {/* Ul  */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedUsers.map((user) => (
          <li
            key={user.id}
            className="bg-[#F9F9F9] shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:scale-105 transition-all duration-300"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-medium text-gray-800">Nickname:</span>{" "}
                {user.nickname}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium text-gray-800">Salary:</span>{" "}
                {user.salary.toLocaleString()} so‘m
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => openEditModal(user)}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all w-[50%]"
              >
                Edit
              </button>
              {/* <button
                onClick={() => handleDelete(user.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Delete
              </button> */}
              <button 
              onClick={() => handleDelete(user.id)}
                className="Btn-delete w-[50%]">
                <span className="text">Delete</span>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded flex flex-col gap-4 w-[350px]"
          >
            <h2 className="text-xl font-bold mb-2">
              {modalType === "create" ? "Add New Student" : "Edit Student"}
            </h2>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Nickname"
              value={formData.nickname}
              onChange={(e) =>
                setFormData({ ...formData, nickname: e.target.value })
              }
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Salary"
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              className="border p-2 rounded"
              required
            />

            <div className="flex justify-between mt-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
