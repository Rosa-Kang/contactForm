import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import clientPromise from '../lib/mongodb';
import { ContactMessage, SerializedMessage } from '../types';

interface MessagesPageProps {
  messages: SerializedMessage[];
  error?: string;
}

export default function Messages({ messages, error }: MessagesPageProps) {
  if (error) {
    return (
      <div className="container mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-bold mb-6">An Error Occurred</h1>
        <p className="text-red-600">{error}</p>
        <Link href="/contact" className="text-blue-600 hover:underline">
          Back to Contact Page
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Head>
        <title>Messages - Contact Form</title>
        <meta name="description" content="Submitted contact messages" />
      </Head>
      
      <div className="container mx-auto max-w-4xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Received Messages</h1>
          <div className="space-x-4">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800"
            >
              Home
            </Link>
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              New Message
            </Link>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Total {messages.length} messages (Generated with Server-Side Rendering)
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No messages received yet.</p>
            <Link 
              href="/contact" 
              className="text-blue-600 hover:underline"
            >
              Send the first message!
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{message.name}</h3>
                    <p className="text-gray-600 text-sm">{message.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {formatDate(message.createdAt)}
                    </p>
                    <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                      message.status === 'read' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {message.status === 'read' ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Technical Information</h3>
          <p className="text-sm text-blue-700">
            This page is generated using <strong>getServerSideProps</strong> with Server-Side Rendering (SSR).
            <br />
            MongoDB data is fetched on the server before generating the HTML when the page loads.
          </p>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<MessagesPageProps> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('contact_db');
    const collection = db.collection<ContactMessage>('messages');

    const messages = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    // Convert MongoDB ObjectId to string and process for JSON serialization
    const serializedMessages: SerializedMessage[] = messages.map(msg => ({
      id: msg._id!.toString(),
      name: msg.name,
      email: msg.email,
      message: msg.message,
      createdAt: msg.createdAt.toISOString(),
      status: msg.status || 'unread'
    }));

    return {
      props: {
        messages: serializedMessages,
      },
    };
  } catch (error) {
    console.error('SSR error:', error);
    return {
      props: {
        messages: [],
        error: 'Database connection failed'
      },
    };
  }
};