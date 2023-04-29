import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ConfirmDelete } from './ConfirmDelete'
import { EditBlog } from './EditBlog'

export default function ShowCompleteBlog() {
    let location = useLocation()
    let blogDetails = location.state
    let { _id, title, body, createdBy, createdAt, updatedAt, edit } = blogDetails

    const [popup, setPopup] = useState(false)
    const [edt, setEdt] = useState(false)

    const DeleteBlog = () => {
        setPopup(true)
    }

    const Editblog = () => {
        setEdt(true)
    }


    return (
        <div style={{ display: "flex", justifyContent: "center", color: "white", margin: "auto" }}>
            {/* {JSON.stringify(blogDetails)} */}
            <div style={{
                border: "2px solid white",
                width: "50%", height: "400px",
                margin: "200px", borderRadius: "15px",
                padding: "10px",
                background: "url(https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai%20in%202022%20and%20a%20half%20decade%20in%20review/thumb-ai-survey-2022.jpg?mw=677&car=42:25)",
                backgroundSize: "cover"
            }}>
                <div style={{ display: "flex" }}><label>Title :</label><p>{title}</p></div>
                <div style={{ display: "flex" }}><label>Body :</label><p>{body}</p></div>
                <div style={{ display: "flex" }}><label>Author :</label><p>{createdBy.name}</p></div>
                <div style={{ display: "flex" }}><label>Published On :</label><p>{(createdAt.slice(0, 16)).split("T").join("   At   ")}</p></div>
                <div style={{ display: "flex" }}><label>Last Updated :</label><p>{(updatedAt.slice(0, 16)).split("T").join("   At   ")}</p></div>
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
