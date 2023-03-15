import { checkCode } from '../../../lib';

export default async function handler(request, res) {
  const { centroId, codigo } = request.query;
  try {
    const response = await checkCode({ centroId, codigo });
    if (response) {
      return res.status(200).json({ valid: true, id: response.id.toString() });
    }
    return res.status(200).json({ valid: false, error: 'El código introducido no existe' });
  } catch (error) {
    const err = error.response ?? JSON.stringify(error);
    return res.status(400).json(err);
  }
}
