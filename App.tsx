import { View, Text, Platform } from 'react-native'
import { requestPhotoPermission } from './src/utils/Constants';
import { checkFilePermissions } from './src/utils/libraryHelpers';
import { useEffect } from 'react';
import Navigation from './src/navigation/Navigation';

 function App() {
  
  useEffect(() => {
    requestPhotoPermission();
    checkFilePermissions(Platform.OS);
  }, []);



  return <Navigation />
} 

export default App;