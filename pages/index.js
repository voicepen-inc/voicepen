import { useState, useEffect } from "react";

import Layout from "../components/Layout";
import RecordControl from "../components/Buttons/RecordControl";

function App() {
  const [mic, setMic] = useState(null);

  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const micObj = new SpeechRecognition();

    micObj.continuous = true;
    micObj.interimResults = true;
    micObj.lang = "en-US";

    setMic(micObj);
  }, []);

  const handleListen = () => {
    if (mic !== null) {
      if (isListening) {
        mic.start();
        mic.onend = () => {
          console.log("continue..");
          mic.start();
        };
      } else {
        mic.stop();
        mic.onend = () => {
          console.log("Stopped Mic on Click");
        };
      }
      mic.onstart = () => {
        console.log("Mics on");
      };

      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        console.log(transcript);
        setNote(transcript);
        mic.onerror = (errorEvent) => {
          console.log(errorEvent.error);
        };
      };
    }
  };

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };

  return (
    <Layout>
      <div className="container">
        <div>
          <div className="box">
            <h2>Voice Inputs</h2>
            {isListening ? (
              <span role="img" aria-label="mic">
                ON
              </span>
            ) : (
              <span role="img" aria-label="no-mic">
                OFF
              </span>
            )}

            <p>{note}</p>
          </div>
          <div className="controls-container">
            <div className="controls">
              <RecordControl
                onClickHandler={() => setIsListening(true)}
                title="Click and speak"
                image="/images/mic.svg"
              />
              <RecordControl
                onClickHandler={() => setIsListening(false)}
                title="Stop"
                image="/images/pause.svg"
              />
              <RecordControl
                onClickHandler={handleSaveNote}
                title="Push to editor"
                image="/images/push.svg"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="box" contentEditable="true">
            <h2>Editor</h2>
            {savedNotes.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
