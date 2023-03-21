import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method == 'POST') {
      const { vendor, amount, categoryId, moneyAccountId, date } = req.body;
      const result = await prisma.transaction.create({
        data: {
          vendor: vendor,
          amount: amount,
          categoryId: categoryId,
          moneyAccountId: moneyAccountId,
          date: date
        }
      });
      res.status(201).json(result);
    }

    if (req.method == 'PUT') {
      const {
        transactionId,
        vendor,
        amount,
        categoryId,
        moneyAccountId,
        date
      } = req.body;
      const updatetransaction = await prisma.transaction.update({
        where: {
          id: transactionId
        },
        data: {
          vendor: vendor,
          amount: amount,
          categoryId: categoryId,
          moneyAccountId: moneyAccountId,
          date: date
        }
      });
      res.status(201).json(updatetransaction);
    }

    if (req.method == 'DELETE') {
      const { transactionId } = req.body;
      const deletetransaction = await prisma.transaction.delete({
        where: {
          id: transactionId
        }
      });
      res.status(201).json(deletetransaction);
    }
  }
  res.status(401);
}
