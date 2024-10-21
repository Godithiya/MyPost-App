import JWT from "jsonwebtoken"
const Autetication = async (req, res, next) => {
    const token = req.headers['authorization']

    if(!token) {
        return res.status(500).json({
            default : false,
            message : 'token tidak ada'
        })
    }

    const splitToken = token.split(" ")
    if(splitToken.length !== 2 || splitToken[0] !== "Bearer") {
        return res.status(500).json({
            default: false,
            message : "token invalide bree"
        })
    }

    JWT.verify(splitToken[1], process.env.JWT_SECRET_KEY, (error, decoded) => {
        if(error){
            return res.status(500).json({
                default : false,
                message : 'JWT IS A PROBLEM '
            })
        }

        req.userId = decoded.userId
        next()
    })

}

export default Autetication