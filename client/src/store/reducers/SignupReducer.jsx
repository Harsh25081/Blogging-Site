const initial = {
    name: "",
    email: "",
    password: ""
}

export function signupReducer(usersignup = initial, action) {

    const { type, payload } = action

    switch (type) {
        case "@SIGNUPNAME": return { ...usersignup, name: payload }
        case "@SIGNUPEMAIL": return { ...usersignup, email: payload }
        case "@SIGNUPPASSWORD": return { ...usersignup, password: payload }
        default: return usersignup
    }

}