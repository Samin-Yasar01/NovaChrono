import { ContactFormData, ContactResponse } from './types';

export const sendContactEmail = async (data: ContactFormData): Promise<ContactResponse> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send message');
    }

    return result;
  } catch (error: any) {
    console.error('Contact form error:', error);
    throw new Error(error.message || 'Failed to send message. Please try again.');
  }
};

