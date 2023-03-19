import { createClient } from '@supabase/supabase-js';
import { toJson } from '../utils';
import { prisma } from './prisma';

// Configurar Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.PROJECT_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Configurar Prisma

// Crear el modelo de usuario
// const User = prisma.user;

// Implementar la autenticación
async function signInUser(payload) {
  const { email } = JSON.parse(payload);
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: 'http://localhost:3000/auth',
    },
  });
  console.log(error);
  console.log(data);

  // if (error) {
  //   throw new Error(error.message);
  // }

  // const existingUser = await User.findUnique({ where: { email: user.email } });

  // if (!existingUser) {
  //   throw new Error('User does not exist');
  // }

  return data;
}
// async function authenticateUser(email, password) {
//   const { user, error } = await supabase.auth.signIn({
//     email,
//     password,
//   });

//   if (error) {
//     throw new Error(error.message);
//   }

//   const existingUser = await User.findUnique({ where: { email: user.email } });

//   if (!existingUser) {
//     throw new Error('User does not exist');
//   }

//   return existingUser;
// }

async function createCodes(data) {
  const response = await prisma.codigo.create({
    data,
  });
  return response;
}

async function getCenters() {
  const response = await prisma.centro.findMany()
    .catch((err) => {
      console.log(err);
      return err;
    });
  return toJson(response);
}

async function checkCode({ centroId, codigo }) {
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

  try {
    const response = await prisma.test.create({ data });
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
    return toJson(response);
  } catch (error) {
    return error.toString();
  }
}

export {
  signInUser,
  checkCode,
  createCodes,
  getCenters,
  saveTest,
};
