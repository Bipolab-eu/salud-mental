const toJson = (data) => JSON.stringify(data, (_, v) => (typeof v === 'bigint' ? v.toString() : v));

const generarCodigo = () => {
  let caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let codigo = '';

  // Escoger cuatro caracteres aleatorios sin repetir
  for (let i = 0; i < 4; i + 1) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[indiceAleatorio];
    caracteres = caracteres.slice(0, indiceAleatorio) + caracteres.slice(indiceAleatorio + 1); // Eliminar caracter escogido para evitar repetición
  }
  return codigo.toUpperCase();
};

export { toJson, generarCodigo };
