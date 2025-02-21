import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';

function UploadButton() {
  return (
  <button>
    Upload a File
    </button>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <UploadButton />
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
