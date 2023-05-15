import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import io from "socket.io-client";
import { getTokens } from "../../utils/token";
import styles from "./index.module.scss";

const Chat = () => {
  const history = useRouter();
  const socketIO = useRef(null);
  const [message, setMessage] = useState("");
  // 聊天记录
  const [messageList, setMessageList] = useState([
    // 放两条初始消息
    { type: "robot", text: "亲爱的用户您好，小智同学为您服务。" },
    { type: "user", text: "你好" },
  ]);
  // useEffect(() => {
  //   // 1. 建立连接
  //   const socketio = io("http://toutiao.itheima.net", {
  //     query: {
  //       token: getTokens().token,
  //     },
  //     transports: ["websocket"],
  //   });
  //   socketio.io("connect", () => {
  //     console.log("连接成功");
  //   });
  //   // socketio.on("connect", () => {
  //   //   // 2. 连接成功
  //   //   // 让小智给你打个招呼
  //   //   setList((list) => [...list, { name: "xz", msg: "您想知道点啥？" }]);
  //   // });
  //   // // 4. 收消息
  //   // socketio.on("message", (data) => {
  //   //   // 聊天记录
  //   //   setList((list) => [...list, { name: "xz", msg: data.msg }]);
  //   // });

  //   // socketIO.current = socketio;

  //   return () => socketio.close();
  // }, []);
  useEffect(() => {
    // 1. 建立连接
    const socketio = io("http://toutiao.itheima.net", {
      query: {
        token: getTokens().token,
      },
      transports: ["websocket"],
    });
    socketio.on("connect", () => {
      // 2. 连接成功
      // 让小智给你打个招呼
      setMessageList((messageList) => [
        ...messageList,
        { type: "robot", text: "您有什么问我的" },
      ]);
      // 4. 收消息
      socketio.on("message", (data) => {
        // 聊天记录
        console.log(data);
        setMessageList((messageList) => [
          ...messageList,
          { type: "robot", text: data.msg },
        ]);

        // setMessageList((list) => [...list, { name: "xz", msg: data.msg }]);
      });
    });
    socketIO.current = socketio;
    return () => socketio.close();
  }, []);
  // 按回车发送消息
  const onSendMessage = (e) => {
    if (e.keyCode === 13) {
      // 通过 socket.io 客户端向服务端发送消息
      socketIO.current.emit("message", {
        msg: message,
        timestamp: Date.now(),
      });
      // 向聊天记录中添加当前发送的消息
      setMessageList((messageList) => [
        ...messageList,
        { type: "user", text: message },
      ]);

      // 发送后清空输入框
      setMessage("");
    }
  };
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}

      {/* 聊天记录列表 */}
      <div className="chat-list">
        {messageList.map((msg, index) => {
          // 机器人的消息
          if (msg.type === "robot") {
            return (
              <div className="chat-item" key={index}>
                {/* <Icon type="iconbtn_xiaozhitongxue" /> */}
                <b>机器人的消息</b>
                <div className="message">{msg.text}</div>
              </div>
            );
          }
          // 用户的消息
          else {
            return (
              <div className="chat-item user" key={index}>
                {/* <img
                  src="http://toutiao.itheima.net/images/user_head.jpg"
                  alt=""
                /> */}
                <b>用户的消息</b>
                <div className="message">{msg.text}</div>
              </div>
            );
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        {/* <Input className="no-border" placeholder="请描述您的问题" />
        <Icon type="iconbianji" /> */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={onSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
