import { toJson } from '../utils';
import { prisma } from './prisma';

async function getCenters() {
  const response = await prisma.centro.findMany()
    .catch((err) => {
      console.log(err);
      return err;
    });
  return toJson(response);
}

async function checkCode({ centroId, codigo }) {
  console.log(centroId, codigo);
  const response = await prisma.codigo.findFirst({
    where: {
      codigo,
      centroId: +centroId,
    },
  });
  return response;
}

async function saveTest(payload) {
  const data = JSON.parse(payload);
  const response = await prisma.test.create({ data })
    .catch((err) => {
      console.log(err);
      return err;
    });

  if (response) {
    await prisma.codigo.update({
      where: {
        id: response.codigoId,
      },
      data: {
        uso: {
          increment: 1,
        },
      },
    });
  }
  return toJson(response);
}

export { getCenters, checkCode, saveTest };
