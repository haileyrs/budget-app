import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';

let today = new Date();
let y = today.getFullYear();
let m = today.getMonth();

// get serverside props for page loads
// add method to find all budgets for user
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method == 'POST') {
      const { userId, categoryId, max } = req.body;
      const result = await prisma.budget.create({
        data: {
          userId: userId,
          categoryId: categoryId,
          max: max,
          value: 0,
          month: m,
          year: y
        }
      });
      res.status(201).json(result);
    }

    if (req.method == 'PUT') {
      const { id, max, categoryId } = req.body;
      const updateBudget = await prisma.budget.update({
        where: {
          id: id
        },
        data: {
          max: max,
          categoryId: categoryId
        }
      });
      res.status(201).json(updateBudget);
    }

    if (req.method == 'DELETE') {
      const { id } = req.body;
      const deleteBudget = await prisma.budget.delete({
        where: {
          id: id
        }
      });
      res.status(201).json(deleteBudget);
    }
  }
  res.status(401);
}
