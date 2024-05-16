// import axios from "axios";
// import React, { useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import { Context } from "../../main";
// import Navbar from "../Layout/Navbar";
// const Application = () => {
 
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [coverLetter, setCoverLetter] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [resume, setResume] = useState(null);

//   const { isAuthorized, user } = useContext(Context);

//   const navigateTo = useNavigate();

//   const FileUpload = () => {
//     const [file, setFile] = useState(null);
  
//     const handleFileChange = (event) => {
//       setFile(event.target.files[0]);
//     };
  
//     const handleFileUpload = async () => {
//       if (!file) {
//         alert('Please select a file');
//         return;
//       }
  
//       const formData = new FormData();
//       formData.append('resume', file);
  
//       try {
//         const response = await axios.post('http://localhost:4000/api/v1/application/saveDocumentToServer', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         console.log(response.data);
//         // Handle success
//       } catch (error) {
//         console.error('Error uploading file:', error);
//         // Handle error
//       }
//     };

//   // const FileUpload = () => {
//   //   const [file, setFile] = useState(null);
//   // }
  
//   //   const handleFileChange = (event) => {
//   //     setFile(event.target.files[0]);
//   //   };
  
//   //   const handleFileUpload = async () => {
//   //     alert("hello")
//   //     const formData = new FormData();
//   //     formData.append('resume', file);
//   //     try {
//   //       const response = await axios.post('http://localhost:4000/api/v1/application/saveDocumentToServer', formData, {
//   //         headers: {
//   //           'Content-Type': 'multipart/form-data',
//   //         },
//   //       });
//   //       console.log(response.data);
//   //       // Handle success
//   //     } catch (error) {
//   //       console.error('Error uploading file:', error);
//   //       // Handle error
//   //     }
//   //   };

//   const { id } = useParams();
//   const handleApplication = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("phone", phone);
//     formData.append("address", address);
//     formData.append("coverLetter", coverLetter);
//     formData.append("resume", resume);
//     formData.append("jobId", id);

//     try {
//       console.log(formData)
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/application/post",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setName("");
//       setEmail("");
//       setCoverLetter("");
//       setPhone("");
//       setAddress("");
//       setResume("");
//       toast.success(data.message);
//       navigateTo("/job/getall");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   if (!isAuthorized || (user && user.role === "Employer")) {
//     navigateTo("/");
//   }

//   return (
//     <div>
//       <Navbar />
   
//     <section className="application">
//       <div className="container">
//         <h3>Application Form</h3>
//         <form onSubmit={handleApplication}>
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Your Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Your Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//           />
//           <textarea
//             placeholder="CoverLetter..."
//             value={coverLetter}
//             onChange={(e) => setCoverLetter(e.target.value)}
//           />
//           <div>
//             <label
//               style={{ textAlign: "start", display: "block", fontSize: "20px" }}
//             >
//               Select Resume
//             </label>
//             <input
//               type="file"
//               accept=".pdf, .jpg, .JPEG .png"
//               onChange={handleFileUpload}
//               style={{ width: "100%" }}
//             />
//           </div>
//           <button type="submit">Send Application</button>
//         </form>
//       </div>
//     </section>
//     </div>
//   );
// };

// export default Application


import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import Navbar from "../Layout/Navbar";


// const FileUpload = ({handleResume}) => {
//   const [file, setFile] = useState(null);
  
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleFileUpload = async () => {
//     if (!file) {
//       alert('Please select a file');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('resume', file);

//     try {
//       const response = await axios.post('http://localhost:4000/api/v1/application/saveDocumentToServer', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data);
//       handleResume(response.data.url)

//       alert('File uploaded successfully');
//       setFile(null); 
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('Failed to upload file');
//     }
//   };

//   return (
//     <div>
//       <label style={{ textAlign: "start", display: "block", fontSize: "20px" }}>
//         Select Resume
//       </label>
//       <input
//         type="file"
//         accept=".pdf"
//         onChange={handleFileChange}
//         style={{ width: "100%" }}
//       />
//       <button onClick={handleFileUpload}>Upload</button>
//     </div>
//   );
// };


const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume,setResume]=useState("")
  const [file, setFile] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { jobId } = useParams();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post('http://localhost:4000/api/v1/application/saveDocumentToServer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setResume(response.data.url)

      
      setFile(null); 
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", jobId);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setFile(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <div>
      <Navbar />
      <section className="application">
        <div className="container">
          <h3>Application Form</h3>
          <form onSubmit={handleApplication}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <textarea
              placeholder="CoverLetter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
            <div>
      <label style={{ textAlign: "start", display: "block", fontSize: "20px" }}>
        Select Resume
      </label>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ width: "100%" }}
      />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
            {/* <FileUpload handleResume={handleResume}/> */}
            <button type="submit">Send Application</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Application;
