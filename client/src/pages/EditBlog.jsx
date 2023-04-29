import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function EditBlog({ Show, setedt, data }){
  const [show, setShow] = useState(false);
  const [editblogdata,setEditblogdata] = useState({title:data.title,body:data.body,id:data._id})

  const state = useSelector((state)=>state)
  const navigate = useNavigate();
  const handleClose = () => {setShow(false);setedt(false)}
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (Show === true) {
      handleShow()
    }
  }, [Show])

  const handleEdit = (data) => {
    let {id,title,body}=data
    axios.patch(`http://localhost:4000/posts/updatepost/${id}`,{title,body})
      .then((res) => {
        setShow(false);
        setedt(false);
        state.allblogs.forEach((blog)=>{
            if(blog._id === id){
                blog.title =title
                blog.body = body
            }
        })
        console.log(state)
        navigate("/")
      })
      .catch((err) => console.log(err))
  }

  const handleChange = (e)=>{
    let {name,value} = e.target
    setEditblogdata({...editblogdata,[name]:value})
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