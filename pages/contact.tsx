import Head from "next/head";
import React, { useState } from "react";
import { ContactFormData, ApiResponse } from '../types'; // 타입 import!

const Contact = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitStatus, setSubmitStatus] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result: ApiResponse = await response.json();

            if (response.ok) {
                setSubmitStatus('The message has been submitted successfully!');
                setFormData({ name: '', email: '', message: '' }); // 폼 초기화
            } else {
                setSubmitStatus(`Failed to submit the message: ${result.message}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            setSubmitStatus('Network error has occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Head>
                <title>Contact Us</title>
                <meta name="description" content="Contact Form with Next.js and MongoDB" />
            </Head>

            <div className="container mx-auto max-w-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input 
                            type="email"
                            id="email"
                            name="email" // 수정!
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                        </label>
                        <textarea 
                            rows={4}
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Send Message'}
                    </button>
                </form>

                {submitStatus && (
                    <div className={`mt-4 p-3 rounded-md ${
                        submitStatus.includes('successfully') 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {submitStatus}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contact;