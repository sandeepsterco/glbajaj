"use client"

import { apiFetch } from "@/src/lib/api";
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [fieldsData, setFieldsData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        query: '',
        type: '',
    });

    const resetFields = ()=>{
        setFieldsData({
            name: '',
            address: '',
            phone: '',
            email: '',
            query: '',
            type: '',
        })
    }

    const changeHandler = (e: any) => {
        let { name, value } = e.target;

        setFieldsData((state) => ({
            ...state,
            [name]: value
        }))
    }

    const submitHandler = async (e:any) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://project-demo.in/gl-bajaj/api/contact-form`, {
                method: 'POST',
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fieldsData),
            });
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            const data = await response.json();

            if(data.success){
                toast.success(data.message);
                resetFields();
            }else{
                toast.error(data.message || 'Failed to submit form');
                resetFields();
            }
        } catch (error) {
            resetFields()
            toast.error('Failed to submit form');
        }

        
    }

    return (
        <>
            <div className="form-container">
                <h4>Get In Touch With Us</h4>

                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <input type="text" placeholder="Student Name" name="name" value={fieldsData.name} onChange={changeHandler} />
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Address" name="address" value={fieldsData.address} onChange={changeHandler} />
                    </div>

                    <div className="form-group">
                        <input type="text" placeholder="Phone" name="phone" value={fieldsData.phone} onChange={changeHandler} />
                    </div>

                    <div className="form-group">
                        <input type="email" placeholder="Email" name="email" value={fieldsData.email} onChange={changeHandler} />
                    </div>

                    <div className="form-group">
                        <textarea id="exampleFormControlTextarea1" rows={5}
                            placeholder="Query" name="query" value={fieldsData.query} onChange={changeHandler}></textarea>
                    </div>

                    <div className="form-group">
                        <select name="type" value={fieldsData.type} onChange={changeHandler}>
                            <option value="admission">Admission</option>
                            <option value="feedback">Feedback</option>
                            <option value="enquiry">Enquiry</option>
                        </select>
                    </div>

                    <button className="btn" type="submit">Apply Now</button>

                </form>
            </div>

            <ToastContainer
                position="top-right"

            />
        </>
    )
}