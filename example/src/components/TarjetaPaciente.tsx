import { Image, StyleSheet, Text, View } from 'react-native';

type TarjetaPacienteProps = {
  nombre: string;
  especie: string;
  foto: string;
};

export function TarjetaPaciente({ nombre, especie, foto }: TarjetaPacienteProps) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: foto }}
        style={styles.photo}
        resizeMode="cover"
        accessibilityLabel={`Foto de ${nombre}`}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{nombre}</Text>
        <Text style={styles.species}>{especie}</Text>
      </View>
      <View style={styles.arrow}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 104,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8EEE9',
  },
  photo: {
    width: 76,
    height: 76,
    borderRadius: 14,
    backgroundColor: '#E7ECE8',
  },
  details: {
    flex: 1,
    marginLeft: 14,
    gap: 6,
  },
  name: {
    color: '#18352B',
    fontSize: 17,
    fontWeight: '700',
  },
  species: {
    color: '#718078',
    fontSize: 14,
  },
  arrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F0F5F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  arrowText: {
    color: '#376B55',
    fontSize: 24,
    lineHeight: 26,
  },
});
