import React, { FC, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { homeHeaderStyles } from "../../styles/homeHeaderStyles";
import { commonStyles, } from "../../styles/commonStyles";
import Icon from "../global/icon";
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import { screenHeight, screenWidth, svgPath } from "../../utils/Constants";
import QRGenerateModal from "../modals/QRGenerateModal";

const HomeHeader: FC = () => {
    const [visible, setVisible] = useState(false);
    const onQrClose = () => {
        setVisible(false)
    }
    return (
        <View style={[homeHeaderStyles.mainContainer, { width: '100%', }]}>
            <SafeAreaView />
            <View style={[commonStyles.flexRowBetween, homeHeaderStyles.container, { marginTop: 40, }]}>
                <TouchableOpacity>
                    <Icon type="fontAwesome5" name="menu" size={22} />
                </TouchableOpacity>
                <Image source={require('../../assets/images/logo_t.png')} style={[homeHeaderStyles.logo]} />
                <TouchableOpacity onPress={() => setVisible(!visible)}>
                    <Image source={require('../../assets/images/profile.jpg')} style={[homeHeaderStyles.profile]} />
                </TouchableOpacity>
            </View>
            <Svg
                height={screenHeight * 0.18}
                width={screenWidth}
                viewBox='0 0 1440 220'
                style={homeHeaderStyles.curve}
            >
                <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <Stop offset={'0%'} stopColor={"#007AFF"} stopOpacity={"1"} />
                        <Stop offset={'100%'} stopColor={"#80BFFF"} stopOpacity={"1"} />
                    </LinearGradient>
                </Defs>
                <Path fill={"#80BFFF"} d={svgPath} />
                <Path fill={"url(#grad)"} d={svgPath} />
            </Svg>
            {visible && 
            <QRGenerateModal
                visible={visible}
                onClose={onQrClose}
            />}
        </View>
    )
}
export default HomeHeader;