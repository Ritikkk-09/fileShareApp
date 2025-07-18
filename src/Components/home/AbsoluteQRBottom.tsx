import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { bottomTabStyles } from '../../styles/bottomTabStyle';
import Icon from '../global/icon';
import { QRScannerModal } from '..';
import { navigate } from '../../utils/NavigationUtil';

const AbsoluteQRBottom = () => {
    const [isVisible, setVisible] = useState(false);

    return (
        <View style={[bottomTabStyles.container]}>
            <Pressable onPress={() => { navigate('ReceivedFileScreen') }} style={[]}>
                <Icon name='apps-sharp' type='Ionicons' color="#333" size={24} />
            </Pressable>
            <Pressable onPress={() => { setVisible(true) }} style={[bottomTabStyles.qrCode]}>
                <Icon name='qrcode' type='fontAwesome' color="#ffffff" size={26} />
            </Pressable>
            <Pressable onPress={() => { }} style={[]}>
                <Icon name='beer-sharp' type='Ionicons' color="#333" size={24} />
            </Pressable>
            {isVisible &&
                <QRScannerModal
                    visible={isVisible}
                    onClose={() => setVisible(false)}
                />
            }
        </View>
    )
}

export default AbsoluteQRBottom