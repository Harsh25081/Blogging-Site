import axios from 'axios';
import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./CreateBlog.css"

export default function CreateBlog() {
    let dispatch = useDispatch();
    const navigate = useNavigate();
    let state = useSelector((state) => state);

    const handleChange = (e) => {
        let { name, value } = e.target
        dispatch({
            type: name,
            payload: value
        })
    }

    useEffect(() => {
        dispatch({
            type: "@CREATEBLOGCREATEDBY",
            payload: JSON.parse(localStorage.getItem("userinfo"))._id
        })
    }, [dispatch])

    const handleSubmit = (data) => {
        let { title, body, createdBy, category, files } = data
        const formData = new FormData();
        formData.append('title', title)
        formData.append('body', body)
        formData.append('createdBy', createdBy)
        formData.append('category', category)
        formData.append('files', files)
        axios.post("http://localhost:4000/blogs/createblog", formData)
            .then((res) => { navigate("/"); console.log(res.data.data) })
            .catch((err) => alert(err.response.data.message))
    }

    return (
        <div className='createOuterBox'>
            <Form className='createForm'>
                <h4>Create BLOG </h4>
                <Form.Group className="mb-3" >
                    <label className='label'>Title</label>
                    <Form.Control type="text" placeholder="Enter title" name="@CREATEBLOGTITLE" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <label className='label'>Body</label>
                    <Form.Control type="text" placeholder="Enter Body" name="@CREATEBLOGBODY" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" style={{ display: "grid" }} >
                    <label className='label'>Category</label>
                    <div id='radiogrp'>
                        <label><input type='radio' name="@CREATEBLOGCATEGORY" value="Movies" checked={state.createblog.category === 'Movies'} onChange={handleChange} />Movies</label>
                        <label><input type='radio' name="@CREATEBLOGCATEGORY" value="Food" checked={state.createblog.category === 'Food'} onChange={handleChange} />Food</label>
                        <label><input type='radio' name="@CREATEBLOGCATEGORY" value="Lifestyle" checked={state.createblog.category === 'Lifestyle'} onChange={handleChange} />Lifestyle</label>
                        <label><input type='radio' name="@CREATEBLOGCATEGORY" value="Travel" checked={state.createblog.category === 'Travel'} onChange={handleChange} />Travel</label>
                        <label><input type='radio' name="@CREATEBLOGCATEGORY" value="Fashion" checked={state.createblog.category === 'Fashion'} onChange={handleChange} />Fashion</label>
                        <label><input type='radio' name="@CREATEBLOGCATEGORY" value="Others" checked={state.createblog.category === 'Others'} onChange={handleChange} />Others</label>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" style={{ display: "grid" }} >
                    <label className='label'>Image</label>
                    <input type='file' name='@CREATEBLOGIMAGE' onChange={(e) => { dispatch({ type: e.target.name, payload: e.target.files[0] }) }} />
                </Form.Group>

                <Button variant="primary mt-3 w-100" onClick={() => handleSubmit(state.createblog)}>
                    Create Blog
                </Button>
            </Form>
        </div>
    );
}