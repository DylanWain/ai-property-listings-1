import { useState } from 'react';
import { CiDollar, CiPaperplane } from 'react-icons/ci';
import { MdLightbulbOutline } from 'react-icons/md';
import { PiMapPinArea } from 'react-icons/pi';
import { TbBed } from 'react-icons/tb';
import './App.css';

const presetCommands = [
  { command: 'Tell me which city is best for me', icon: <PiMapPinArea size={20} /> },
  { command: 'Which apartments can I afford?', icon: <CiDollar size={20} /> },
  { command: 'Help me find the best 2 bedroom under $4k', icon: <TbBed size={20} /> },
  { command: 'Find me a place that fits my daily routine', icon: <MdLightbulbOutline size={20} /> },
];

function App() {
  const [count, setCount] = useState(0)

  const submitPreference = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const preferences = formData.get('preferences') as string;

    console.log("Preferences: ", preferences);

    e.currentTarget.reset();
  }

  return (
    <>
      <div className='header'>
        <h1 className='header-title'>Finding Places</h1>
        <p className='header-link'>About</p>
      </div>
      <h2 className='title'>AI-Powered search for your <span className='highlight'>perfect home</span></h2>
      <div className='description-container'>
        <p className='description'>I'll help you find your ideal apartment. Share your preferences for location, budget, and features, and I'll do the rest</p>
        <p className='description'>Or I can help you in other ways shown below!</p>
      </div>
      <div className='command-grid-container'>
        {presetCommands.map((section, index) => (
          <div key={index} className='command-container'>
            <div className='command-icon'>{section.icon}</div>
            <p className='command'>{section.command}</p>
          </div>
        ))}
      </div>
      <form onSubmit={submitPreference} className='preferences-form'>
        <input className='preferences-input' type="text" name="preferences" placeholder='Tell me your preferences' />
        <button type='submit' className='submit-button'><CiPaperplane size={25} style={{ strokeWidth: 0.5}} /></button>
      </form>
      <div className='powered-by-container'>
        <small className='powered-by'>Powered by GPT-4</small>
      </div>
    </>
  )
}

export default App
