import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { useEffect } from "react";
//import { useState } from "react";
const ManageUsers = () => {
  // Dummy user data
  // const [users, setUsers] = useState([
  //   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  //   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  //   { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User" },
  // ]);
  // const [users, setUsers] = useState([]);
  const [user, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/admin/users") // Backend API
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({ fullName: "", email: "", role: "" });

  const startEditing = (selectedUser) => {
    setEditingUser(selectedUser.email);
    setEditedData({ fullName: selectedUser.fullName, email: selectedUser.email, role: selectedUser.role });
  };

  // const saveUser = (email) => {
  //   setUsers(user.map(user => (user.email === email ? { ...user, ...editedData } : user)));
  //   setEditingUser(null);
  // };
  const saveUser = (email) => {
    setUsers(
      user.map((u) => (u.email === email ? { ...u, ...editedData } : u))
    );
    setEditingUser(null);
  };
  const deleteUser = (email) => {
    setUsers(user.filter(user => user.email !== email));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage Users</h1>

        {/* User Table */}
        <div className="bg-white p-4 shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user.email} className="border-b">
                  {editingUser === user.email ? (
                    <>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          className="border p-1 rounded w-full"
                          value={editedData.fullName}
                          onChange={(e) => setEditedData({ ...editedData, fullName: e.target.value })}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="email"
                          className="border p-1 rounded w-full"
                          value={editedData.email}
                          onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                        />
                      </td>
                      <td className="p-2">
                        <select
                          className="border p-1 rounded w-full"
                          value={editedData.role}
                          onChange={(e) => setEditedData({ ...editedData, role: e.target.value })}
                        >
                          <option value="Admin">Admin</option>
                          <option value="User">User</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          onClick={() => saveUser(user.email)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-400 text-white px-3 py-1 rounded ml-2 hover:bg-gray-500"
                          onClick={() => setEditingUser(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">{user.id}</td>
                      <td className="p-2">{user.fullName}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => startEditing(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
                          onClick={() => deleteUser(user.email)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {user.length === 0 && <p className="text-gray-500 text-center mt-4">No users found.</p>}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
