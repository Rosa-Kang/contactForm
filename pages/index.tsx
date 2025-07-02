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

      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="text-center py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Next.js & MongoDB Contact Form
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-2">
            TypeScript + REST API + SSR + MongoDB Practice
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Contact form demo built with modern tech stack used in production
          </p>
          
          {/* Action Cards */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold mb-4">Send Message</h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Send messages through a type-safe form and store them in MongoDB.
              </p>
              <Link 
                href="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                Go to Contact Page
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold mb-4">Message List</h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                View stored messages rendered with SSR in a type-safe way.
              </p>
              <Link 
                href="/messages"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md hover:shadow-lg w-full sm:w-auto"
              >
                View Message List
              </Link>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border">
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">Tech Stack</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-6">
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
            
            <div className="pt-6 border-t border-gray-100">
              <h3 className="font-semibold mb-4">What You will Learn:</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-left">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    TypeScript interface definitions
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Next.js API Routes with types
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Type-safe MongoDB integration
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    SSR and getServerSideProps
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Form state management & validation
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    REST API design patterns
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}