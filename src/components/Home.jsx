import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "./UserReducer";

export default function Home() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser({ id: id }));
    }
  };
  // console.log(users)
  return (
    <div className="container">
      <h2 className="text-center">CRUD App with JSON server</h2>
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
          {users.map((user, index) => (
            <tr key={index}>
              <td className="desc col-1">{user.id}</td>
              <td className="desc col-2">{user.title}</td>
              <td className="desc col-3">{user.description}</td>
              <td>
                <img className="desc col-3" src={user.image} alt="My Image" />
              </td>
              <td className="desc col-3">
                <Link
                  to={`/edit/${user.id}`}
                  className="btn btn-sm btn-primary "
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-sm btn-danger ms-2 "
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
