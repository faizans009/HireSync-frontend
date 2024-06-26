import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Video from "./video";
import { useWebSocket } from "../../websocketprovider";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import Notify from "./notification";
import App from "./notification";
import Navbar from "../../components/Layout/Navbar";
export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const receive = async () => {
      const data = await JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    receive();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      // App.displaymsg();
      if (currentChat) {
        await JSON.parse(localStorage.getItem("user"))._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(localStorage.getItem("user"));
    socket.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket) {
      socket.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    
   
    <Container>
      <div className="chat-header">
        <div className="user-details">
          {/* <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div> */}
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        {/* <App></App> */}
        {/* <Notify></Notify> */}
        <Video socket={socket} currentChat={currentChat} />
        {/* <Logout /> */}
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 80% 10%;
//   gap: 0.1rem;
//   overflow: hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-rows: 15% 70% 15%;
//   }
//   .chat-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 1rem 2rem;
//     .user-details {
//       display: flex;
//       align-items: center;
//       gap: .5rem;
//       .avatar {
//         img {
//           height: 3rem;
//         }
//       }
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//   }
//   .chat-messages {
//     padding: 1rem 3rem;
//     display: flex;
//     flex-direction: column;
    
//     gap: .1rem;
//     overflow: auto;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .message {
//       display: flex;
//       // height:5rem;
//       align-items: center;
//       .content {
//         max-width: 40%;
//         overflow-wrap: break-word;
//         padding: 1rem .5rem;
//         font-size: 1.rem;
//         border-radius: .5rem;
//         color: #ffffff;
//         @media screen and (min-width: 720px) and (max-width: 1080px) {
//           max-width: 70%;
//         }
//       }
//     }
//     .sended {
//       justify-content: flex-end;
//       .content {
//         background-color: #510dce;
//       }
//     }
//     .recieved {
//       justify-content: flex-start;
//       .content {
//         background-color: #9b52fe;
//       }
//     }
//   }
// `;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: .5rem;
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    flex-grow: 1;
    padding: 1rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: .7rem .5rem;
        font-size: 1.5rem;
        border-radius: 1rem;
        color: #ffffff;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #510dce;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9b52fe;
      }
    }
  }
`;




// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   overflow: hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-rows: 15% 70% 15%;
//   }
//   .chat-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 1rem 2rem;
//     .user-details {
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//       .username {
//         h3 {
//           color: white;
//         }
//       }
//     }
//   }
//   .chat-messages {
//     flex-grow: 1;
//     padding: 1rem 2rem;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     overflow-y: auto; /* Enable vertical scrolling */
//     max-height: calc(100vh - 20% - 10%); /* Adjust according to header and footer */
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .message {
//       display: flex;
//       align-items: center;
//       .content {
//         max-width: 40%;
//         overflow-wrap: break-word;
//         padding: 0.7rem 1rem;
//         font-size: 1.5rem;
//         border-radius: 1rem;
//         color: #ffffff;
//         @media screen and (min-width: 720px) and (max-width: 1080px) {
//           max-width: 70%;
//         }
//       }
//     }
//     .sended {
//       justify-content: flex-end;
//       .content {
//         background-color: #510dce;
//       }
//     }
//     .recieved {
//       justify-content: flex-start;
//       .content {
//         background-color: #9b52fe;
//       }
//     }
//   }
// `;