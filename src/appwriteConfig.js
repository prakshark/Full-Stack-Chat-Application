import { Client, Databases, Query } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66eb7cf4000a4ede0f95');

export const databases = new Databases(client);

// export default {client};