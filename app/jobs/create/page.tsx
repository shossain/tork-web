"use client";
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Typewriter from 'typewriter-effect';
import { Paper } from '@mui/material';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const dynamic = "force-dynamic";
SyntaxHighlighter.registerLanguage('python', python);

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
  const [step0, setStep0] = useState(false);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [step5, setStep5] = useState(false);

  const code = `import datetime
import cv2
import numpy as np
# Define constants
IMAGE_PATH = "path_to_satellite_images"
ANALYSIS_OUTPUT_PATH = "path_to_output_report"
CURRENT_DATE = datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
DETECTION_THRESHOLD = 0.5  # Confidence threshold for detections
MILITARY_ASSETS = ["destroyer", "fighter_jet", "uav", "missile_system"]
def load_satellite_images(path):
    # Function to load satellite images
    images = []
    for img_file in os.listdir(path):
        if img_file.endswith(".jpg") or img_file.endswith(".png"):
            img = cv2.imread(os.path.join(path, img_file))
            images.append(img)
    return images
def detect_objects(image):
    # Dummy function to simulate object detection
    detected_objects = []
    height, width = image.shape[:2]
    # Simulate detection with random positions and confidence scores
    for asset in MILITARY_ASSETS:
        if np.random.rand() > 0.7:  # Randomly determine if an object is detected
            x = np.random.randint(0, width)
            y = np.random.randint(0, height)
            confidence = np.random.rand()
            if confidence > DETECTION_THRESHOLD:
                detected_objects.append({
                    "type": asset,
                    "position": (x, y),
                    "confidence": confidence
                })
    return detected_objects
def analyze_image(image):
    # Analyze a single image for military activity
    detections = detect_objects(image)
    return detections
def generate_report(detections):
    # Generate a text report from detections
    report_lines = [
        f"Satellite Image Analysis Report - {CURRENT_DATE}",
        "--------------------------------------------"
    ]
    for detection in detections:
        report_lines.append(
            f"Detected {detection['type']} at position {detection['position']} with confidence {detection['confidence']:.2f}"
        )
    report = "\n".join(report_lines)
    return report
def save_report(report, path):
    # Save the report to a file
    with open(path, "w") as file:
        file.write(report)
def main():
    # Main function to orchestrate the analysis
    images = load_satellite_images(IMAGE_PATH)
    all_detections = []
    for image in images:
        detections = analyze_image(image)
        all_detections.extend(detections)
    report = generate_report(all_detections)
    save_report(report, ANALYSIS_OUTPUT_PATH)
    print("Analysis complete. Report saved.")
if _name_ == "_main_":
    main()
  `

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    setTimeout(() => {
      setStep0(true)
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
      <Box sx={{ display: 'flex'}}>
      <Box sx={{ width: '60%'}}>
        CHAT
        <Box sx={{marginY: 2, height: 470, borderRadius: '10px', border: 1, padding: 2 }}>
          {/* <Box sx={{ p: 2 }}> 
          {step5 && <Typewriter options={{ delay: 10, cursor: null }}
            onInit={(typewriter) => { 
              typewriter.typeString(`SITREP is <u><a href="https://docs.google.com/document/d/1NYM6qC1teVMSyYrWdHGGhCFj3nGtPGU_uQ6kFyU_HLs/edit?usp=sharing">here</a></u>`) 
                .callFunction(() => { 
                  console.log('String typed out!');
                  setTimeout(function() {
                    setStep3(true)
                  }, 3000)                                            
                })             
                .start(); 
            }} 
          />}
          </Box> */}
         <div className="chat-window-new"> 
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
      </div>
        </Box>
      </Box>
      <Box sx={{ width: '40%'}} marginLeft={2}>
          CONSOLE
          <Box border={1} sx={{marginY: 2, height: 470, borderRadius: '10px',  borderColor: 'grey'}}>            
            <Box sx={{ p: 2, maxHeight: '100%', overflowY: 'auto' }}>              
              {step0 && <Typewriter options={{ delay: 10, cursor: null }}
                onInit={(typewriter) => { 
                  typewriter.typeString("Accessing streaming data for the last 24 hours (satellite)....and executing the following script:") 
                    .callFunction(() => { 
                      console.log('String typed out!');
                      setTimeout(function() {
                        setStep1(true)
                      }, 1000)                                            
                    }) 
            
                    .start(); 
                }} 
              />}
              <br />
              {step1 && <Paper elevation={3} sx={{maxHeight: 200, overflow: 'auto' }}>
                <SyntaxHighlighter language="python" style={atomOneLight}>
                  {code}
                </SyntaxHighlighter>
              </Paper>}
              <br />
              {step1 && <Typewriter options={{ delay: 200, cursor: null }}
                onInit={(typewriter) => { 
                  typewriter.typeString("..............................................") 
                    .callFunction(() => { 
                      console.log('String typed out!');
                      setTimeout(function() {
                        setStep2(true)
                      }, 1000)                                            
                    })             
                    .start(); 
                }} 
              />}
              <br />
              {step2 && <Typewriter options={{ delay: 10, cursor: null }}
                onInit={(typewriter) => { 
                  typewriter.typeString(`
- 3 new structures being built on the eastern side of the reef <br/>
- Sorties of Chinese J-11 fighter jets taking off and landing on the reef's airstrip<br/>
- 4x PLA Navy vessels docked at the reef's harbor, including 2 destroyers and 2 auxiliary ships<br/>

                  `) 
                    .callFunction(() => { 
                      console.log('String typed out!');
                      setTimeout(function() {
                        setStep3(true)
                      }, 3000)                                            
                    })             
                    .start(); 
                }} 
              />}
              <br />
              {step3 && <Typewriter options={{ delay: 10, cursor: null }}
                onInit={(typewriter) => { 
                  typewriter.typeString(`
Accessing news and tweets for mentions of relevancy in Fiery Cross Reef:<br />
- Local maritime news organization, Reef and Maritime News, wrote an article about the building up of naval assets on the reef.<br />
- Twitter has several posts about fisherman complaining about big ship heading toward the reef and disturbing their fishing locations <br />                 
                  `) 
                    .callFunction(() => { 
                      console.log('String typed out!');
                      setTimeout(function() {
                        setStep4(true)
                      }, 3000)                                            
                    })             
                    .start(); 
                }} 
              />}
              {step4 && <Typewriter options={{ delay: 10, cursor: null }}
                onInit={(typewriter) => { 
                  typewriter.typeString(`Combining them into a SITREP...........`) 
                    .callFunction(() => { 
                      console.log('String typed out!');
                      setTimeout(function() {
                        setStep5(true)
                        setMessages([...messages, { text: `SITREP is <u><a href="https://docs.google.com/document/d/1NYM6qC1teVMSyYrWdHGGhCFj3nGtPGU_uQ6kFyU_HLs/edit?usp=sharing">here</a></u>`, sender: 'bot' }]);
                      }, 5000)                                            
                    })             
                    .start(); 
                }} 
              />}
              </Box>
            </Box>
          </Box>        
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
            // width: '1045px',
            marginRight: '10px'   
          }}
          placeholder="Ask something..."
        />
        <button style={{ border: '1px solid white', borderRadius: '10px',}} type="submit">Send</button>
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
