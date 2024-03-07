import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from '@rneui/base'
import { useEffect } from 'react'
import { View } from 'react-native'
import { IP } from '../data'

const Test = ({ navigation }) => {
    const logOut = () => {
        try {
            AsyncStorage.clear()
            navigation.navigate('Auth')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetch(`http://${IP}:8080/info`)
        .then((res) => res.json())
        .then((res) => console.log(res))
    }, [])

    return (
        <View style={{marginTop: 100}}>
            <Button title={'로그아웃'} onPress={() => logOut()} />
        </View>
    )
}

export default Test