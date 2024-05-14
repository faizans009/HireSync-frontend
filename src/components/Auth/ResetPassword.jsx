// import { useState } from "react";
// import { RiLock2Fill } from "react-icons/ri";
// // import { Link } from "react-router-dom";

// const ResetPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!password || !confirmPassword) {
//       setErrors({ emptyFields: "Both fields are required" });
//     } else if (password !== confirmPassword) {
//       setErrors({ passwordMatch: "Passwords do not match" });
//     } else {
//       // Proceed with password reset logic
//     }
//   };

//   return (
//     <>
//       <section className="authPage">
//         <div className="container">
//           <div className="header">
//             <h2>HireSync</h2>
//             <h3>Reset your password</h3>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="inputTag">
//               <label>New Password</label>
//               <div>
//                 <input
//                   type="password"
//                   placeholder="Your Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <RiLock2Fill />
//               </div>
//             </div>
//             <div className="inputTag">
//               <label>Confirm Password</label>
//               <div>
//                 <input
//                   type="password"
//                   placeholder="Confirm Password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//                 <RiLock2Fill />
//               </div>
//               {errors.emptyFields && <p className="error">{errors.emptyFields}</p>}
//               {errors.passwordMatch && <p className="error">{errors.passwordMatch}</p>}
//             </div>

//             <button type="submit">Reset Password</button>

//             {/* <Link to={"/"}>Continue</Link> */}
//           </form>
//         </div>
//         <div className="banner">
//           <img src="/reset password.jpg" alt="login" />
//         </div>
//       </section>
//     </>
//   );
// };

// export default ResetPassword;
import { useState } from "react";
import { RiLock2Fill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setErrors({ emptyFields: "Both fields are required" });
    } else if (password !== confirmPassword) {
      setErrors({ passwordMatch: "Passwords do not match" });
    } else {
    try {
        await axios.post(
            `http://localhost:4000/api/v1/user/password/reset/${token}`,
            { password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // Redirect to home page after successful password reset
        navigate("/"); // Use navigate instead of history.push
    } catch (error) {
        setErrors({ submit: error.response.data.message });
    }
  }
}

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <h2>HireSync</h2>
            <h3>Reset your password</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputTag">
              <label>New Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <div className="inputTag">
              <label>Confirm Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
              {errors.emptyFields && <p className="error">{errors.emptyFields}</p>}
              {errors.passwordMatch && <p className="error">{errors.passwordMatch}</p>}
              {errors.submit && <p className="error">{errors.submit}</p>}
            </div>

            <button type="submit">Reset Password</button>
          </form>
        </div>
        <div className="banner">
          <img src="/reset password.jpg" alt="login" />
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
