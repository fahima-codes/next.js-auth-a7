import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

const mongodbUrl = process.env.MONGODB_URI;

if (!mongodbUrl) {
  throw new Error('MONGODB_URI environment variable is required');
}

const client = new MongoClient(mongodbUrl);
const db = client.db('Bajardor');

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL as string,
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github'],
    },
  },
  trustedOrigins: [
    'https://next-js-auth-a7.vercel.app',
    'https://next-js-auth-a7-5fdo2v4at-aa-53e9.vercel.app',
    'http://localhost:3000',
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db),
});
