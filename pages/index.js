import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    handleListen();
  }, [isListening]);

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
        mic.onerror = (event) => {
          console.log(event.error);
        };
      };
    }
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };

  return (
    <>
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
              <img
                src="/images/mic.svg"
                alt=""
                onClick={() => setIsListening((prevState) => true)}
                title="click and speak"
              />
            </div>
            <div>
              <img
                src="/images/pause.svg"
                alt=""
                onClick={() => setIsListening((prevState) => false)}
                title="stop"
              />
            </div>
            <div>
              <img
                src="/images/push.svg"
                alt=""
                onClick={handleSaveNote}
                disabled={!note}
                title="push to editor"
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
    </>
  );
}

export default App;
