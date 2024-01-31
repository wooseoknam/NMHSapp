import { useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import Checkbox from 'expo-checkbox'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { IP } from "../../data"

const Menu = ({ navigation }) => {
    const daysOfWeek = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']

    const [selectedMeals, setSelectedMeals] = useState([])
  
    const toggleCheckbox = (day, time) => {
        const idx = 3*day+time
        const isChecked = selectedMeals.includes(idx)

        if (isChecked) {
            setSelectedMeals((prev) => prev.filter((el) => el !== idx));
        } else {
            setSelectedMeals((prev) => [...prev, idx]);
        }
    }
  
    const handleVote = async () => {
        const name = await AsyncStorage.getItem('user_id')
        const dayOfWeekArray = selectedMeals
        const resultArray = dayOfWeekArray.map((dayOfWeek) => ({
            name: name,
            dayOfWeek: dayOfWeek
        }))

        fetch(`http://${IP}:8080/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(resultArray)
        })
        .then((res) => {
            if (res.ok) {
                navigation.navigate('List')
            }
        })
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', marginVertical: 100 }}>
            <Text>다음주 식사 일정</Text>
            <View style={{ flex: 1, marginVertical: 50 }}>
                {daysOfWeek.map((day, idx1) => (
                    <View key={day} style={{ marginVertical: 10 }}>
                        <Text>{day}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {['아침', '점심', '저녁'].map((mealTime, idx2) => (
                                <View key={mealTime} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Checkbox
                                        value={selectedMeals.includes(3*idx1+idx2)}
                                        onValueChange={() => toggleCheckbox(idx1, idx2)}
                                    />
                                    <Text>{mealTime}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>

            <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: 'blue',
                    borderRadius: 5,
                }}
                onPress={handleVote}
            >
                <Text style={{ color: 'white' }}>제출하기</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Menu