import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method == 'GET') {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    }

    if (req.method == 'POST') {
      const { email, username, password } = req.body;
      const result = await prisma.user.create({
        data: {
          email: email,
          username: username,
          password: password
        }
      });
      res.status(201).json(result);
    }

    if (req.method == 'PUT') {
      const { userId, displayName } = req.body;
      const updateUser = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          displayName: displayName
        }
      });
      res.status(201).json(updateUser);
    }

    if (req.method == 'DELETE') {
      const { userId } = req.body;
      const deleteUser = await prisma.user.delete({
        where: {
          id: userId
        }
      });
      res.status(201).json(deleteUser);
    }
  }
}
