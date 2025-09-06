import { useState } from 'react'
import { uploadResume } from '../api'

const ResumeUploader = ({ onAnalysis }) => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file.')
      return
    }
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const data = await uploadResume(file)
      onAnalysis(data)
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.error || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Upload Resume (PDF)</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          setFile(e.target.files?.[0] || null)
          setError(null)
        }}
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Analyzing…' : 'Upload & Analyze'}
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default ResumeUploader
