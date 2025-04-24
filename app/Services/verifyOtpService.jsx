// services/verifyOtpService.js

export const verifyOtpService = async (phone, otp) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/verify-phone-otp`, {
        method: "POST",
        body: JSON.stringify({ phone, otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP. Please try again.");
      }
  
      return data;
    } catch (error) {
      throw new Error(error.message || "Network error. Please try again.");
    }
  };
  