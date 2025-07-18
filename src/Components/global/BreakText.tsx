import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { CustomeText } from '..'

const BreakText: FC<{ text: string }> = ({ text }) => {
    return (
        <View style={[styles.breakContainer]}>
            <View style={[styles.horizontalLine]} />
            <CustomeText style={styles.breakText} fontFamily='Okra-Medium' fontSize={12}>
                {text}
            </CustomeText>
            <View style={[styles.horizontalLine]} />
        </View>
    )
}

const styles = StyleSheet.create({
    breakContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        width: '80%'
    },
    horizontalLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#fff'
    },
    breakText: {
        marginHorizontal: 10,
        color: '#fff',
        opacity: 0.8,
        textAlign: 'center'
    }
})

export default BreakText