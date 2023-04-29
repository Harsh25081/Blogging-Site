let initial = []

export function AllBlogsReducer(AllPosts = initial , action){
    let {type,payload} = action
    if(type==="ALLPOSTS")return [...payload]
    else return AllPosts
}