import { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import Checkbox from 'expo-checkbox'
import AsyncStorage from "@react-native-async-storage/async-storage"

const Menu = () => {
    const daysOfWeek = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']

    const [selectedMeals, setSelectedMeals] = useState({})
  
    const toggleCheckbox = (day, mealTime) => {
        const updatedMeals = { ...selectedMeals }
    
        if (!updatedMeals[day]) {
            updatedMeals[day] = []
        }
    
        const index = updatedMeals[day].indexOf(mealTime)
  
        if (index === -1) {
            updatedMeals[day].push(mealTime)
        } else {
            updatedMeals[day].splice(index, 1)
        }

        setSelectedMeals(updatedMeals)
    }
  
    const handleVote = async () => {
        console.log('선택된 식사 시간:', selectedMeals)
        console.log(await AsyncStorage.getItem('user_id'))
    }
  
    return (
        <View style={{ flex: 1, alignItems: 'center', marginVertical: 100 }}>
            <Text>다음주 식사 일정 선택 화면</Text>
            <ScrollView style={{ flex: 1, marginVertical: 50 }}>
                {daysOfWeek.map((day) => (
                    <View key={day} style={{ marginVertical: 10 }}>
                        <Text>{day}</Text>
                        <View style={{ flexDirection: 'row' }}>
                        {['아침', '점심', '저녁'].map((mealTime) => (
                            <View key={mealTime} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Checkbox
                                    value={selectedMeals[day]?.includes(mealTime)}
                                    onValueChange={() => toggleCheckbox(day, mealTime)}
                                />
                                <Text>{mealTime}</Text>
                            </View>
                        ))}
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={{
                    padding: 10,
                    backgroundColor: 'blue',
                    borderRadius: 5,
                }}
                onPress={handleVote}
            >
                <Text style={{ color: 'white' }}>투표하기</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Menu