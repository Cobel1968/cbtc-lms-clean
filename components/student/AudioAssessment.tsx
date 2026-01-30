'use client'
import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Trash2 } from 'lucide-react';

export default function AudioAssessment({ onUpload }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorder = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.start();
    setIsRecording(true);
    
    const chunks = [];
    mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      setAudioBlob(blob);
    };
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setIsRecording(false);
  };

  return (
    <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl text-center">
      <h3 className="text-sm font-bold text-slate-700 uppercase mb-4">Oral Technical Assessment</h3>
      {!audioBlob ? (
        <button 
          onClick={isRecording ? stopRecording : startRecording}
          className={p-6 rounded-full \ text-white}
        >
          {isRecording ? <Square size={32} /> : <Mic size={32} />}
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <audio src={URL.createObjectURL(audioBlob)} controls className="mb-4" />
          <div className="flex gap-4">
            <button onClick={() => setAudioBlob(null)} className="flex items-center text-xs text-rose-600 font-bold">
              <Trash2 size={14} className="mr-1" /> RETAKE
            </button>
            <button onClick={() => onUpload(audioBlob)} className="bg-emerald-600 text-white px-4 py-2 rounded font-bold text-xs">
              SUBMIT FOR AI ANALYSIS
            </button>
          </div>
        </div>
      )}
      <p className="text-xs text-slate-500 mt-4">Explain the technical procedure in English or French.</p>
    </div>
  );
}
