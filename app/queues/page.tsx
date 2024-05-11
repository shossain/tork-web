"use client";
import { useState } from 'react';

import Typewriter from 'typewriter-effect';

export const dynamic = "force-dynamic";

export default function Queues() {

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    setTimeout(() => {
      setMessages([{ text: inputValue, sender: 'user' }, { text: 'The last time we observed T-90s in this vicinity was during Operation Sandstorm on 210815Z APR 24. A report from Task Force Bravo details the encounter: two T-90s were spotted providing cover for a logistics convoy attempting to resupply hostile forces in the region. They were engaged and destroyed by Apache helicopters from 1st Air Cavalry Brigade, approximately 20 kilometers southwest of our current location. Reference SPOTREP 199 for more information.', sender: 'bot' }]);
    }, 2000);
    
    setInputValue('');
  };
    
  return (
    <>
      {/* <div className="mt-8 flex justify-end gap-2">
        <Refresh />
      </div> */}
      <div>
      <div className="chat-window">
        
        {messages.map((message, index) => (
          <div className="flex flex-col">
            <div key={index} className={`message ${message.sender}`}>
              {message.sender === 'user' && <>{message.text}</>}
              {message.sender === 'bot' && <Typewriter options={{ delay: 15 }}
                onInit={(typewriter) => { 
                  typewriter.typeString(message.text) 
                    .callFunction(() => { 
                      console.log('String typed out!'); 
                    }) 
            
                    .start(); 
                }} 
              />}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ borderRadius: '10px' }}
          placeholder="Ask something..."
        />
        <button style={{ border: '1px solid white', borderRadius: '10px' }} type="submit">Send</button>
      </form>
    </div>
    </>
  );
}

async function getData(): Promise<Queue[]> {
  const res = await fetch(`${process.env.BACKEND_URL}/queues`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
