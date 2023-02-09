import prisma from '@/lib/prisma';

// get serverside props for page loads
// add find many 
export default async function handler(req, res) {
  if (req.method == 'GET') {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  }

  if (req.method == 'POST') {
    const name = req.body;
    const result = await prisma.category.create({
      data: {
        name: name
      }
    });
    res.status(201).json(result);
  }

  if (req.method == 'PUT') {
    const categoryId = req.id;
    const name = req.body;
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
    const categoryId = req.id;
    const deleteCat = await prisma.category.delete({
      where: {
        id: categoryId
      }
    });
    res.status(201).json(deleteCat);
  }
}
