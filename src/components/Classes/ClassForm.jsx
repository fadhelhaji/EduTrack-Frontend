import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import * as classService from '../../services/classService'

function ClassForm() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        className: '',
        program: '',
        schedule: ''
    })

    async function handleSubmit(e){
        e.preventDefault()
        const data = await classService.create(formData)
        navigate('/')
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
                <option value="">Select schedule</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
            </select>
            <button type='submit'>Create Class</button>
        </form>
    </>
  )
}

export default ClassForm