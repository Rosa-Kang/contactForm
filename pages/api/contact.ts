import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ContactFormData, ContactMessage, ApiResponse, MessagesResponse } from '../../types';

export default async function contactApi(
    req: NextApiRequest, 
    res: NextApiResponse<ApiResponse | MessagesResponse>
) {
    if (req.method === 'POST') {
        try {
            const { name, email, message }: ContactFormData = req.body;
            
            if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
                return res.status(400).json({
                    message: 'Please enter the correct format'
                });
            }

            if (!name || !email || !message) {
                return res.status(400).json({
                    message: 'Please enter all fields required'
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    message: 'Please enter a valid email.'
                });
            }

            const client = await clientPromise;
            const db = client.db('contact_db');
            const collection = db.collection<ContactMessage>('messages');

            const document: ContactMessage = {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                message: message.trim(),
                createdAt: new Date(),
                status: 'unread'
            };

            const result = await collection.insertOne(document);

            res.status(201).json({
                message: 'Message has been saved successfully',
                id: result.insertedId.toString()
            });

        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({
                message: 'Server error occurred'
            });
        }
    } else if (req.method === 'GET') {
        try {
            const client = await clientPromise;
            const db = client.db('contact_db');
            const collection = db.collection<ContactMessage>('messages');

            const messages = await collection
                .find({})
                .sort({ createdAt: -1 })
                .limit(20)
                .toArray();

            const serializedMessages = messages.map(msg => ({
                id: msg._id!.toString(),
                name: msg.name,
                email: msg.email,
                message: msg.message,
                createdAt: msg.createdAt.toISOString(),
                status: msg.status || 'unread'
            }));

            res.status(200).json({
                message: 'Successfully got the messages',
                messages: serializedMessages
            });
        } catch (error) {
            console.error('Database error:', error);
            res.status(500).json({
                message: 'There has been an error in the Server'
            });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).json({
            message: `Method ${req.method} Not Allowed.`
        });
    }
}