export interface Contact {
  id?: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
  isRead?: boolean;
}