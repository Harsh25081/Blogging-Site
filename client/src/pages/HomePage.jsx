import React, { useEffect, useState } from 'react'
// import Navbar from "./Navbar";
// import NavScrollExample from './Navbar';
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
    const [blogDetail,setBlogDetail] = useState({})
    const [id,setId] = useState("")

    useEffect(() => {
        setToken(localStorage.getItem("token"))
        dispatch({
            type: "@LOGINTOKEN",
            payload: localStorage.getItem("token")
        })
        setUserDtl(JSON.parse(localStorage.getItem("userinfo")))
        axios.get("https://updated-blogging-site.vercel.app/blogs/getallblogs")
            .then((res) => { dispatch({ type: "ALLPOSTS", payload: res.data.data }) })
            .catch((err) => alert(err.response.data.message))
    }, [dispatch])

    const handleClick = () => {
        navigate("/createblog")
    }

    const showCompleteBlog = (blog) => {
        navigate("/showcompleteblog", {
            state: blog
        })
    }

    const editblog = (blog) => {
        setEdit(true)
        setBlogDetail(blog)
    }

    const DeleteBlog = (id) => {
        setPopup(true)
        setId(id);
    }

    return (
        <div>
            {/* <NavScrollExample tok={setToken} userdt={setUserDtl} /> */}
            <div id='outer'>
                {token && <div className='everyblog' id='addbtn' onClick={handleClick}>
                    +
                </div>}
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    {state.allblogs.map((blog, index) => {
                        const { title, body, createdBy, image, category, _id } = blog
                        return (
                            // <div className={`${index%2===0 ? "everyblog" : "everyblogrev"}`} key={index}>
                            <div className="everyblog" key={index}>
                                <div>
                                    <img alt='index' src={`${image}`}></img>
                                </div>

                                <div className='everyblogtext' >
                                    <div onClick={() => { showCompleteBlog(blog) }} >
                                        <p style={{ fontWeight: "bold", fontSize: "25px" }}>{title}</p>
                                        <p style={{ paddingLeft: "auto" }} >{body?.length > 90 ? body?.substring(0, 90) + '...' : body}</p>
                                        <p style={{ color: "#ff0066" }}>Category - {category}</p>
                                        <p style={{ color: "#c61aff" }}>By - {createdBy?.name}</p>
                                    </div>
                                    {createdBy.name === userDtl?.name ? blog.edit = true : blog.edit = false}
                                    {createdBy.name === userDtl?.name && <div style={{ left: "80%", position: "absolute", bottom: 0, margin: "1%" }}>
                                        <PencilSquare id='edit' onClick={()=>editblog(blog)} />
                                        <TrashFill id='delete' onClick={()=>DeleteBlog(_id)} />
                                        {popup && <ConfirmDelete Show={true} setpop={setPopup} id={id} />}
                                        {edit && <EditBlog Show={true} setedt={setEdit} data={blogDetail} />}
                                    </div>}
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
