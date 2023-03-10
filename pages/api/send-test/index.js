import prisma from '../../../lib/prisma';

export default async function handler(request, res) {
  const { body } = request;
  try {
    const response = await prisma.test.create({
      data: body,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.send(error.response ?? JSON.stringify(error));
  }
}
