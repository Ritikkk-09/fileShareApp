import { View, Text, Platform } from 'react-native'
import { Colors, requestPhotoPermission } from './src/utils/Constants';
import { checkFilePermissions } from './src/utils/libraryHelpers';
import { useEffect } from 'react';
import Navigation from './src/navigation/Navigation';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function App() {

  useEffect(() => {
    requestPhotoPermission();
    checkFilePermissions(Platform.OS);
  }, []);



  return (
    <SafeAreaProvider>
      <SafeAreaView style={[{ flex: 1 }]}>
        <StatusBar
          barStyle="dark-content"
          translucent={false}
          backgroundColor={'#007AFF'}
        />
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App;