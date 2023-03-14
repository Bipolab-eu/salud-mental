import { getCenters } from '../../../lib';

export default async function handler(request, res) {
  try {
    const response = await getCenters();

    res.status(200).json(response);
  } catch (error) {
    const err = error.response ?? JSON.stringify(error);
    res.status(400).json(err);
  }
}
