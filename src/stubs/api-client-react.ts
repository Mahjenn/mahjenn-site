// Stub API client for standalone deployment
// Provides mock implementations of API hooks and types

export type SessionType = {
  id: number;
  name: string;
  description: string;
  priceInCents: number;
  durationMinutes: number;
  maxParticipants: number;
  category: string;
};

export type Product = {
  id: number;
  name: string;
  priceInCents: number;
  image?: string;
  description?: string;
};

// Mock hook for listing sessions
export function useListSessions() {
  return {
    data: [
      {
        id: 1,
        name: "Beginner Mahjong Lesson",
        description: "Learn the basics of mahjong in this interactive session.",
        priceInCents: 10000,
        durationMinutes: 60,
        maxParticipants: 4,
        category: "lesson",
      },
      {
        id: 2,
        name: "Intermediate Strategy Session",
        description: "Improve your game with advanced strategies and techniques.",
        priceInCents: 12500,
        durationMinutes: 90,
        maxParticipants: 4,
        category: "lesson",
      },
      {
        id: 3,
        name: "Corporate Mahjong Event",
        description: "Team building experience with mahjong.",
        priceInCents: 50000,
        durationMinutes: 120,
        maxParticipants: 20,
        category: "package",
      },
    ] as SessionType[],
    isLoading: false,
    error: null,
  };
}

// Mock hook for creating a booking
export function useCreateBooking() {
  return {
    mutateAsync: async (options: { data: any }) => {
      console.log("Mock booking created:", options.data);
      return { success: true };
    },
    isError: false,
    isLoading: false,
    error: null,
    status: "idle" as const,
  };
}

// Mock hook for creating an order
export function useCreateOrder() {
  return {
    mutateAsync: async (options: { data: any }) => {
      console.log("Mock order created:", options.data);
      return { success: true };
    },
    isError: false,
    isLoading: false,
    error: null,
    status: "idle" as const,
  };
}
