import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function ConfirmDelete({ Show, setpop, id }) {
  const [show, setShow] = useState(false);
  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleClose = () => { setShow(false); setpop(false) }
  const handleShow = () => setShow(true);


  useEffect(() => {
    if (Show === true) {
      handleShow()
    }
  }, [Show])

  const handleDelete = (id) => {
    axios.delete(`https://blogging-site-three.vercel.app/posts/deletepost/${id}`)
      .then((res) => {
        setShow(false);
        setpop(false);
        dispatch({
          type: "ALLPOSTS",
          payload: state.allblogs.filter((blog) => blog._id !== id)
        })
        navigate("/")
      })
      .catch((err) => console.log(err))
  }

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you Sure you want to DELETE it !!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
