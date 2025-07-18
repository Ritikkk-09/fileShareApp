import { View, Text, ScrollView } from 'react-native'
import { commonStyles } from '../styles/commonStyles';
import { HomeHeader } from '../Components';
import SendReceiveButton from '../Components/home/SendReceiveButton';
import Option from '../Components/home/Option';
import Misc from '../Components/home/Misc';
import AbsoluteQRBottom from '../Components/home/AbsoluteQRBottom';

function HomeScreen() {
  return (
    <View style={[commonStyles.baseContainer]}>
      <HomeHeader />
      <ScrollView contentContainerStyle={[{ paddingBottom: 100, padding: 15 }]} showsVerticalScrollIndicator={false}>
        <SendReceiveButton />
        <Option isHome />
        <Misc />

      </ScrollView>
      <AbsoluteQRBottom />
    </View>
  )
}

export default HomeScreen;  