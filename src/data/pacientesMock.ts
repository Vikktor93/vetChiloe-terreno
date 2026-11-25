export type Paciente = {
  id: number;
  nombre: string;
  numero_atencion: string;
  especie: string;
  edad: number;
  diagnostico: string;
  foto: string; // URL de la imagen
};

export const pacientesMock: Paciente[] = [
  { id: 1, nombre: 'Luna', numero_atencion: 'A-001', especie: 'Canino',
    edad: 4, diagnostico: 'Control anual', foto: 'https://media.istockphoto.com/id/1503385646/es/foto/retrato-divertido-y-feliz-perro-cachorro-shiba-inu-asom%C3%A1ndose-detr%C3%A1s-de-una-pancarta-azul.jpg?s=612x612&w=0&k=20&c=mMZ1Dvy0J8iNpF2boWkL8bo45vYYPi_AvZ1aYr9oO8w=' },
  { id: 2, nombre: 'Max', numero_atencion: 'A-002', especie: 'Canino',
    edad: 3, diagnostico: 'Vacunación', foto: 'https://media.istockphoto.com/id/2109202034/es/foto/cachorro-activo-de-labrador-labrador-negro-de-8-semanas-participando-al-aire-libre-en-el-prado.jpg?s=612x612&w=0&k=20&c=soR9fDrbOc0Y0YSsFdNxciEgkNVstFqlqbRcu6Pv3ho=' },
  { id: 3, nombre: 'Bella', numero_atencion: 'A-003', especie: 'Felino',
    edad: 2, diagnostico: 'Control anual', foto: 'https://media.istockphoto.com/id/1325997570/es/foto/gato-bengal%C3%AD-acostado-en-el-sof%C3%A1-y-sonriendo.jpg?s=612x612&w=0&k=20&c=FAAp2kezHM1YZ-py3Ho_5iRNOhdw7evjLGIT9iK3OWw=' }
];
