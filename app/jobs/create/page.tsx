"use client";
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Typewriter from 'typewriter-effect';

export const dynamic = "force-dynamic";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
    
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* <div className="mt-8 flex justify-end gap-2">
        <Refresh />
      </div> */}
      <div>

      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Result" {...a11yProps(0)} />
          <Tab label="Steps" {...a11yProps(1)} />
          <Tab label="Tab 3" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Content for Tab 1.
      </TabPanel>
      <TabPanel value={value} index={1}>
        Content for Tab 2.
      </TabPanel>
      <TabPanel value={value} index={2}>
        Content for Tab 3.
      </TabPanel>
    </Box>
      {/* <div className="chat-window">
        
        {messages.map((message, index) => (
          <div className="flex flex-col">
            <div key={index} className={`message ${message.sender}`}>
              {message.sender === 'user' && <>{message.text}</>}
              {message.sender === 'bot' && <Typewriter options={{ delay: 10 }}
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
      </div> */}
      <div className="flex flex-row">
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ 
            borderRadius: '10px',
            color: 'black',
            display: 'flex',
            flex: '1 1 200px',
            width: '1045px',
            marginRight: '10px'   
          }}
          placeholder="Ask something..."
        />
        <button style={{ border: '1px solid white', borderRadius: '10px', marginRight: '10px'    }} type="submit">Send</button>
      </form>
      
      <button style={{ border: '1px solid white', borderRadius: '10px' }} type="submit">Schedule</button>
      </div>
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
