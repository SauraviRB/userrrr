const logoutResolvers = {
    Mutation: {
      logout: async (_, __, { req, res }) => {
        if (!req.user) {
          throw new Error("Not logged in."); // Handle cases where user is not authenticated
        }
  
        // Instruct the client to discard the token
        res.clearCookie('token'); // Assuming you're using cookies for token
  
        return true; // Return true to indicate successful logout
      },
    },
  };
export default logoutResolvers;
  