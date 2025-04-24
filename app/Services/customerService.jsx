// customerService.js

export const fetchCustomers = async (token) => {
    try {
      if (!token) {
        throw new Error("No token found in localStorage.");
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }
  
      const data = await response.json();
      return data.users || [];
    } catch (error) {
      throw new Error(`Error fetching customers: ${error.message}`);
    }
  };
  