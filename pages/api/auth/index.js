import { signInUser } from '../../../lib';

export default function handler(request, res) {
  try {
    const response = signInUser(request.body);
    if (response) {
      return res.status(200).json({ valid: true, id: response.id.toString() });
    }
    return res.status(200).json({ valid: false, error: 'El código introducido no existe' });
  } catch (error) {
    const err = error.response ?? JSON.stringify(error);
    return res.status(400).json(err);
  }
}
