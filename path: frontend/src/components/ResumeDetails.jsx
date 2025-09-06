const ResumeDetails = ({ resume, onClose }) => {
  return (
    <div style={{ border: '1px solid #ddd', marginTop: '1rem', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <h2>Resume Details</h2>
        <div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>

      <p><strong>Name:</strong> {resume.name || '-'}</p>
      <p><strong>Email:</strong> {resume.email || '-'}</p>
      <p><strong>Phone:</strong> {resume.phone || '-'}</p>
      <p><strong>LinkedIn:</strong> {resume.linkedin_url || '-'}</p>
      <p><strong>Portfolio:</strong> {resume.portfolio_url || '-'}</p>
      <p><strong>Summary:</strong> {resume.summary || '-'}</p>

      <h3>Work Experience</h3>
      <ul>
        {resume.work_experience?.length ? resume.work_experience.map((exp, idx) => (
          <li key={idx}>
            <strong>{exp.role || '-'}</strong> at {exp.company || '-'} ({exp.duration || '-'})
            {exp.description?.length ? (
              <ul>
                {exp.description.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
            ) : null}
          </li>
        )) : <li>-</li>}
      </ul>

      <h3>Education</h3>
      <ul>
        {resume.education?.length ? resume.education.map((edu, idx) => (
          <li key={idx}>{edu.degree || '-'} - {edu.institution || '-'} ({edu.graduation_year || '-'})</li>
        )) : <li>-</li>}
      </ul>

      <h3>Skills</h3>
      <p><strong>Technical:</strong> {Array.isArray(resume.technical_skills) ? resume.technical_skills.join(', ') : '-'}</p>
      <p><strong>Soft:</strong> {Array.isArray(resume.soft_skills) ? resume.soft_skills.join(', ') : '-'}</p>

      <h3>Rating</h3>
      <p>{resume.resume_rating ?? '-'} / 10</p>

      <h3>Improvement Areas</h3>
      <p>{resume.improvement_areas || '-'}</p>

      <h3>Upskill Suggestions</h3>
      <ul>
        {Array.isArray(resume.upskill_suggestions) && resume.upskill_suggestions.length ? (
          resume.upskill_suggestions.map((s, idx) => <li key={idx}>{s}</li>)
        ) : <li>-</li>}
      </ul>
    </div>
  )
}

export default ResumeDetails
