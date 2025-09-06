import { useState } from 'react'
import ResumeUploader from './components/ResumeUploader'
import PastResumesTable from './components/PastResumesTable'
import ResumeDetails from './components/ResumeDetails'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('upload')
  const [selectedResume, setSelectedResume] = useState(null)

  return (
    <>
      <header>
        <h1>Resume Analyzer</h1>
      </header>
      <div className="container">
        <nav>
          <button onClick={() => setActiveTab('upload')}>Upload Resume</button>
          <button onClick={() => setActiveTab('history')}>History</button>
        </nav>

        {activeTab === 'upload' && (
          <ResumeUploader onAnalysis={(data) => setSelectedResume(data)} />
        )}

        {activeTab === 'history' && (
          <PastResumesTable onSelectResume={(r) => setSelectedResume(r)} />
        )}

        {selectedResume && (
          <ResumeDetails resume={selectedResume} onClose={() => setSelectedResume(null)} />
        )}
      </div>
    </>
  )
}

export default App
