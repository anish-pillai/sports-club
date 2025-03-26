// This is a stub file for browser environments
// It provides a mock Prisma client that can be imported in browser contexts
// without causing build errors

// Create a mock PrismaClient for browser environments
const PrismaClient = {
  user: {
    findUnique: async () => null,
    findFirst: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  account: {
    findUnique: async () => null,
    findFirst: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  session: {
    findUnique: async () => null,
    findFirst: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  // Add other models as needed
};

// Export the mock client
export const prisma = PrismaClient;
