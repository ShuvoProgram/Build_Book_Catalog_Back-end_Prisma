// Create a type for creating orders
export type OrderCreateInput = {
    userId: string; // Replace with the actual type of userId
    orderedBooks: {
      bookId: string; // Replace with the actual type of bookId
      quantity: number;
    }[];
    status?: string; // Optionally, if status is set, provide the type
  };