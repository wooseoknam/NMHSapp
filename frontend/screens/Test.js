import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from '@rneui/base'
import { Text, View } from 'react-native'

const Test = ({ navigation }) => {
    const logOut = () => {
        try {
            AsyncStorage.clear()
            navigation.navigate('Auth')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={{marginTop: 100}}>
            <Button title={'로그아웃'} onPress={() => logOut()} />
        </View>
    )
}

export default Test