import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const func = async () => {
      const data = await JSON.parse(localStorage.getItem("user"));
      setCurrentUserName(data.name);
      setCurrentUserImage(data.avatarImage);
    };
    func();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <h5>Contacts</h5>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="username">
                  <h4>{contact.name}</h4>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="username">
              <h6>{currentUserName}</h6>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #272727;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    h5 {
      margin:1rem 0;
      color: white;
    }
  }
  .contacts {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 1.5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .username {
        h4 {
          color: white;
          font-size: 1.5rem;
        }
      }
    }
    .selected {
      background-color: #5a3cec;
    }
  }
  .current-user {
    background-color: #000000;
    display: flex;
    padding:1rem 0;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .username {
      h6 {
        color: white;
      }
    }
  }
`;
