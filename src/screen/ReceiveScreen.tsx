import { View, Text, Platform, SafeAreaView, ActivityIndicator, FlatList, Pressable, Image } from 'react-native'
import React, { FC, useEffect, useState } from 'react';
import { BreakText, CustomeText, Icon, QRGenerateModal } from '../Components';
import LinearGradient from "react-native-linear-gradient";
import { sendStyles } from '../styles/sendStyles';
import { Colors } from '../utils/Constants';
import { connectionStyles } from '../styles/connectionStyles';
import { formatFileSize } from '../utils/libraryHelpers';
import ReactNativeBlobUtil from 'react-native-blob-util';
import LottieView from 'lottie-react-native';
import DeviceInfo from 'react-native-device-info';
import { goBack } from '../utils/NavigationUtil';


const ReceiveScreen: FC = () => {
  const [receivedFiles, setReceivedFiles] = useState<any[]>([]);
  const [visible, setScannerVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [qrValue, setQrValue] = useState<string>('');


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
        <View style={[sendStyles.infoContainer]}>

          <Icon name="blur-on" type="MaterialCommunityIcons" color={'#fff'} size={40} />
          <CustomeText fontFamily='Okra-Bold' fontSize={15} color={'#ffffff'} style={[{ textAlign: 'center', margin: 10 }]} >Receiving from nearby devices</CustomeText>
          <CustomeText fontFamily='Okra-Medium' fontSize={12} color={'#ffffff'} style={[{ textAlign: 'center', margin: 10 }]} >Ensure your device is connected to the sender's hotspot network</CustomeText>

          <BreakText text='Or' />

          <Pressable style={[sendStyles.qrButton]} onPress={() => setScannerVisible(true)}>
            <Icon name='qrcode' type='fontAwesome' color={Colors.primary} size={16} />
            <CustomeText fontFamily='Okra-Bold' style={[{ color: Colors.primary }]} >Show QR</CustomeText>
          </Pressable>
        </View>
        <View style={[sendStyles.animationContainer]}>
          <View style={[sendStyles.lottieContainer]}>
            <LottieView
              style={sendStyles.lottie}
              source={require('../assets/animations/scan2.json')}
              autoPlay
              loop
              hardwareAccelerationAndroid
            />
          </View>
          <Image
            style={sendStyles.profileImage}
            source={require('../assets/images/profile.jpg')}
          />
        </View>
      </View>
      {visible &&
        <QRGenerateModal
          visible={visible}
          onClose={() => setScannerVisible(false)}
        />
      }
    </LinearGradient>
  )
}

export default ReceiveScreen;