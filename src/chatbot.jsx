import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css"; // We'll move styles here

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      text: `Hi! I'm a simple chatbot. Try asking me about:
• Weather
• Time
• Jokes
• My name
• How I'm doing`,
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Chatbot responses database
  const responses = {
    greetings: {
      patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
      responses: [
        "Hello! How can I help you today?",
        "Hi there! What's on your mind?",
        "Hey! Nice to meet you!",
        "Hello! I'm here to chat with you.",
      ],
    },
    weather: {
      patterns: ["weather", "rain", "sunny", "temperature", "hot", "cold"],
      responses: [
        "I can't check the real weather, but I hope it's nice where you are!",
        "Weather is always better when you're having a good conversation!",
        "I don't have weather data, but I'm sure it's perfect for chatting!",
      ],
    },
    time: {
      patterns: ["time", "clock", "hour", "minute", "what time"],
      responses: [
        `The current time is ${new Date().toLocaleTimeString()}`,
        `It's ${new Date().toLocaleTimeString()} right now!`,
      ],
    },
    jokes: {
      patterns: ["joke", "funny", "laugh", "humor"],
      responses: [
        "Why don't scientists trust atoms? Because they make up everything!",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "Why don't eggs tell jokes? They'd crack each other up!",
        "What do you call a fake noodle? An impasta!",
      ],
    },
    name: {
      patterns: ["your name", "who are you", "what are you called"],
      responses: [
        "I'm a simple chatbot! You can call me Bot.",
        "My name is Bot, and I'm here to chat with you!",
        "I'm just a friendly chatbot without a fancy name!",
      ],
    },
    howAreYou: {
      patterns: ["how are you", "how do you feel", "are you okay", "whats up"],
      responses: [
        "I'm doing great! Thanks for asking. How are you?",
        "I'm fantastic! Ready to chat about anything!",
        "I'm doing well! What about you?",
        "I'm good! Always happy to have a conversation!",
      ],
    },
    goodbye: {
      patterns: ["bye", "goodbye", "see you", "farewell", "take care"],
      responses: [
        "Goodbye! It was nice chatting with you!",
        "See you later! Take care!",
        "Bye! Come back anytime for another chat!",
        "Farewell! Have a wonderful day!",
      ],
    },
    help: {
      patterns: ["help", "what can you do", "commands"],
      responses: [
        "I can chat about weather, tell jokes, give you the time, or just have a friendly conversation!",
        "Try asking me about the weather, time, jokes, or just say hello!",
        "I'm a simple bot, but I love to chat! Ask me anything!",
      ],
    },
  };

  const defaultResponses = [
    "That's interesting! Tell me more.",
    "I'm not sure about that, but it sounds cool!",
    "Hmm, I don't quite understand. Can you rephrase that?",
    "That's a good point! What else is on your mind?",
    "I'm still learning! Can you ask me something else?",
    "Interesting question! I wish I knew more about that.",
  ];

  const findResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    for (const category in responses) {
      const categoryData = responses[category];
      for (const pattern of categoryData.patterns) {
        if (message.includes(pattern)) {
          const randomIndex = Math.floor(Math.random() * categoryData.responses.length);
          return categoryData.responses[randomIndex];
        }
      }
    }
    const randomIndex = Math.floor(Math.random() * defaultResponses.length);
    return defaultResponses[randomIndex];
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botReply = findResponse(userMsg.text);
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    }, 500);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">🤖 Simple Chatbot</div>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
