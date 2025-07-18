import { View, Text, Platform, SafeAreaView, ActivityIndicator, FlatList, Pressable } from 'react-native'
import React, { FC, useEffect, useState } from 'react';
import RNFS from 'react-native-fs'
import { CustomeText, Icon } from '../Components';
import LinearGradient from "react-native-linear-gradient";
import { sendStyles } from '../styles/sendStyles';
import { Colors } from '../utils/Constants';
import { connectionStyles } from '../styles/connectionStyles';
import { formatFileSize } from '../utils/libraryHelpers';
import ReactNativeBlobUtil from 'react-native-blob-util'
import { goBack } from '../utils/NavigationUtil';


const ReceivedFileScreen: FC = () => {
  const [receivedFiles, setReceivedFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getFilesFromDirectory()
  }, [])

  const getFilesFromDirectory = async () => {
    setLoading(true);
    const platformPath = Platform.OS === 'android' ?
      `${RNFS.DownloadDirectoryPath}` :
      `${RNFS.DownloadDirectoryPath}`

    try {
      const exists = await RNFS.exists(platformPath);
      if (!exists) {
        setReceivedFiles([])
        setLoading(false);
        return;
      }

      const files = await RNFS.readDir(platformPath);
      const formattedFiles = files.map(file => ({
        id: file.name,
        name: file.name,
        size: file.size,
        uri: file.path,
        mimeType: file.name.split('.').pop() || 'unknown',
      }))

      setReceivedFiles(formattedFiles);

    } catch (error) {
      console.error('error fetching files', error)
      setReceivedFiles([])
    } finally {
      setLoading(false)
    }
  }

  const renderThumbnail = (mimeType: string) => {
    switch (mimeType) {
      case 'mp3':
        return <Icon name="musical-notes" size={16} color='blue' type="Ionicons" />;
      case 'mp3':
        return <Icon name="videocam" size={16} color='green' type="Ionicons" />;
      case 'mp3':
        return <Icon name="image" size={16} color='blue' type="Ionicons" />;
      case 'mp3':
        return <Icon name="document" size={16} color='red' type="Ionicons" />;
      default:
        return <Icon name="folder" size={16} color='gray' type="Ionicons" />;
    }
  }

  const handleOpenClick = (item: any) => {
    const normalizedPath = Platform.OS === 'ios' ? `file://${item?.uri}` : item?.uri;
    if (Platform.OS === 'ios') {
      ReactNativeBlobUtil.ios
        .openDocument(normalizedPath)
        .then(() => console.log('File opened successfully'))
        .catch(err => console.log('Error opening file: ', err))
    } else {
      ReactNativeBlobUtil.android
        .actionViewIntent(normalizedPath, '*/*')
        .then(() => console.log('File opened successfully'))
        .catch(err => console.log('Error opening file: ', err))
    }
  }

  const renderItem = ({ item, index }: any) => (
    <View style={[connectionStyles.fileItem]}>
      <View style={[connectionStyles.fileInfoContainer]}>
        {renderThumbnail(item?.mimeType)}
        <View style={[connectionStyles.fileDetails]}>
          <CustomeText numberOfLines={1} fontFamily='Okra-Bold' fontSize={10}>
            {item?.name}
          </CustomeText>
          <CustomeText numberOfLines={1} fontFamily='Okra-Medium' fontSize={8}>
            {item?.mimeType} . {formatFileSize(item?.size)}
          </CustomeText>
        </View>
        <Pressable onPress={handleOpenClick} style={[connectionStyles.openButton]}>
          <CustomeText numberOfLines={1} fontFamily='Okra-Bold' fontSize={9} color='#ffffff'>
            Open
          </CustomeText>
        </Pressable>
      </View>
    </View>
  )

  return (
    <LinearGradient colors={['#ffffff', '#CDDAEE', '#8DBAFF']}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={[sendStyles.container]}
    >
      <SafeAreaView />

      <View style={[sendStyles.mainContainer]}>
        <Pressable onPress={goBack} style={[sendStyles.backButton]}>
          <Icon name="arrow-back" size={16} type="Ionicons" color={Colors.primary} />
        </Pressable>
        <CustomeText fontFamily='Okra-Bold' fontSize={15} color={'#ffffff'} style={[{ textAlign: 'center', margin: 10 }]} >All Received Files</CustomeText>
        {loading ? <ActivityIndicator
          size={'small'}
          color={Colors.primary}
          style={{ alignSelf: 'center' }}
        /> :
          <View>
            <FlatList
              data={receivedFiles}
              keyExtractor={item => item?.id}
              renderItem={renderItem}
              ListEmptyComponent={
                <View style={connectionStyles.noDataContainer}>
                  <CustomeText numberOfLines={1} fontFamily='Okra-Medium' fontSize={12}>NO Files received yet.</CustomeText>
                </View>
              }
              contentContainerStyle={connectionStyles.fileList}
            />
          </View>
        }
      </View>
    </LinearGradient>
  )
}

export default ReceivedFileScreen;