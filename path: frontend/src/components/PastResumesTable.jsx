import { useEffect, useState } from 'react'
import { getResumes, getResumeById } from '../api'

const PastResumesTable = ({ onSelectResume }) => {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const data = await getResumes()
        setResumes(data)
      } catch (err) {
        console.error(err)
        setError(err?.response?.data?.error || 'Failed to load resumes')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleDetails = async (id) => {
    try {
      const full = await getResumeById(id)
      onSelectResume(full)
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.error || 'Failed to load details')
    }
  }

  if (loading) return <p>Loading…</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <h2>Past Resumes</h2>
      <table>
        <thead>
          <tr>
            <th>Uploaded</th>
            <th>Name</th>
            <th>Email</th>
            <th>File</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((r) => (
            <tr key={r.id}>
              <td>{new Date(r.uploaded_at).toLocaleString()}</td>
              <td>{r.name || '-'}</td>
              <td>{r.email || '-'}</td>
              <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.file_name}</td>
              <td>
                <button onClick={() => handleDetails(r.id)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PastResumesTable
