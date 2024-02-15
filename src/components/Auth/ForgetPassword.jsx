import { MdOutlineMailOutline } from "react-icons/md"
import { Link } from "react-router-dom"


const forgetPassword = () => {
    return (
        <>
            <section className="authPage">
                <div className="container">
                    <div className="header">
                        <img src="/JobZeelogo.png" alt="logo" />
                        <h3>Forget your account?</h3>
                    </div>
                    <form>
                        <div className="inputTag">
                            <label>Email Address</label>
                            <div>
                                <input
                                    type="email"
                                    placeholder="zk@gmail.com"
                                //   value={email}
                                //   onChange={(e) => setEmail(e.target.value)}
                                />
                                <MdOutlineMailOutline />
                            </div>
                        </div>
                        <Link to={"/OtpVerify"}>Continue</Link>
                        {/* <button type="submit"
                        //  onClick={handleLogin}
                        >
              Continue
            </button> */}
                    </form>
                </div>
                <div className="banner">
                    <img src="/login.png" alt="login" />
                </div>
            </section>

        </>
    )
}

export default forgetPassword
