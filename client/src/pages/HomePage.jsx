import React, { useEffect, useState } from 'react'
// import Navbar from "./Navbar";
import NavScrollExample from './Navbar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'
import { TrashFill, PencilSquare } from 'react-bootstrap-icons'
import { ConfirmDelete } from './ConfirmDelete';
import { EditBlog } from './EditBlog';

export default function HomePage() {
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    let [token, setToken] = useState(null)
    const navigate = useNavigate()
    let [userDtl, setUserDtl] = useState({})
    const [popup, setPopup] = useState(false)
    const [edit, setEdit] = useState(false)


    useEffect(() => {
        setToken(localStorage.getItem("token"))
        dispatch({
            type: "@LOGINTOKEN",
            payload: localStorage.getItem("token")
        })
        setUserDtl(JSON.parse(localStorage.getItem("userinfo")))
        axios.get("http://localhost:4000/posts/getallposts")
            .then((res) => { dispatch({ type: "ALLPOSTS", payload: res.data.data }) })
            .catch((err) => { alert(err.response.data) })
    }, [dispatch])


    const handleClick = () => {
        navigate("/createblog")
    }

    const showCompleteBlog = (blog) => {
        navigate("/showcompleteblog", {
            state: blog
        })
    }

    const editblog = () => {
        setEdit(true)
    }

    const DeleteBlog = () => {
        setPopup(true)
    }



    return (
        <div>
            <NavScrollExample tok={setToken} userdt={setUserDtl} />
            <div id='outer' style={{border: " 10px solid transparent",
         borderImage: "url(newborder.webp) 30 stretch"}}>
                {/* <div id="createbtn">
                    {token && <Button variant="success" onClick={handleClick}>Create Blog</Button>}
                </div> */}
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    {token && <div className='everyblog' id='addbtn' onClick={handleClick}>
                            +
                    </div>}
                    {state.allblogs.map((blog, index) => {
                        const { title, body, createdBy, _id } = blog
                        return (
                            <div className='everyblog' key={index} >
                                <div >
                                    {/* <label style={{ fontWeight: "bold", marginRight: "2%" }}>Title :</label> */}
                                    <p style={{ fontWeight: "bold" , fontSize:"25px"}}>{title}</p>
                                </div>
                                {/* <h5>Body :</h5> */}
                                <p style={{ paddingLeft: "10%"  }} onClick={() => { showCompleteBlog(blog) }}>{body.length > 30 ? body.substring(0, 30) + '...' : body}</p>
                                {createdBy.name === userDtl?.name ? blog.edit = true : blog.edit = false}
                                {createdBy.name === userDtl?.name && <div style={{ left: "80%", position: "absolute", bottom: 0, margin: "1%" }}>
                                    <PencilSquare id='edit' onClick={editblog} style={{color:"yellow"}}/>
                                    <TrashFill id='delete' onClick={DeleteBlog} style={{color:"red"}}/>
                                    {popup && <ConfirmDelete Show={true} setpop={setPopup} id={_id} />}
                                    {edit && <EditBlog Show={true} setedt={setEdit} data={blog} />}
                                </div>}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* <div style={{display:"flex",flexWrap:"wrap"}}>
                {posts.map((post, index) => {
                    return (
                        <div key={index} style={{ border: "2px solid black", margin: "5px",width:"32%" }}>
                            <h4>Title :</h4>
                            <p>{post.title}</p>
                            <h5>Body :</h5>
                            <p>{post.body}</p>
                            <h5>Created By :</h5>
                            <p>{post.createdBy.name}</p>
                        </div>
                    )
                })}
            </div> */}
        </div>
    )
}
