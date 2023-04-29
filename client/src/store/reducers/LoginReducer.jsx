let initial = {
    email : "",
    password : "",
    token : null
}

export function loginReducer(userlogin=initial,action){
    let {type,payload}=action
    switch(type){
        case "@LOGINEMAIL" : return {...userlogin,email:payload}
        case "@LOGINPASSWORD" : return {...userlogin,password:payload}
        case "@LOGINTOKEN" : return {...userlogin,token:payload}
        default : return userlogin
    }
}