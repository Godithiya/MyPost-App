import bcryptjs from "bcryptjs";
import db from "../../Connector.js";

const Register = async (req, res) => {
    console.info(req.body)
    const { name, email, password } = req.body;
    try {
        const emailLowerCase = email.toLowerCase();
        const passwordHash = await bcryptjs.hash(password, 10);

        const response = await db.user.create({
            data: {
                name,
                email: emailLowerCase,
                password: passwordHash
            }
        });
        
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export default Register;
