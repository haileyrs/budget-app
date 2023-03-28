import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    if (req.method == 'POST') {
      const { name, userId } = req.body;
      const result = await prisma.category.create({
        data: {
          name: name,
          userId: userId
        }
      });
      res.status(201).json(result);
    }

    if (req.method == 'PUT') {
      const { categoryId, name } = req.body;
      const updateCat = await prisma.category.update({
        where: {
          id: categoryId
        },
        data: {
          name: name
        }
      });
      res.status(201).json(updateCat);
    }

    if (req.method == 'DELETE') {
      const { categoryId } = req.body;
      const deleteCat = await prisma.category.delete({
        where: {
          id: categoryId
        }
      });
      res.status(201).json(deleteCat);
    }
  }
  res.status(401);
}
