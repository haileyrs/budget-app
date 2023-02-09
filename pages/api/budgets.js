import prisma from '@/lib/prisma';

// get serverside props for page loads
// add method to find all budgets for user
export default async function handler(req, res) {
  if (req.method == 'GET') {
    const { userId, category } = req.body;
    let budgets = {};
    if (category) {
      budgets = await prisma.budget.findUnique({
        where: {
          AND: [
            {
              userId: userId
            },
            {
              categoryId: category
            }
          ]
        }
      });
    } else {
      budgets = await prisma.budget.findMany({
        where: {
          userId: userId
        }
      });
    }
    res.status(200).json(budgets);
  }

  if (req.method == 'POST') {
    const { userId, categoryId, max } = req.body;
    // do value math on this side by checking transactions
    const result = await prisma.budget.create({
      data: {
        userId: userId,
        categoryId: categoryId,
        max: max,
        value: 0
      }
    });
    res.status(201).json(result);
  }

  if (req.method == 'PUT') {
    const budgetId = req.id;
    const max = req.body;
    const updateBudget = await prisma.budget.update({
      where: {
        id: budgetId
      },
      data: {
        max: max
      }
    });
    res.status(201).json(updateBudget);
  }

  if (req.method == 'DELETE') {
    const budgetId = req.id;
    const deleteBudget = await prisma.budget.delete({
      where: {
        id: budgetId
      }
    });
    res.status(201).json(deleteBudget);
  }
}
