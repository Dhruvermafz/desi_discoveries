export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://desi-discoveries.onrender.com/api/v1"
    : "http://localhost:4000/api/v1";
