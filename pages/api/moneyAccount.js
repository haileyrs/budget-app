import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';

let today = new Date();
let y = today.getFullYear();
let m = today.getMonth() + 1;
let d = today.getDate();

const apiDate = m + '/' + d + '/' + y;

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method == 'POST') {
      const { userId, name, type, value } = req.body;
      const result = await prisma.moneyAccount.create({
        data: {
          userId: userId,
          name: name,
          type: type,
          value: value,
          lastUpdated: apiDate
        }
      });
      res.status(201).json(result);
    }

    if (req.method == 'PUT') {
      const { accountId, name, type, value } = req.body;
      const updateaccount = await prisma.moneyAccount.update({
        where: {
          id: accountId
        },
        data: {
          name: name,
          type: type,
          value: value,
          lastUpdated: apiDate
        }
      });
      res.status(201).json(updateaccount);
    }

    if (req.method == 'DELETE') {
      const { accountId } = req.body;
      const deleteaccount = await prisma.moneyAccount.delete({
        where: {
          id: accountId
        }
      });
      res.status(201).json(deleteaccount);
    }
  }
  res.status(401);
}
