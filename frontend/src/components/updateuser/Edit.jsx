import React, { useEffect, useState } from 'react';
import "../adduser/add.css";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    title: "",
    description: "",
    completed: false,
    created_at: "",
    updated_at: ""
  });

  const inputChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === 'checkbox' ? checked : value });
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/getone/${id}`)
      .then((response) => {
        const { title, description, completed, created_at, updated_at } = response.data;
        setUser({ title, description, completed, created_at, updated_at });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/update/${id}`, user);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='adduser'>
      <Link to={"/"}>Back</Link>
      <h3>Update User</h3>
      <form className='addUserForm' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor='title'>Title</label>
          <input type="text" value={user.title} onChange={inputChangeHandler} id="title" name="title" autoComplete='off' placeholder='Title' />
        </div>
        <div className='inputGroup'>
          <label htmlFor='description'>Description</label>
          <input type="text" value={user.description} onChange={inputChangeHandler} id="description" name="description" autoComplete='off' placeholder='Description' />
        </div>
        <div className='inputGroup'>
          <label htmlFor='completed'>Completed</label>
          <input type="checkbox" checked={user.completed} onChange={inputChangeHandler} id="completed" name="completed" />
        </div>
        <div className='inputGroup'>
          <label htmlFor='created_at'>Created At</label>
          <input type="text" value={new Date(user.created_at).toLocaleString()} disabled />
        </div>
        <div className='inputGroup'>
          <label htmlFor='updated_at'>Updated At</label>
          <input type="text" value={new Date(user.updated_at).toLocaleString()} disabled />
        </div>
        <div className='inputGroup'>
          <button type="submit">UPDATE USER</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
