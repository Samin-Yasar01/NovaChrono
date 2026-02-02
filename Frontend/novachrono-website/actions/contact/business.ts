'use client';

import { sendContactEmail } from './service';
import { ContactFormData } from './types';

export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const response = await sendContactEmail(formData);
    return response;
  } catch (error: any) {
    console.error('Contact form submission error:', error);
    throw new Error(error.response?.data?.message || 'Failed to send message. Please try again.');
  }
};
