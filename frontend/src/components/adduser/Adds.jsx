import React, { useState } from 'react';
import "./add.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Adds = () => {
  const initialUserState = {
    title: "",
    description: "",
    completed: false,
    created_at: "",
    updated_at: ""
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const userWithTimestamps = { ...user, created_at: currentDate, updated_at: currentDate };

    try {
      const response = await axios.post("http://localhost:8000/api/create", userWithTimestamps);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the user.", { position: "top-right" });
    }
  };

  return (
    <div className='adduser'>
      <Link to={"/"}>Back</Link>
      <h3>Add New User</h3>
      <form className='addUserFrom' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor='title'>Title</label>
          <input type="text" onChange={inputHandler} id="title" name="title" autoComplete='off' placeholder='Title' />
        </div>
        <div className='inputGroup'>
          <label htmlFor='description'>Description</label>
          <input type="text" onChange={inputHandler} id="description" name="description" autoComplete='off' placeholder='Description' />
        </div>
        <div className='inputGroup'>
          <label htmlFor='completed'>Completed</label>
          <input type="checkbox" onChange={(e) => setUser({ ...user, completed: e.target.checked })} id="completed" name="completed" />
        </div>
        <div className='inputGroup'>
          <button type="submit">ADD USER</button>
        </div>
      </form>
    </div>
  );
};

export default Adds;
