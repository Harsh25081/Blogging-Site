import axios from 'axios';
import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateBlog() {
    let dispatch = useDispatch();
    const navigate = useNavigate();
    let state = useSelector((state)=>state);

    const handleChange = (e)=>{
        let {name,value}=e.target
        dispatch({
            type:name,
            payload:value
        })
    }

    useEffect(()=>{
        dispatch({
            type:"@CREATEBLOGCREATEDBY",
            payload:JSON.parse(localStorage.getItem("userinfo"))._id
        })
    },[dispatch])

    const handleSubmit = (data)=>{
        axios.post("https://blogging-site-three.vercel.app/posts/createpost",data)
        .then((res)=>{navigate("/");console.log(res)})
        .catch((err)=>alert(err.response.data.message))
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Form style={{ borderRadius:"10px", width: "30%", padding: "5%",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.3)",marginTop:"5%" }}>
                <Form.Group className="mb-3" >
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" name="@CREATEBLOGTITLE" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Body</Form.Label>
                    <Form.Control type="text" placeholder="Body" name="@CREATEBLOGBODY" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary mt-4 w-100" onClick={()=>handleSubmit(state.createblog)}>
                    Create Blog
                </Button>
            </Form>
        </div>
    );
}
