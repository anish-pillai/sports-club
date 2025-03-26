// This is an empty module stub for client-side rendering
// Used to replace server-only modules during client-side builds

// Export a mock adapter function
export function PrismaAdapter() {
  return {
    createUser: async () => ({}),
    getUser: async () => null,
    getUserByEmail: async () => null,
    getUserByAccount: async () => null,
    updateUser: async () => ({}),
    deleteUser: async () => ({}),
    linkAccount: async () => ({}),
    unlinkAccount: async () => ({}),
    createSession: async () => ({}),
    getSessionAndUser: async () => null,
    updateSession: async () => ({}),
    deleteSession: async () => ({}),
    createVerificationToken: async () => ({}),
    useVerificationToken: async () => null,
  };
}

// Default export for modules that use it
export default PrismaAdapter;
