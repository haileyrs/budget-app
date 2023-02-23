import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';

let today = new Date();
let y = today.getFullYear();
let m = today.getMonth() + 1;
let d = today.getDate();

const apiDate = m + '/' + d + '/' + y

// get serverside props for page loads
// add method to find all accounts for user
export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
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
      const { userId, name, type, value } = req.body;
      const result = await prisma.account.create({
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
      const { id, name, type, value } = req.body;
      const updateaccount = await prisma.account.update({
        where: {
          id: id
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
      const accountId = req.body;
      const deleteaccount = await prisma.account.delete({
        where: {
          id: accountId
        }
      });
      res.status(201).json(deleteaccount);
    }
  }

  res.status(401);
  
}
