/* eslint-disable max-len */
import { saveTest } from '../../../lib';

export default async function handler(request, res) {
  const { body } = request;

  try {
    const response = await saveTest(body);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}
