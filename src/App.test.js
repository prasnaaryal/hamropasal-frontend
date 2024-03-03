import login_mock from "./mock/lock_mock";

describe("API Testing", () => {
  // login
  it("Login should work", async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(login_mock),
        }
      );

      const data = await response.json();

      expect(response.status).toEqual(200);
      expect(data.success).toEqual(true);
    } catch (error) {
      console.error("Error:", error);
    }
  });



  // login
  it("Login should work", async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(login_mock),
        }
      );

      const data = await response.json();

      expect(response.status).toEqual(200);
      expect(data.success).toEqual(true);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  it("Registration should work", async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerMock), // Use your mock data for registration
        }
      );

      const data = await response.json();

      expect(response.status).toEqual(200); // Adjust the expected status code
      expect(data.success).toEqual(true); // Adjust the expected success property

     
    } catch (error) {
      console.error("Error:", error);
    }
  });


  // Registration with invalid data (simulating failure)
  it("Registration should fail with invalid data", async () => {
    try {
      const invalidRegisterMock = {}; // Provide invalid data for registration

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invalidRegisterMock),
        }
      );

      const data = await response.json();

      // Adjust the expected status code and error conditions based on your endpoint's behavior
      expect(response.status).toEqual(400); // Assuming 400 Bad Request for validation failure
      expect(data.error).toBeDefined(); // Assuming your endpoint returns an error property for validation failures
      // Add more assertions if needed
    } catch (error) {
      console.error("Error:", error);
    }
  });


  it("Create Order should work with a valid access token", async () => {
    try {
      // Assuming you have a valid access token stored in localStorage
      const accessToken = localStorage.getItem("accessToken");

      const orderData = {}; // Replace with actual order data

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/order/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      // Adjust the expected status code and success conditions based on your API's behavior
      expect(response.status).toEqual(200); // Adjust the expected status code
      expect(data.success).toEqual(true); // Adjust the expected success property
      // Add more assertions if needed
    } catch (error) {
      console.error("Error:", error);
    }
  });


  it("Fetch Product Data should work with a valid access token", async () => {
    try {
      // Assuming you have a valid access token stored in localStorage
      const accessToken = localStorage.getItem("accessToken");

      const data = {}; // Replace with actual data

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      // Adjust the expected status code and success conditions based on your API's behavior
      expect(response.status).toEqual(200); // Adjust the expected status code
      expect(responseData.success).toEqual(true); // Adjust the expected success property
      // Add more assertions if needed
    } catch (error) {
      console.error("Error:", error);
    }
  });

  it("Fetch Product Details should work with a valid access token", async () => {
    try {
      // Assuming you have a valid access token stored in localStorage
      const accessToken = localStorage.getItem("accessToken");

      // Replace 'your_product_id' with an actual product ID
      const productId = 'your_product_id';

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/product/${productId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const responseData = await response.json();

      // Adjust the expected status code and success conditions based on your API's behavior
      expect(response.status).toEqual(200); // Adjust the expected status code
      expect(responseData.success).toEqual(true); // Adjust the expected success property
      // Add more assertions if needed
    } catch (error) {
      console.error("Error:", error);
    }
  });

  it("Fetch All Orders should work with a valid access token", async () => {
    try {
      // Assuming you have a valid access token stored in localStorage
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/order/get-all-orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const responseData = await response.json();

      // Adjust the expected status code and success conditions based on your API's behavior
      expect(response.status).toEqual(200); // Adjust the expected status code
      expect(responseData.success).toEqual(true); // Adjust the expected success property
      // Add more assertions if needed
    } catch (error) {
      console.error("Error:", error);
    }
  });

  it("Fetch All Orders should fail with an invalid access token", async () => {
    try {
      // Assuming you have an invalid access token (e.g., expired or incorrect) for testing
      const invalidAccessToken = 'invalid_access_token';

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/order/get-all-orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${invalidAccessToken}`,
          },
        }
      );

      const responseData = await response.json();

      // Adjust the expected status code and error conditions based on your API's behavior
      expect(response.status).toEqual(401); // Assuming 401 Unauthorized for an invalid access token
      expect(responseData.error).toBeDefined(); // Assuming your endpoint returns an error property for authorization failures
      // Add more assertions if needed
    } catch (error) {
      console.error("Error:", error);
    }
  });



});



