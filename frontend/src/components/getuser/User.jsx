import React, { useEffect, useState } from 'react';
import "./user.css";
import toast from 'react-hot-toast';
import axios from "axios";
import { Link } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching users.", { position: "top-right" });
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(response.data.msg, { position: 'top-right' });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the user.", { position: 'top-right' });
    }
  };

  return (
    <div className='userTable'>
      <Link to={"/add"} className='addButton'>ADD TODO LIST</Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.title}</td>
              <td>{user.description}</td>
              <td>{user.completed ? "Yes" : "No"}</td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
              <td>{new Date(user.updated_at).toLocaleString()}</td>
              <td className='actionButtons'>
                <button onClick={() => deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                <Link to={`/edit/${user._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
