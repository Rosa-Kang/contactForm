import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Contact Form App - Next.js & MongoDB with TypeScript</title>
        <meta name="description" content="Contact form built with Next.js, MongoDB and TypeScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Next.js & MongoDB Contact Form
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            TypeScript + REST API + SSR + MongoDB Practice
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Contact form demo built with modern tech stack used in production
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="text-3xl mb-4">✉️</div>
              <h2 className="text-lg font-semibold mb-4">Send Message</h2>
              <p className="text-gray-600 mb-4">
                Send messages through a type-safe form and store them in MongoDB.
              </p>
              <Link 
                href="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Go to Contact Page
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border">
              <div className="text-3xl mb-4">📋</div>
              <h2 className="text-lg font-semibold mb-4">Message List</h2>
              <p className="text-gray-600 mb-4">
                View stored messages rendered with SSR in a type-safe way.
              </p>
              <Link 
                href="/messages"
                className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                View Message List
              </Link>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-8 border">
            <h2 className="text-2xl font-bold mb-6">🛠️ Tech Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg border">
                <div className="font-bold text-blue-900 mb-1">TypeScript</div>
                <div className="text-blue-700">Type Safety</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border">
                <div className="font-bold text-green-900 mb-1">Next.js</div>
                <div className="text-green-700">React Framework</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border">
                <div className="font-bold text-purple-900 mb-1">MongoDB</div>
                <div className="text-purple-700">NoSQL Database</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border">
                <div className="font-bold text-orange-900 mb-1">REST API</div>
                <div className="text-orange-700">API Routes</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-3">What You&apos;ll Learn:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-left">
                <ul className="space-y-1 text-gray-700">
                  <li>• TypeScript interface definitions</li>
                  <li>• Next.js API Routes with types</li>
                  <li>• Type-safe MongoDB integration</li>
                </ul>
                <ul className="space-y-1 text-gray-700">
                  <li>• SSR and getServerSideProps</li>
                  <li>• Form state management & validation</li>
                  <li>• REST API design patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}