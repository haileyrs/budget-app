import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';

// get serverside props for page loads
// add method to find all transactions for user
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method == 'GET') {
      const { account, category } = req.body;
      let transactions = {};
      if (category) {
        transactions = await prisma.transaction.findUnique({
          where: {
            AND: [
              {
                accountId: account
              },
              {
                categoryId: category
              }
            ]
          }
        });
      } else {
        transactions = await prisma.transaction.findMany({
          where: {
            accountId: account
          }
        });
      }
      res.status(200).json(transactions);
    }

    if (req.method == 'POST') {
      const { vendor, amount, categoryId, moneyAccountId, month, day, year } = req.body;
      // do value math on this side by checking transactions
      const result = await prisma.transaction.create({
        data: {
          vendor: vendor,
          amount: amount,
          categoryId: categoryId,
          moneyAccountId: moneyAccountId,
          month: month,
          day: day,
          year: year
        }
      });
      res.status(201).json(result);
    }

    if (req.method == 'PUT') {
      const { transactionId, vendor, amount, categoryId, moneyAccountId, month, day, year } = req.body;
      const updatetransaction = await prisma.transaction.update({
        where: {
          id: transactionId
        },
        data: {
          vendor: vendor,
          amount: amount,
          categoryId: categoryId,
          moneyAccountId: moneyAccountId,
          month: month,
          day: day,
          year: year
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
