import prisma from '../../../lib/prisma';
import { toJson } from '../../../utils';

async function getCenters() {
  const response = await prisma.instituto.findMany();
  return response;
}

export default async function handler(request, res) {
  try {
    const response = await getCenters();
    const jsonData = JSON.parse(toJson(response));

    res.status(200).json(jsonData);
  } catch (error) {
    console.log(error);
    const err = error.response ?? JSON.stringify(error);
    res.status(400).json(err);
  }
}
