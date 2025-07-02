import { MongoClient } from 'mongodb';

if(!process.env.MONGODB_URI) {
    throw new Error('Failed to find Mongodb_uri.')
}

const uri = process.env.MONGODB_URI;

declare global {
    var _mongoClientPromise : Promise<MongoClient> | undefined;
}

let clientPromise : Promise<MongoClient>;

if(process.env.NODE_ENV === 'development') {
    if(!global._mongoClientPromise) {
        const client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;