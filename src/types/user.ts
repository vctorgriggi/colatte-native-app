export interface User {
  /* id */
  id: string;

  /* data */
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  imageUrl?: string;

  /* timestamps */
  createdAt: string;
  updatedAt: string;
}
