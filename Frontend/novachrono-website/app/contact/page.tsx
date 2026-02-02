'use client';

import { useState, FormEvent } from 'react';
import { submitContactForm } from '@/actions/contact/business';
import Button from '@/components/ui/button';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await submitContactForm(formData);
            setSubmitStatus({
                type: 'success',
                message: response.message,
            });
            // Reset form on success
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
        } catch (error: any) {
            setSubmitStatus({
                type: 'error',
                message: error.message || 'Failed to send message. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gunmetal-900 py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Contact <span className="text-gold-500">Us</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Have a question or need assistance? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Contact Information */}
                    <div className="bg-gunmetal-800 p-8 rounded-lg border border-white/5">
                        <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-gold-500 font-semibold mb-2 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email
                                </h3>
                                <p className="text-gray-400">novachrono.bd@gmail.com</p>
                            </div>
                            <div>
                                <h3 className="text-gold-500 font-semibold mb-2 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Phone
                                </h3>
                                <p className="text-gray-400">+880 1323-150134</p>
                                <p className="text-gray-400">+880 1521-259497</p>
                            </div>
                            <div>
                                <h3 className="text-gold-500 font-semibold mb-2 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Availability
                                </h3>
                                <p className="text-gray-400">We&apos;re available 24/7</p>
                                <p className="text-gray-400">Online support always at your service</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gunmetal-800 p-8 rounded-lg border border-white/5">
                        <h2 className="text-2xl font-semibold text-white mb-6">Send us a Message</h2>
                        
                        {submitStatus.type && (
                            <div
                                className={`mb-6 p-4 rounded-lg ${
                                    submitStatus.type === 'success'
                                        ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                }`}
                            >
                                {submitStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    minLength={2}
                                    maxLength={100}
                                    className="w-full bg-gunmetal-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gunmetal-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    minLength={3}
                                    maxLength={200}
                                    className="w-full bg-gunmetal-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    minLength={10}
                                    maxLength={2000}
                                    rows={5}
                                    className="w-full bg-gunmetal-900 border border-white/10 rounded-sm px-4 py-2.5 text-white focus:outline-none focus:border-gold-500 transition-colors resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                isLoading={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gunmetal-800 p-6 rounded-lg border border-white/5 text-center">
                    <p className="text-gray-400 text-sm">
                        For immediate assistance with orders or product inquiries, please email us at{' '}
                        <a href="mailto:support@novachrono.com" className="text-gold-500 hover:text-gold-400 transition-colors">
                            support@novachrono.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
