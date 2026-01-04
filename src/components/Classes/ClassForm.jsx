import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function ClassForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        className: '',
        program: '',
        schedule: ''
    })

    function handleSubmit(e){
        e.preventDefault()
        navigate('/home')
    }

    function handleChange(e){
        setFormData({...formData, [e.target.name] : e.target.value})
    }
  return (
    <>
        <h1>Create a class</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="className">Class Name</label>
            <input name='className' id='className' value={formData.className} onChange={handleChange} type="text" />

            <label htmlFor="program"></label>
            <select name="program" value={formData.program} onChange={handleChange} required>
                <option value="">Select program</option>
                <option value="SEB">SEB</option>
                <option value="UI-UX">UI-UX</option>
                <option value="Java">Java</option>
            </select>

            <label htmlFor="schedule"></label>
            <select name="schedule" value={formData.schedule} onChange={handleChange} required>
                <option value="Full-time">Full-time</option>
                <option value="Part-Time">Part-time</option>
            </select>
            <button type='submit'>Create Class</button>
        </form>
    </>
  )
}

export default ClassForm