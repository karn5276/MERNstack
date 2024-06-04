import loginImg from "../assets/images/signupImg.jpeg";
import Template from "../components/core/auth/Template"


function Login() {
    return (
        <>
            <Template
                title="Welcome Back"
                description1="Build skills for today, tomorrow, and beyond."
                description2="Where passion meets performance."
                image={loginImg}
                formType="login"
            />
        </>
    )
}

export default Login