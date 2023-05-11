import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ConfirmDelete } from './ConfirmDelete'
import { EditBlog } from './EditBlog'
import "./ShowCompleteBlog.css"

export default function ShowCompleteBlog() {
    let location = useLocation()
    let blogDetails = location.state
    let { _id, title, body, createdBy, category, image, createdAt, updatedAt, edit } = blogDetails

    const [popup, setPopup] = useState(false)
    const [edt, setEdt] = useState(false)

    const DeleteBlog = () => {
        setPopup(true)
    }

    const Editblog = () => {
        setEdt(true)
    }

    console.log(blogDetails)

    return (
        <div className='showBlogOuter'>
            <img src={`${image}`} alt='profile' />
            <div className='showBlogDetails'>
                <h1>{title}</h1>
                <p style={{ fontFamily: "cursive", fontSize: "14px", marginTop: "20px" }}>⭐{body}</p>
                <div style={{ display: "flex", marginTop: "20px", overflow: "auto" }}>
                    <div style={{ display: "grid" }}>
                        <label>Category </label>
                        <label>Author </label>
                        <label>Published On </label>
                        <label>Updated On </label>
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                        <p>: {category}</p>
                        <p>: {createdBy.name}</p>
                        <p>: {(createdAt.slice(0, 16)).split("T").join("   At   ")}</p>
                        <p>: {(updatedAt.slice(0, 16)).split("T").join("   At   ")}</p>
                    </div>
                </div>
                {edit === true && <div style={{ float: "right", margin: "2%" }}>
                    <Button variant="warning" style={{ marginRight: "5px" }} onClick={Editblog}>Edit</Button>
                    <Button variant="danger" onClick={DeleteBlog}>Delete</Button>
                </div>}
                {popup && <ConfirmDelete Show={true} setpop={setPopup} id={_id} />}
                {edt && <EditBlog Show={true} setedt={setEdt} data={blogDetails} />}
            </div>
        </div>
    )
}
