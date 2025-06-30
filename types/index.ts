import { ObjectId } from 'mongodb';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}


export interface ContactMessage {
  _id?: ObjectId;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  status: 'read' | 'unread';
}


export interface ApiResponse {
  message: string;
  id?: string;
  error?: string;
}


export interface SerializedMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'read' | 'unread';
}


export interface MessagesResponse extends ApiResponse {
  messages?: SerializedMessage[]; 
}