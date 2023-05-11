const initial = {
    title: "",
    body: "",
    createdBy: "",
    category: "Others",
    files: null
}

export function CreateBlogReducer(createblog = initial, action) {
    let { type, payload } = action
    switch (type) {
        case "@CREATEBLOGTITLE": return { ...createblog, title: payload }
        case "@CREATEBLOGBODY": return { ...createblog, body: payload }
        case "@CREATEBLOGCREATEDBY": return { ...createblog, createdBy: payload }
        case "@CREATEBLOGCATEGORY": return { ...createblog, category: payload }
        case "@CREATEBLOGIMAGE": return { ...createblog, files: payload }
        default: return createblog
    }
}