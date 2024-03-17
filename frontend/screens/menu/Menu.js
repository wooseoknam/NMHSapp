import { useEffect, useState } from "react"
import { View, TouchableOpacity } from "react-native"
import Checkbox from 'expo-checkbox'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { IP } from "../../data"
import { DataTable, Text } from "react-native-paper"
import moment from "moment"

const Menu = ({ navigation }) => {
    // const [userRole, setUserRole] = useState('')
    // const [voteResult, setVoteResult] = useState([])
    const [userName, setUserName] = useState('')
    const [voteCount, setVoteCount] = useState()

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

    // const gerUserRole = async () => {
    //     setUserRole(await AsyncStorage.getItem('role'))
    // }

    const getUserName = async () => {
        setUserName(await AsyncStorage.getItem('user_id'))
    }

    useEffect(() => {   
        // gerUserRole()
        getUserName()
    }, [])

    // useEffect(() => {
    //     fetch(`http://${IP}:8080/vote/result`)
    //     .then((res) => res.json())
    //     .then((res) => {
    //         setVoteResult(res)
    //     })
    // }, [])

    useEffect(() => {
        fetch(`http://${IP}:8080/vote/count`)
        .then((res) => res.json())
        .then((res) => setVoteCount(res))
    }, [])

    const currentDate = moment()

    const nextMonday = currentDate.clone().day(8).format('YYYY-MM-DD')

    const nextSunday = currentDate.clone().day(14).format('YYYY-MM-DD')

    return (
        <>
            { userName !== 'test' &&
                <View style={{ flex: 1, alignItems: 'center', paddingTop: 180 }}>
                    <Text>다음주 식사 일정</Text>
                    <View style={{ flex: 1, marginVertical: 20 }}>
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
                            marginBottom: 50
                        }}
                        onPress={handleVote}
                    >
                        <Text style={{ color: 'white' }}>제출하기</Text>
                    </TouchableOpacity>
                </View>
            }

            { userName === 'test' && voteCount && 
                <View style={{ flex: 1, paddingTop: 180 }}>
                    <Text variant="headlineMedium" style={{ paddingBottom: 20, paddingLeft: 50 }}>{nextMonday} ~ {nextSunday}</Text>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>요일</DataTable.Title>
                            <DataTable.Title numeric>조식</DataTable.Title>
                            <DataTable.Title numeric>중식</DataTable.Title>
                            <DataTable.Title numeric>석식</DataTable.Title>
                        </DataTable.Header>

                        {voteCount.map((item, idx) => (
                            <DataTable.Row key={idx}>
                                <DataTable.Cell>{item.day}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.breakFast}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.lunch}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.dinner}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
                </View>
            }
        </>
    )
}

export default Menu