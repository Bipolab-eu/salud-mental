import prisma from '../../../lib/prisma';

async function checkCode({ centroId, codigo }) {
  const response = await prisma.codigo.findFirst({
    where: {
      codigo,
      centroId: +centroId,
    },
  });
  return response;
}

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
