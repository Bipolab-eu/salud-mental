/* eslint-disable max-len */
import prisma from '../../../lib/prisma';
import { toJson } from '../../../utils';

async function saveTest(data) {
  const response = await prisma.test.create({ data: JSON.parse(data) })
    .catch((err) => {
      console.log(err);
      return err;
    });

  return response;
}

export default async function handler(request, res) {
  const { body } = request;

  try {
    const response = await saveTest(body);
    const jsonData = JSON.parse(toJson(response));

    res.status(200).json(jsonData);
  } catch (error) {
    const err = error.response ?? JSON.stringify(error);
    res.status(400).json(err);
  }
}
