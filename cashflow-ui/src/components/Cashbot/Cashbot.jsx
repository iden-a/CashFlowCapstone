import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

// const API_KEY = process.env.REACT_APP_API_KEY 
// const {REACT_APP_API_KEY } = process.env
const API_KEY = import.meta.env.VITE_API_KEY

export default function CashBot() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am CashBot",
      sender: "CashBot",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage]; //all the old messages + new message
    //update messages state
    setMessages(newMessages);
    //setup a typing indicator (CashBot is typing)
    setTyping(true);
    //process message to chatGPT (send it over and see the response )

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    //chatMessages { sender:'user' or 'cashbot', message:'the message content here'}
    //apiMessages {role:'user' or 'assistant', content:'The message content here'}

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "CashBot") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });
    // role:"user" -> a message from the user,
    //      "assistant" -> a response from chatGPT,
    //      "system" -> an initial message defining HOW we want chaptGPT to talk

    const systemMessage = {
      role: "system",
      content:
        "Explain all concepts like I am a college student learning something new.",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage,
        ...apiMessages, // [message1,2,3..]
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "CashBot",
          },
        ]);
        setTyping(false);
      });
  }

  return (
    <>
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                typing ? <TypingIndicator content="CashBot is typing" /> : null
              }
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
}
