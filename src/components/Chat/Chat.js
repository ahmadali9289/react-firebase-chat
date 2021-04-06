import { Avatar, IconButton } from "@material-ui/core";
import firebase from "firebase";
import {
  AttachFile,
  InsertEmoticon,
  MicOutlined,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import db from "../../firebase";
import "./Chat.css";

function Chat() {
  const [seed, setSeed] = useState("");
  const [inputVal, setinputVal] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setmessages] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setmessages(snapshot.docs.map((s) => s.data()));
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const messageHandler = (e) => {
    setinputVal(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Send message ", inputVal);
    if (inputVal) {
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: inputVal,
        name: "Ahmad",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setinputVal("");
  };

  return (
    <div className="chat">
      <div class="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div class="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {messages &&
              new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}{" "}
            ...
          </p>
        </div>
        <div class="chat__headerRight">
          <IconButton>
            <SearchOutlined></SearchOutlined>
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div class="chat__body">
        {console.log("Messages : ", messages)}
        {messages &&
          messages.map((msg) => (
            <p
              className={`chat__message ${
                msg?.name == "Ahmad Ali" ? "chat_receiver" : ""
              }`}
            >
              <span className="chat__name">{msg.name}</span>
              {msg.message}
              <span className="chat__timestamp">
                {new Date(msg?.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          ))}

        {/* <p class="chat__message chat_receiver">
          <span class="chat__name">Ahmad</span>
          Hi Ahmad !!
          <span class="chat__timestamp">3:52pm</span>
        </p> */}
      </div>
      <div class="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={inputVal}
            onChange={messageHandler}
            type="text"
            placeholder="Enter a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <MicOutlined />
      </div>
    </div>
  );
}

export default Chat;
