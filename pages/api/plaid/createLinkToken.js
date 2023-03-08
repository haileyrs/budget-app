import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { Products, CountryCode } from 'plaid';
import prisma from '@/lib/prisma';
import plaid from '@/lib/plaid';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    const request = {
      user: {
        client_user_id: user.id
      },
      client_name: 'Plaid Budget App',
      products: [Products.Auth, Products.Transactions, Products.Assets, Products.Investments],
      language: 'en',
      country_codes: [CountryCode.Us]
    };

    try {
      const createTokenResponse = await plaid.linkTokenCreate(request);
      res.json(createTokenResponse.data);
    } catch (error) {
      console.log(error);
    }

  }
}