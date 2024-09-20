import { Client, Databases, Query } from 'appwrite';

export const client = new Client();

export const DATABASE_ID = "66eb7e66000785de8506";
export const COLLECTION_ID = "66eb7e8b003b890a02da";

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66eb7cf4000a4ede0f95');

export const databases = new Databases(client);

// export default {client};