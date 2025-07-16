import { View, Text, ScrollView } from 'react-native'
import { commonStyles } from '../styles/commonStyles';
import { HomeHeader } from '../Components';
import SendReceiveButton from '../Components/home/SendReceiveButton';
import Option from '../Components/home/Option';
import Misc from '../Components/home/Misc';

function HomeScreen() {
  return (
    <View style={[commonStyles.baseContainer]}>
      <HomeHeader />
     <View>
      <ScrollView contentContainerStyle={[{paddingBottom:100, padding:15}]} showsVerticalScrollIndicator={false}>
        <SendReceiveButton />
        <Option isHome />
        <Misc />

      </ScrollView>
      </View>
    </View>
  )
}

export default HomeScreen;  