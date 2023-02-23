import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';

// get serverside props for page loads
// add method to find all budgets for user
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method == 'GET') {
      // const { userId, category } = req.body;
      let budgets = {};
      // if (category) {
      //   budgets = await prisma.budget.findUnique({
      //     where: {
      //       AND: [
      //         {
      //           userId: userId
      //         },
      //         {
      //           categoryId: category
      //         }
      //       ]
      //     }
      //   });
      // } else {
      //   budgets = await prisma.budget.findMany({
      //     where: {
      //       userId: userId
      //     }
      //   });
      // }
      budgets = await prisma.budget.findMany({
        where: {
          userId: 1
        }
      });
      res.status(200).json(budgets);
    }

    if (req.method == 'POST') {
      const { userId, category, max } = req.body;
      // do value math on this side by checking transactions
      // plaid supplies transaction categories so this structure will probably change
      const result = await prisma.budget.create({
        data: {
          userId: userId,
          category: category,
          max: max,
          value: 0
        }
      });
      res.status(201).json(result);
    }

    if (req.method == 'PUT') {
      const { id, max } = req.body;
      const updateBudget = await prisma.budget.update({
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
      const budgetId = req.body;
      const deleteBudget = await prisma.budget.delete({
        where: {
          id: budgetId
        }
      });
      res.status(201).json(deleteBudget);
    }
  }
  
  res.status(401);
  
}
