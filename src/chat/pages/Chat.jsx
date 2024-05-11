import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import { Context } from "../../main";
import { useWebSocket } from "../../websocketprovider";
import Navbar from "../../components/Layout/Navbar";
export default function Chat() {
  const { User } = useContext(Context);
  // console.log(JSON.parse(User));
  // localStorage.setItem("user", JSON.stringify(User));
  const navigate = useNavigate();
  // const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const func = async () => {
      if (!localStorage.getItem("user")) {
        console.log("user logged in");
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user")));
      }
    };
    func();
  }, []);

  const { socket } = useWebSocket();
  const { addUser } = useWebSocket();
  useEffect(() => {
    console.log("use effect runs ");
    if (socket) {
      // const userData = JSON.parse(localStorage.getItem("user"));
      console.log(socket);
      socket.on("connect", () => {
        console.log("Connected to server");
        console.log(socket);
        // const userData = JSON.parse(localStorage.getItem("user"));
        addUser(currentUser._id);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
  }, [socket]);
  ////////////////////////////////
  // useEffect(() => {
  //   if (currentUser) {
  //     console.log("current user", currentUser);
  //     socket.current = io(host);
  //     socket.current.emit("add-user", currentUser._id);
  //   }
  // }, [currentUser]);

  useEffect(() => {
    const func = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          console.log(data.data);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    func();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
     <Navbar />
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
    height: 100vh; 
    width: 100vw; 
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    background-color: #ffffff;

    .container {
      margin-top: -7rem;
      height: 86vh; 
      width: 100vw; 
      background-color: #edeef1;
      display: grid;
      grid-template-columns: 25% 75%;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-columns: 35% 65%;
      }
    }
  `;