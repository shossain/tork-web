"use client";
import { useState } from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Typewriter from 'typewriter-effect';
import { Paper, Avatar } from '@mui/material';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';


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
            <div key={index} className='text-white'>
              {message.sender === 'user' && <Box 
                sx={{
                  marginBottom: 2, 
                  display: 'flex',
                  alignItems: 'top'}}>
                  <Avatar sx={{marginRight: 2}}>M</Avatar>
                  <Box><Typography><b>Mike</b></Typography>{message.text}</Box>
                </Box>}
              {message.sender === 'bot' && <Box 
                sx={{
                  marginBottom: 2, 
                  display: 'flex',
                  alignItems: 'top'}}>
                  <Avatar sx={{marginRight: 2}}>P</Avatar>
                  <Box>
                    <Typography><b>Pytho</b></Typography>
                    <Typewriter options={{ delay: 2, cursor: null }}
                      onInit={(typewriter) => { 
                        typewriter.typeString(message.text) 
                          .callFunction(() => { 
                            console.log('String typed out!'); 
                          }) 
                  
                          .start(); 
                      }} 
                    />
                  </Box>
                </Box>
                }
            </div>
          </div>
          
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ 
            borderRadius: '10px',
            color: 'black',
            flex: '1',
            marginRight: '10px'   
          }}
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
