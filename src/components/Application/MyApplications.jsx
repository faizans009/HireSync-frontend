// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../../main";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import ResumeModal from "./ResumeModal";
// import { sendMessageRoute } from "../../chat/utils/APIRoutes";
// import Navbar from "../Layout/Navbar";
// import '../../App.css'; 
// import { FaFileAlt, FaTrashAlt } from "react-icons/fa";

// const MyApplications = () => {
//   const { user } = useContext(Context);
//   const [applications, setApplications] = useState([]);
//   // const [modalOpen, setModalOpen] = useState(false);
//   // const [resumeImageUrl, setResumeImageUrl] = useState("");
//   const { isAuthorized } = useContext(Context);
//   const navigateTo = useNavigate();

//   useEffect(() => {
//     try {
//       if (user && user.role === "Employer") {
//         axios
//           .get("http://localhost:4000/api/v1/application/employer/getall", {
//             withCredentials: true,
//           })
//           .then((res) => {
//             setApplications(res.data.applications);
//           });
//       } else {
//         axios
//           .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
//             withCredentials: true,
//           })
//           .then((res) => {
//             setApplications(res.data.applications);
//           });
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }, [isAuthorized]);

//   if (!isAuthorized) {
//     navigateTo("/");
//   }

  
//   const deleteApplication = (id) => {
//     try {
//       axios
//         .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
//           withCredentials: true,
//         })
//         .then((res) => {
//           toast.success(res.data.message);
//           setApplications((prevApplication) =>
//             prevApplication.filter((application) => application._id !== id)
//           );
//         });
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
//   const GetTest = (id,applicationId) => {
//     try {
//       axios
//         .get(`http://localhost:4000/api/v1/test/getTest/${id}`, {
         
//         })
//         .then((res) => {
//           localStorage.setItem("jobId",id)
//           localStorage.setItem("application",applicationId)
//           toast.success(res.data.message);
//           navigateTo('/getTest')
//         });
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const messageApplication = async (sender, receiver, status,id) => {
//     try {
//       if (!status) {
//         await axios.post(sendMessageRoute, {
//           from: sender,
//           to: receiver,
//           message: "We ar reviewing your application",
//         });
//         await axios.post(
//           `http://localhost:4000/api/v1/application/updateMessageStatus`,
//           {
//             id:id
//           }
//         )
//         toast.success("Message sent successfully");
//       }
//       navigateTo("/chat");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   // const openModal = (imageUrl) => {
//   //   setResumeImageUrl(imageUrl);
//   //   setModalOpen(true);
//   // };

//   // const closeModal = () => {
//   //   setModalOpen(false);
//   // };

//   return (
//     <>
//     <Navbar />
    
//     <section className="my_applications page">
//       {user && user.role === "Job Seeker" ? (
//         <div className="container">
//           <h1>My Applications</h1>
//           {applications.length <= 0 ? (
//             <>
//               {" "}
//               <h4>No Applications Found</h4>{" "}
//             </>
//           ) : (
//             applications.map((element) => {
//               return (
//                 <JobSeekerCard
//                   element={element}
//                   key={element._id}
//                   deleteApplication={deleteApplication}
//                   // openModal={openModal}
//                   GetTest={GetTest}
//                   jobId={element.jobId}
//                 />
//               );
//             })
//           )}
//         </div>
//       ) : (
//         <div className="container">
//           <h1>Applications From Job Seekers</h1>
//           {applications.length <= 0 ? (
//             <>
//               <h4>No Applications Found</h4>
//             </>
//           ) : (
//             applications.map((element) => {
//               return (
//                 <EmployerCard
//                   element={element}
//                   key={element._id}
//                   // openModal={openModal}
//                   messageApplication={messageApplication}
//                 />
//               );
//             })
//           )}
//         </div>
//       )}
//       {/* {modalOpen && (
//         <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
//       )} */}
//     </section>
//     </>
//   );
// };

// export default MyApplications;

// const JobSeekerCard = ({ element, deleteApplication, 
//   // openModal,
//   GetTest }) => {
//   return (
//     <>
//      {/* <Navbar /> */}
//       <div className="job_seeker_card">
//         <div className="detail">
//           <p>
//             <span>Name:</span> {element.name}
//           </p>
//           <p>
//             <span>Email:</span> {element.email}
//           </p>
//           <p>
//             <span>Phone:</span> {element.phone}
//           </p>
//           <p>
//             <span>Address:</span> {element.address}
//           </p>
//           <p>
//             <span>CoverLetter:</span> {element.coverLetter}
//           </p>
//           {element.resume && (
//               <div className="download-button-container">
//                 <a
//                   href={`http://localhost:4000/uploads/${element.resume}`}
//                   download
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="download-button"
//                 >
//                   Download Resume
//                 </a>
             
//         </div> )}
//         </div>
//         {/* <div className="resume">
//           <img
//             src={element.resume.url}
//             alt="resume"
//             onClick={() => openModal(element.resume.url)}
//           />
//         </div> */}
//          <div className="btn_area">
//         <button onClick={() => GetTest(element.jobId, element._id)}>
//           <FaFileAlt /> Test
//         </button>
//       </div>
//       <div className="btn_area">
//         <button onClick={() => deleteApplication(element._id)}>
//           <FaTrashAlt /> Delete Application
//         </button>
//       </div>
//         {/* <div className="btn_area">
          
//         <button onClick={() => GetTest(element.jobId,element._id)}>
//             Test
//           </button>
//         </div>
//         <div className="btn_area">
          
//           <button onClick={() => deleteApplication(element._id)}>
//             Delete Application
//           </button>
//         </div> */}
//       </div>
//     </>
//   );
// };

// const EmployerCard = ({ element, openModal, messageApplication }) => {
//   return (
//     <>
//      {/* <Navbar /> */}
//       <div className="job_seeker_card">
//         <div className="detail">
//           <p>
//             <span>Name:</span> {element.name}
//           </p>
//           <p>
//             <span>Email:</span> {element.email}
//           </p>
//           <p>
//             <span>Phone:</span> {element.phone}
//           </p>
//           <p>
//             <span>Address:</span> {element.address}
//           </p>
//           <p>
//             <span>CoverLetter:</span> {element.coverLetter}
//           </p>
//           {element.resume && (
//               <div className="download-button-container">
//                 <a
//                   href={`http://localhost:4000/uploads/${element.resume}`}
//                   download
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="download-button"
//                 >
//                   Download Resume
//                 </a>
             
//         </div> 
//       )}
//         </div>
//         <div className="btn_area">
//           <button onClick={() => messageApplication(element.employerID.user, element.applicantID.user, element.messageSent,element._id)}>
//             Message
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };



import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import { sendMessageRoute } from "../../chat/utils/APIRoutes";
import { FaTrashAlt, FaFileAlt } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import '../../App.css'; 

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const GetTest = (id, applicationId) => {
    try {
      axios
        .get(`http://localhost:4000/api/v1/test/getTest/${id}`, {})
        .then((res) => {
          localStorage.setItem("jobId", id);
          localStorage.setItem("application", applicationId);
          toast.success(res.data.message);
          navigateTo("/getTest");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const messageApplication = async (sender, receiver, status, id) => {
    try {
      if (!status) {
        await axios.post(sendMessageRoute, {
          from: sender,
          to: receiver,
          message: "We are reviewing your application",
        });
        await axios.post(
          `http://localhost:4000/api/v1/application/updateMessageStatus`,
          {
            id: id,
          }
        );
        toast.success("Message sent successfully");
      }
      navigateTo("/chat");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className="my_applications page">
        {user && user.role === "Job Seeker" ? (
          <div className="container">
            <h1>My Applications</h1>
            {applications.length <= 0 ? (
              <h4>No Applications Found</h4>
            ) : (
              applications.map((element) => (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  GetTest={GetTest}
                />
              ))
            )}
          </div>
        ) : (
          <div className="container">
            <h1>Applications From Job Seekers</h1>
            {applications.length <= 0 ? (
              <h4>No Applications Found</h4>
            ) : (
              applications.map((element) => (
                <EmployerCard
                  element={element}
                  key={element._id}
                  messageApplication={messageApplication}
                />
              ))
            )}
          </div>
        )}
      </section>
    </>
  );
};

const JobSeekerCard = ({ element, deleteApplication, GetTest }) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span>{" "}
          {expanded ? element.coverLetter : element.coverLetter.slice(0, 100)}
          {element.coverLetter.length > 100 && !expanded && (
            <button onClick={toggleExpanded} className="read-more-button">
              Read More
            </button>
          )}
        </p>
        {element.resume && (
          <div className="download-button-container">
            <a
              href={`http://localhost:4000/uploads/${element.resume}`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="download-button"
            >
              <FaFileAlt /> Download Resume
            </a>
          </div>
        )}
      </div>
      <div className="btn_area">
        <button onClick={() => GetTest(element.jobId, element._id)} className="test-button">
          <FaFileAlt /> Test
        </button>
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)} className="delete-button">
          <FaTrashAlt /> Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, messageApplication }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
        {element.resume && (
          <div className="download-button-container">
            <a
              href={`http://localhost:4000/uploads/${element.resume}`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="download-button"
            >
              <FaFileAlt /> Download Resume
            </a>
          </div>
        )}
      </div>
      <div className="btn_area">
        <button
          onClick={() =>
            messageApplication(
              element.employerID.user,
              element.applicantID.user,
              element.messageSent,
              element._id
            )
          }
          className="message-button"
        >
          <AiOutlineMessage /> Message
        </button>
      </div>
    </div>
  );
};

export default MyApplications;
