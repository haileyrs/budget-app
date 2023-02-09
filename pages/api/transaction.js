import prisma from '@/lib/prisma';

// get serverside props for page loads
// add method to find all transactions for user
export default async function handler(req, res) {
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
    const { name, vendor, amount, category, account } = req.body;
    // do value math on this side by checking transactions
    const result = await prisma.transaction.create({
      data: {
        name: name,
        vendor: vendor,
        amount: amount,
        category: category,
        account: account
      }
    });
    res.status(201).json(result);
  }

  if (req.method == 'PUT') {
    const transactionId = req.id;
    const { name, vendor, amount, category } = req.body;
    const updatetransaction = await prisma.transaction.update({
      where: {
        id: transactionId
      },
      data: {
        name: name,
        vendor: vendor,
        amount: amount,
        category: category,
      }
    });
    res.status(201).json(updatetransaction);
  }

  if (req.method == 'DELETE') {
    const transactionId = req.id;
    const deletetransaction = await prisma.transaction.delete({
      where: {
        id: transactionId
      }
    });
    res.status(201).json(deletetransaction);
  }
}
