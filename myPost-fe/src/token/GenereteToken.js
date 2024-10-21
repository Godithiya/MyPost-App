function genereteToken() {
    const token = sessionStorage.getItem('token')
    return token
}
export default genereteToken