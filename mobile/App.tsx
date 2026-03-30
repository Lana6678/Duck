import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>私人小说档案</Text>
      <Text style={styles.subtitle}>Expo + EAS iPhone MVP bootstrap</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5efe4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2a1f',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#4c5a4c',
  },
});
