import JWT from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import db from "../../Connector"


const Login = async (req, res) => {
    const { email, password } = req.body
    try {
        const emailLowerCase = email.toLowerCase()
        const dataUser = await db.user.findUnique({
            where : {
                email : emailLowerCase
            }
        })

        if(!dataUser) {
            res.status(200).json({message : " data user invalid"})
        }

        const passwordBycrptjs = await bcryptjs.compare(password, dataUser.password)
        
        const token = JWT.sign({userId : dataUser.id }, process.env.JWT_SECRET_KEY, {
            expiresIn : "3d"
        })

        res.json(token)

    } catch (error) {
        console.log(error)
    } 
}   

export default Login