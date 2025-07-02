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
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <Head>
        <title>Messages - Contact Form</title>
        <meta name="description" content="Submitted contact messages" />
      </Head>
      
      <div className="container mx-auto max-w-4xl p-4 sm:p-6">
        {/* Mobile-optimized header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold">Received Messages</h1>
          <Link 
            href="/contact" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium shadow-md hover:shadow-lg w-full sm:w-auto"
          >
            New Message
          </Link>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Total {messages.length} messages (Generated with Server-Side Rendering)
          </p>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m16 0l-2-2m2 2l-2 2M4 13l2-2m-2 2l2 2" />
                </svg>
              </div>
              <p className="text-gray-500 mb-6 text-lg">No messages received yet.</p>
            </div>
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors inline-block font-medium shadow-md hover:shadow-lg"
            >
              Send the first message!
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{message.name}</h3>
                    <p className="text-gray-600 text-sm break-all">{message.email}</p>
                  </div>
                  <div className="flex flex-col sm:text-right space-y-2">
                    <p className="text-xs sm:text-sm text-gray-500">
                      {formatDate(message.createdAt)}
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium w-fit ${
                      message.status === 'read' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {message.status === 'read' ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Technical Information</h3>
          <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
            This page is generated using <strong>getServerSideProps</strong> with Server-Side Rendering (SSR).
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            MongoDB data is fetched on the server before generating the HTML when the page loads.
          </p>
        </div>
      </div>
    </div>
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