import { MongoClient, MongoClientOptions } from 'mongodb';

if(!process.env.MONGODB_URI) {
    throw new Error('Failed to find MONGODB_URI environment variable.')
}

const uri = process.env.MONGODB_URI;

// MongoDB 연결 옵션 명시적으로 설정
const options: MongoClientOptions = {
    // SSL/TLS 설정을 명시적으로 지정
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false,
};

declare global {
    var _mongoClientPromise : Promise<MongoClient> | undefined;
}

let clientPromise : Promise<MongoClient>;

if(process.env.NODE_ENV === 'development') {
    if(!global._mongoClientPromise) {
        const client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;