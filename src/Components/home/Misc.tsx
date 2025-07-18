import React, { FC } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import { CustomeText } from "..";
import { commonStyles } from "../../styles/commonStyles";

const Misc: FC = () => {

    return (
        <View>
            <CustomeText fontSize={13} fontFamily="Okra-Bold">Expolre</CustomeText>
            <Image
                source={require('../../assets/icons/adbanner.png')}
                style={[styles.adBanner]}
            />
            <View style={[commonStyles.flexRowBetween]}>
                <CustomeText fontFamily="Okra-Bold" style={styles.text} fontSize={22}>My First File Share App</CustomeText>
                <Image
                    source={require('../../assets/icons/share_logo.jpg')}
                    style={[styles.image]}
                />
            </View>
            <CustomeText fontFamily="Okra-Bold" style={styles.text2}>Made by Ritik with help of Ritik </CustomeText>
        </View>
    )
}

export default Misc;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20
    },
    adBanner: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        marginVertical: 25,
        borderRadius: 8
    },
    text: {
        opacity: 0.5,
        width: '60%'
    },
    text2: {
        opacity: 0.5,
        marginTop: 10
    },
    image: {
        resizeMode: 'contain',
        height: 120,
        width: '35%'
    }
})