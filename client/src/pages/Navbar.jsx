import React, { useState } from 'react'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import "./Navbar.css"

// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import { popover } from './Profile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Left = styled.div`

`
const Middle = styled.div`
  margin: 0px 0px 0px 50px;
`
const Right = styled.div`
  display:flex ;
  justify-content: flex-end ;
`

function NavScrollExample({ tok, userdt }) {

  let [search , SetSearch] = useState("")

  let state = useSelector((state) => state)
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userinfo")
    dispatch({
      type: "@LOGINTOKEN",
      payload: null
    })
    tok(null)
    userdt(null)
  }

  const filterBlogs = (filter) => {
    axios.get(`https://updated-blogging-site.vercel.app/blogs/getblogbyfilter?category=${filter}`)
      .then((res) => { dispatch({ type: "ALLPOSTS", payload: res.data.data });console.log(window.location.href) })
      .catch((err) => { alert(err.response.data.message) })
  }

  const HandleSearch = (search) =>{
      let filteredBlogs = state.allblogs.filter((blog)=>
        blog.category.toLowerCase().includes(search.toLowerCase())       ||
        blog.title.toLowerCase().includes(search.toLowerCase())          || 
        blog.createdBy.name.toLowerCase().includes(search.toLowerCase())
      )
      dispatch({
        type : "ALLPOSTS",
        payload : filteredBlogs
      })
  }

  return (
    <Navbar bg="light" expand="lg"  >
      <Container fluid className='navContainer'>
        <div style={{ display: "flex" }}>
          <Left>
            <h4 className='NavSize' onClick={() => navigate("/")}>Blogging Site</h4>
          </Left>

          <Middle>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>SetSearch(e.target.value)}
              />
              <Button style={{ fontSize: "1rem" }} onClick={()=>HandleSearch(search)} variant="outline-secondary">Search</Button>
            </Form>
          </Middle>
        </div>


        <Right>
          {window.location.href === "http://localhost:3000/" && <div className='filters'>
            <p onClick={() => filterBlogs("Food")}>Food</p>
            <p onClick={() => filterBlogs("Travel")}>Travel</p>
            <p onClick={() => filterBlogs("Movies")}>Movies</p>
            <p onClick={() => filterBlogs("Lifestyle")}>Lifestyle</p>
            <p onClick={() => filterBlogs("Fashion")}>Fashion</p>
            <p onClick={() => filterBlogs("Others")}>Others</p>
          </div>}
          {state.login.token ?
            <Button id='logoutbtn' variant="outline-danger" onClick={onLogout}>Logout</Button> :
            //   <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            //   {/* <Button variant="success">Click me to see</Button> */}
            //   <img alt='profile' className='rounded-circle' style={{width:"45px"}} src='peakpx.jpg' id='profileimage' />
            // </OverlayTrigger>

            //    :
            <div>
              <ButtonGroup aria-label="Basic example">
                <Button variant="outline-primary" href='/signup'>SignUp</Button>
                <Button variant="outline-success" href='/login'>Login</Button>
              </ButtonGroup>
            </div>}
        </Right>

      </Container>
    </Navbar>
  );
}

export default NavScrollExample;