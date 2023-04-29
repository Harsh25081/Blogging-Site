import React from 'react'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';

const Left = styled.div`

`
const Middle = styled.div`
  margin: 0px 0px 0px 50px;

`
const Right = styled.div`

`

function NavScrollExample({ tok, userdt }) {
  let state = useSelector((state) => state)
  let dispatch = useDispatch()

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

  return (
    <Navbar bg="light" expand="lg"  >
      <Container fluid
        style={{ border: " 10px solid transparent",
         borderImage: "url(newborder.webp) 30 stretch",
          marginLeft: "1%", marginRight: "1%" ,
          backgroundColor:"#b3ecff"
          }}>
        <div style={{display:"flex"}}>
        <Left>
          <h4>Blogging Site</h4>
        </Left>

        <Middle>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary">Search</Button>
          </Form>
        </Middle>
        </div>

        <Right>
          {state.login.token ?
            <Button variant="outline-danger" onClick={onLogout}>Logout</Button> :
            <div><Button variant="outline-primary" href='/signup'>SignUp</Button><Button variant="outline-success" href='/login'>Login</Button></div>}
        </Right>

      </Container>
    </Navbar>
  );
}

export default NavScrollExample;