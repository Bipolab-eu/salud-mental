import { checkCode } from '../../../lib';

export default async function handler(request, res) {
  const { centroId, codigo } = request.query;
  try {
    const response = await checkCode({ centroId, codigo });

    if (!response) res.status(200).json({ valid: false, error: 'El código introducido no existe' });
    res.status(200).json({ valid: true, id: response.id.toString() });
  } catch (error) {
    const err = error.response ?? JSON.stringify(error);
    res.status(400).json(err);
  }
}
