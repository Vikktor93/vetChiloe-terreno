const normalizarEspecie = (especie) => {
  const especieNormalizada = especie.trim().toLocaleLowerCase();

  if (["perro", "canino", "canina"].includes(especieNormalizada)) {
    return "Canino";
  }

  if (["gato", "felino", "felina"].includes(especieNormalizada)) {
    return "Felino";
  }

  return especie;
};

const normalizarPaciente = (paciente) => {
  if (
    !paciente ||
    (typeof paciente.id !== "number" && typeof paciente.id !== "string") ||
    typeof paciente.nombre !== "string" ||
    typeof paciente.numero_atencion !== "string" ||
    typeof paciente.especie !== "string" ||
    (typeof paciente.edad !== "number" && typeof paciente.edad !== "string") ||
    typeof paciente.diagnostico !== "string"
  ) {
    throw new Error("La API devolvió un paciente con un formato inválido.");
  }

  return {
    ...paciente,
    especie: normalizarEspecie(paciente.especie),
    edad: String(paciente.edad),
    foto: paciente.imagen,
  };
};

const mensajeUrlApiInvalida = "URL de la API pública inválida o inexistente.";

export async function obtenerPacientes({ signal } = {}) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (!apiUrl) {
    throw new Error(mensajeUrlApiInvalida);
  }

  let url;
  try {
    url = new URL(apiUrl);
  } catch {
    throw new Error(mensajeUrlApiInvalida);
  }
  if (!["http:", "https:"].includes(url.protocol) || !url.hostname) {
    throw new Error(mensajeUrlApiInvalida);
  }

  let response;
  try {
    response = await fetch(`${apiUrl.replace(/\/+$/, "")}/api/pacientes`, {
      signal,
    });
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }
    throw new Error(mensajeUrlApiInvalida);
  }
  if (response.status === 404) {
    throw new Error(mensajeUrlApiInvalida);
  }
  if (!response.ok) {
    throw new Error(`No se pudieron cargar los pacientes (HTTP ${response.status}).`);
  }

  const pacientes = await response.json();
  if (!Array.isArray(pacientes)) {
    throw new Error("La API devolvió una lista de pacientes inválida.");
  }

  return pacientes.map(normalizarPaciente);
}
