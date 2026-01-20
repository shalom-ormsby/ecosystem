import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@sage/ui';
import './global.css';

export default function App() {
  return (
    <View style={styles.container}>
      <Text className="text-xl font-bold mb-4">Sage Universal Mobile</Text>
      <View className="gap-4">
        <Button onPress={() => console.log('Universal Button Pressed')}>
          Universal Button
        </Button>
        <Button variant="destructive">
          Destructive
        </Button>
        <Button variant="outline">
          Outline
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
