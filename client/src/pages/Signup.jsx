import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';

import { useDispatch, useSelector } from 'react-redux'

function Signup() {

    let navigate = useNavigate()

    const state = useSelector((state) => state)

    const dispatch = useDispatch();



    const HandleSubmit = (data) => {
        axios.post("http://localhost:4000/createuser", data)
            .then((res) => { console.log(res.data); navigate("/login") })
            .catch((err) => { alert(err.response.data.message) })
    }

    const handlechange = (e) => {
        let { name, value } = e.target
        dispatch({
            type: name,
            payload: value
        })
    }

    return (
        <MDBContainer fluid>

            <MDBCard className='text-black m-5' style={{ borderRadius: '25px', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.3)" }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="user me-3" size='lg' />
                                <MDBInput label='Your Name' id='form1' type='text' className='w-100' name='@SIGNUPNAME' onChange={handlechange} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="envelope me-3" size='lg' />
                                <MDBInput label='Your Email' id='form2' type='email' name='@SIGNUPEMAIL' onChange={handlechange} />
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg' />
                                <MDBInput label='Password' id='form3' type='password' name='@SIGNUPPASSWORD' onChange={handlechange} />
                            </div>

                            <div className='mb-4'>
                                <label>Already have Account <a href='/login'>Login</a></label>
                            </div>

                            <Button className='mb-4' size='lg' onClick={() => HandleSubmit(state.signup)}>Register</Button>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

export default Signup;