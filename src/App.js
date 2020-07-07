import React, { useState, useEffect } from 'react'
import Mic from './images/mic.svg'
import Pause from './images/pause.svg'
import Push from './images/push.svg'
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  return (
    <>
      
      <div className="container">
        <div>
        <div className="box">

          <h2>Voice Inputs</h2>
          {isListening ? <span role="img" aria-label='mic'>ON</span> : <span role="img" aria-label="no-mic">OFF</span>}
          
         
          <p>{note}</p>
         
        </div>
       <div className="controls-container">
         <div className="controls">
           <img src={Mic} alt="" onClick={() => setIsListening(prevState => true)} title="click and speak"/>
         </div>
         <div> 
           <img src={Pause} alt="" onClick={() => setIsListening(prevState => false)} title="stop"/>
          </div>
         <div> 
           <img src={Push} alt="" onClick={handleSaveNote} disabled={!note} title="push to editor"/>
       </div>
       </div>
         
        </div>
        <div>
        <div className="box" contentEditable="true">
          <h2>Editor</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
        </div>
        
      </div>
    </>
  )
}

export default App
