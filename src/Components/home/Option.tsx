import React, { FC } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { optionStyles } from "../../styles/optionsStyles";
import Icon from "../global/icon";
import { Colors } from "../../utils/Constants";
import CustomText from "../global/CustomeText";

interface OptionProps {
    isHome?: boolean,
    onMediaPickedUp?: () => void;
    onFilePickedUp?: () => void;
}

const Option: FC<OptionProps> = ({ isHome, onFilePickedUp, onMediaPickedUp }) => {


    return (
        <View style={[optionStyles.container]}>
            <TouchableOpacity>
                <Icon name="images" type="Ionicons" color={Colors.primary} />
                <CustomText fontFamily="Okra-Medium"
                    style={[{ marginTop: 4, textAlign: 'center' }]}>Photo</CustomText>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="folder-open" type="Ionicons" color={Colors.primary} />
                <CustomText fontFamily="Okra-Medium"
                    style={[{ marginTop: 4, textAlign: 'center' }]}>Files</CustomText>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="musical-notes-sharp" type="Ionicons" color={Colors.primary} />
                <CustomText fontFamily="Okra-Medium"
                    style={[{ marginTop: 4, textAlign: 'center' }]}>Audio</CustomText>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name="contacts" type="MaterialCommunityIcons" color={Colors.primary} />
                <CustomText fontFamily="Okra-Medium"
                    style={[{ marginTop: 4, textAlign: 'center' }]}>Contacts</CustomText>
            </TouchableOpacity>
        </View>
    )
}

export default Option;