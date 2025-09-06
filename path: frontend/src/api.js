import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

export const uploadResume = async (file) => {
  const formData = new FormData()
  formData.append('resume', file)
  const res = await axios.post(`${API_BASE}/resumes/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export const getResumes = async () => {
  const res = await axios.get(`${API_BASE}/resumes`)
  return res.data
}

export const getResumeById = async (id) => {
  const res = await axios.get(`${API_BASE}/resumes/${id}`)
  return res.data
}
