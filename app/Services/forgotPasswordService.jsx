// services/forgotPasswordService.js

export const forgotPasswordService = async (inputType, contact) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-reset-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [inputType]: contact }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        const messages = Object.values(data.errors || {}).flat().join(" ");
        throw new Error(messages || data.message || "Failed to send OTP. Please try again.");
      }
  
      return { success: true, contact };
    } catch (error) {
      throw new Error(error.message || "An error occurred. Please check your network connection.");
    }
  };
  