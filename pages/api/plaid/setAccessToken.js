import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import plaid from '@/lib/plaid';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    const publicToken = req.body.public_token;

    try {
      const response = await plaid.itemPublicTokenExchange({
        public_token: publicToken
      });

      const accessToken = response.data.access_token;
      const itemID = response.data.item_id;

      const addPlaidItem = await prisma.plaidItem.create({
        data: {
          accessToken: accessToken,
          itemId: itemID,
          user: { connect: { email: user.email }}
        }
      });
      res.status(200).json({ message: "Added account" });
    } catch (error) {
      console.timeLog(error);
    }
  }
}
