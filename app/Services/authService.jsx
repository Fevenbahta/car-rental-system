// services/authService.js

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginUser = async (phone, password) => {
  try {
    const payload = { phone: `0${phone}`, password };
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Invalid Username or Password');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'An error occurred while logging in');
  }
};
