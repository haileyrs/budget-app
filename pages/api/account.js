import prisma from '@/lib/prisma';

// get serverside props for page loads
// add method to find all accounts for user
export default async function handler(req, res) {
  if (req.method == 'GET') {
    // const { userId, type } = req.body;
    let accounts = {};
    // if (type) {
    //   accounts = await prisma.account.findUnique({
    //     where: {
    //       AND: [
    //         {
    //           userId: userId
    //         },
    //         {
    //           type: type
    //         }
    //       ]
    //     }
    //   });
    // } else {
    //   accounts = await prisma.account.findMany({
    //     where: {
    //       userId: 1
    //     }
    //   });
    // }
    accounts = await prisma.account.findMany({
      where: {
        userId: 1
      }
    });
    res.status(200).json(accounts);
  }

  if (req.method == 'POST') {
    // add unique last updated function
    const { userId, name, type, value } = req.body;
    const result = await prisma.account.create({
      data: {
        userId: userId,
        name: name,
        type: type,
        value: value,
        lastUpdated: '01/02/2023'
      }
    });
    res.status(201).json(result);
  }

  if (req.method == 'PUT') {
    // add unique last updated function
    const { id, name, type, value } = req.body;
    const updateaccount = await prisma.account.update({
      where: {
        id: id
      },
      data: {
        name: name,
        type: type,
        value: value,
        lastUpdated: '01/02/2023'
      }
    });
    res.status(201).json(updateaccount);
  }

  if (req.method == 'DELETE') {
    const accountId = req.id;
    const deleteaccount = await prisma.account.delete({
      where: {
        id: accountId
      }
    });
    res.status(201).json(deleteaccount);
  }
}
