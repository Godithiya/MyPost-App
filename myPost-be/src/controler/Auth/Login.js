import JWT from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import db from "../../Connector";

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Convert email to lowercase
        const emailLowerCase = email.toLowerCase();

        // Find the user by email
        const dataUser = await db.user.findUnique({
            where: {
                email: emailLowerCase,
            },
        });

        // If user is not found, return an error response
        if (!dataUser) {
            return res.status(400).json({ message: "User not found. Please register first." });
        }

        // Compare the entered password with the stored password
        const passwordMatch = await bcryptjs.compare(password, dataUser.password);

        // If password does not match, return an error response
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password." });
        }

        // Generate a JWT token if authentication is successful
        const token = JWT.sign(
            { userId: dataUser.id }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: "3d" }
        );

        // Return the generated token in the response
        return res.json({ token });

    } catch (error) {
        console.error(error);
        // Return a generic error message for unexpected server errors
        return res.status(500).json({ message: "An error occurred during login. Please try again later." });
    }
};

export default Login;
