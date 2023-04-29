const initial = {
    title : "",
    body : "",
    createdBy : ""
}

export function CreateBlogReducer(createblog = initial,action){
    let {type,payload}=action
    switch(type){
        case "@CREATEBLOGTITLE" : return {...createblog,title:payload}
        case "@CREATEBLOGBODY" : return {...createblog,body:payload}
        case "@CREATEBLOGCREATEDBY" : return {...createblog,createdBy:payload}
        default : return createblog
    }
}