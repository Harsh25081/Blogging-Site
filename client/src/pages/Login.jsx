import Button from 'react-bootstrap/Button';
import React from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let state = useSelector((state) => state)

  const handleChange = (e) => {
    let { name, value } = e.target
    dispatch({
      type: name,
      payload: value
    })
  }

  const HandleSubmit = (data) => {
    axios.post("https://updated-blogging-site.vercel.app/login", data)
      .then((res) => { localStorage.setItem("token", res.data.data); localStorage.setItem("userinfo", JSON.stringify(res.data.userData)); navigate("/") })
      .catch((err) => { alert(err.response.data.message) })
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBCard className='text-black m-5' style={{ borderRadius: '20px', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.3)" }}>
        <MDBCardBody>
          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

          <div className='mt-5'>
            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' name='@LOGINEMAIL' onChange={handleChange} />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name='@LOGINPASSWORD' onChange={handleChange} />
          </div>

          <Button className="mb-4 w-100" onClick={() => { HandleSubmit(state.login) }}>Sign in</Button>
          <p className="text-center">Not a member? <a href="/signup">Register</a></p>

        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;