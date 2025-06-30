import Head from "next/head"

const contact = () => {

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

  return (
    <div>
        <Head>
            <title>Contact Us</title>
            <meta name="description" content="Contact Form with Next.js and MongoDB"/>
        </Head>

        <div className="container mx-auto max-w-md p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="name">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input 
                        type="text"
                        id=""
                        name=""
                        value={FormData.name}
                        onChange={handleChange}
                        required
                        className=""
                     />
                </div>
                <div className="email">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input 
                        type="email"
                        id=""
                        name=""
                        value={FormData.email}
                        onChange={handleChange}
                        required
                        className=""
                     />
                </div>
                <div className="message">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                    </label>
                    <textarea 
                        rows={4}
                        id=""
                        name=""
                        value={FormData.message}
                        onChange={handleChange}
                        required
                        className=""
                     />
                </div>

                <button
                    type="submit"
                >

                </button>
            </form>


        </div>
    </div>
  )
}

export default contact