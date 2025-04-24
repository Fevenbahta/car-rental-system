// services/registerService.js

export const registerService = async (formData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      if (res.ok) {
        return { success: true, data };
      } else {
        const messages = Object.values(data.errors || {}).flat().join(" ");
        return { success: false, error: messages || "Something went wrong." };
      }
    } catch (error) {
      return { success: false, error: "Network error. Try again." };
    }
  };
  