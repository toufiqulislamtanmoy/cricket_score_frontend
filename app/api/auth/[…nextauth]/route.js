import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Function to call your Express backend for authentication
async function yourDatabaseCheck(email, password) {
  try {
    const res = await fetch("http://your-express-backend-url/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // If the response is OK, return the user data
    if (res.ok) {
      const data = await res.json();
      return data.user; // Return the user object from the response
    }

    // If invalid credentials, return null
    return null;
  } catch (error) {
    console.error("Error during authentication", error);
    return null;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Call your custom database check (which now hits the Express API)
        const user = await yourDatabaseCheck(email, password);

        if (user) {
          return user; // If user is valid, return user data
        } else {
          return null; // If invalid credentials, return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Using JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;  // Attach user ID to JWT token
        token.email = user.email;  // Attach user email to JWT token
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.email = token.email;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
