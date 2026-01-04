import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import * as classService from '../../services/classService'

function ClassForm() {
    const {id} = useParams()
    const navigate = useNavigate()

    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        className: '',
        program: '',
        schedule: ''
    })

    useEffect(() => {
        if (!isEdit) return;

            async function fetchClass() {
                try {
                    const cls = await classService.show(id);
                    setFormData({
                    className: cls.className,
                    program: cls.program,
                    schedule: cls.schedule
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        fetchClass();
    }, [id, isEdit]);

    async function handleSubmit(e){
        e.preventDefault()
        try {
            if (isEdit) {
                await classService.update(id, formData);
            } else {
                await classService.create(formData);
            }
        } catch(error){
            console.log(error);
        }
        navigate('/class')
    }

    function handleChange(e){
        setFormData({...formData, [e.target.name] : e.target.value})
    }
  return (
    <>
        <h1>{isEdit ? 'Edit Class' : 'Create a Class'}</h1>
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
            <button type="submit">{isEdit ? 'Update Class' : 'Create Class'}</button>
        </form>
    </>
  )
}

export default ClassForm