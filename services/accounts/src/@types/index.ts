export class DatabaseError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(`DatabaseError: ${message ?? "Unknown error"}`, options);
  }
}

export class ApiError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(`ApiError: ${message ?? "Unknown error"}`, options);
  }
}

export type PaginationOptions = {
  /**
   * Offset (paginated) where from entities should be taken.
   */
  skip?: number;
  /**
   * Limit (paginated) - max number of entities should be taken.
   */
  take?: number;
};
