import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || []);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDescription, setSearchDescription] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const filtered = users.filter(item => item.id !== id);
      localStorage.setItem('users', JSON.stringify(filtered));
      setUsers(filtered);
    }
  };

  const filteredUsers = users.filter(user =>
    user.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
    user.description.toLowerCase().includes(searchDescription.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="text-center">CRUD App with JSON server</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Description"
            value={searchDescription}
            onChange={(e) => setSearchDescription(e.target.value)}
          />
        </div>
      </div>
      <Link to="/Create" className="btn btn-success my-3">
        Create+
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td className="desc col-1">{user.id}</td>
              <td className="desc col-2">{user.title}</td>
              <td className="desc col-3">{user.description}</td>
              <td>
                <img className="desc col-3" src={user.imageURL} alt="My Image" />
              </td>
              <td className="desc col-3">
                <Link
                  to={`/edit/${user.id}`}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-sm btn-danger ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
