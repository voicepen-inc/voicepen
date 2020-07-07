import React, {useState, useEffect } from 'react'
import Mic from '../../images/mic.svg'
import Pause from '../../images/pause.svg'
import Push from '../../images/push.svg'

 const VoiceInput =()=>{
   
    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState(null)
    const [savedNotes, setSavedNotes] = useState([])

    
        return (
            <>
               <div className="controls">
           <img src={Mic} alt="" onClick={() => setIsListening(prevState => true)} title="click and speak"/>
         </div>
         <div> 
           <img src={Pause} alt="" onClick={() => setIsListening(prevState => false)} title="stop"/>
          </div>
         <div> 
           <img src={Push} alt=""  disabled={!note} title="push to editor"/>
       </div> 
            </>
        )
   
}
export default VoiceInput