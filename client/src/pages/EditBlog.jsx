import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function EditBlog({ Show, setedt, data }){
  const [show, setShow] = useState(false);
  const [editblogdata,setEditblogdata] = useState({title:data.title,body:data.body,id:data._id})
  let prevBlogData = editblogdata

  const state = useSelector((state)=>state)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {setShow(false);setedt(false)}
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (Show === true) {
      handleShow()
    }
  }, [Show])

  const handleEdit = (data) => {
    let {id,title,body}=data
    let passData
    if(prevBlogData.title===title){
      passData = {body:body}
    }else{
      passData = {title:title,body:body}
    }
    console.log(passData)

    axios.patch(`http://localhost:4000/blogs/updateblog/${id}`,passData)
      .then((res) => {
        setShow(false);
        setedt(false);
        state.allblogs.forEach((blog)=>{
            if(blog._id === id){
                blog.title =title
                blog.body = body
            }
        })
        navigate("/")
      })
      .catch((err) => console.log(err))
  }

  const handleChange = (e)=>{
    let {name,value} = e.target
    setEditblogdata({...editblogdata,[name]:value})
  }

  const handleCategoryChange = (e) => {
    let { name, value } = e.target
    dispatch({
        type: name,
        payload: value
    })
}

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name='title'
                type="text"
                placeholder="Title"
                defaultValue={data.title}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Body</Form.Label>
              <Form.Control as="textarea"rows={3}
                name='body'
                defaultValue={data.body}
                onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <div id='radiogrp'>
                        <label><input type='radio' name="@CREATEBLOGCATEGORY" value="Movies" checked={state.createblog.category === 'Movies'} onChange={handleCategoryChange} />Movies</label>
                        <label><input type='radio' name="@CREATEBLOGCATEGORY" value="Food" checked={state.createblog.category === 'Food'} onChange={handleCategoryChange} />Food</label>
                        <label><input type='radio' name="@CREATEBLOGCATEGORY" value="Lifestyle" checked={state.createblog.category === 'Lifestyle'} onChange={handleCategoryChange} />Lifestyle</label>
                        <label><input type='radio' name="@CREATEBLOGCATEGORY" value="Travel" checked={state.createblog.category === 'Travel'} onChange={handleCategoryChange} />Travel</label>
                        <label><input type='radio' name="@CREATEBLOGCATEGORY" value="Fashion" checked={state.createblog.category === 'Fashion'} onChange={handleCategoryChange} />Fashion</label>
                        <label><input type='radio' name="@CREATEBLOGCATEGORY" value="Others" checked={state.createblog.category === 'Others'} onChange={handleCategoryChange} />Others</label>
                    </div>
              {/* <Form.Control
                name='category'
                defaultValue={data.title}
                onChange={handleChange}
                autoFocus
              /> */}
            </Form.Group>



          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleEdit(editblogdata)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}