/**
 * This file handles Prisma client initialization for both server and browser environments
 * It provides a real Prisma client on the server and a mock implementation in the browser
 */

// Define the type for our database client
type DatabaseClient = any;

// Global instance to prevent multiple Prisma instances in development
declare global {
  var prismaClient: DatabaseClient | undefined;
}

// Helper function to create mock models for browser environment
function createMockModel() {
  return {
    findUnique: async () => null,
    findFirst: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
    count: async () => 0,
    upsert: async () => ({}),
  };
}

// Create a client based on the environment
function createClient(): DatabaseClient {
  // Browser environment - return a mock client
  if (typeof window !== 'undefined') {
    console.warn('Using mock Prisma client in browser environment');
    return {
      user: createMockModel(),
      arena: createMockModel(),
      booking: createMockModel(),
      class: createMockModel(),
      coach: createMockModel(),
      account: createMockModel(),
      session: createMockModel(),
      verificationToken: createMockModel(),
      $connect: async () => {},
      $disconnect: async () => {},
    };
  }
  
  // Server environment - return a real Prisma client
  try {
    // Dynamic import to avoid issues during build time
    const { PrismaClient } = require('@prisma/client');
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    // Return a mock client as fallback
    return {
      user: createMockModel(),
      arena: createMockModel(),
      booking: createMockModel(),
      class: createMockModel(),
      coach: createMockModel(),
      account: createMockModel(),
      session: createMockModel(),
      verificationToken: createMockModel(),
      $connect: async () => {},
      $disconnect: async () => {},
    };
  }
}

// Use the global instance in development to prevent multiple instances
// during hot reloading, or create a new instance
export const prisma: DatabaseClient = 
  (process.env.NODE_ENV !== 'production' && global.prismaClient) || 
  (() => {
    const client = createClient();
    // Save to global in development on server
    if (process.env.NODE_ENV !== 'production' && typeof window === 'undefined') {
      global.prismaClient = client;
    }
    return client;
  })();
