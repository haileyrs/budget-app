import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method == 'POST') {
      const { userId, categoryId, max } = req.body;
      const result = await prisma.recurringBudget.create({
        data: {
          userId: userId,
          categoryId: categoryId,
          max: max
        }
      });
      res.status(201).json(result);
    }

    if (req.method == 'PUT') {
      const { id, max } = req.body;
      const updateBudget = await prisma.recurringBudget.update({
        where: {
          id: id
        },
        data: {
          max: max
        }
      });
      res.status(201).json(updateBudget);
    }

    if (req.method == 'DELETE') {
      const { id } = req.body;
      const deleteBudget = await prisma.recurringBudget.delete({
        where: {
          id: id
        }
      });
      res.status(201).json(deleteBudget);
    }
  }
  res.status(401);
}
