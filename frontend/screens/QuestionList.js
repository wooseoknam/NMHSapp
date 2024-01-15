import { useEffect, useState } from "react"
import { View, Text } from "react-native"

const QuestionList = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://192.168.0.5:8080/question/list')
        .then(response => response.json())
        .then(response => {
            setData(response);
        })
    }, []);

    return (
        <View>
            {data.map((item, index) => (
                <Text key={index} onPress={() => navigation.navigate("QuestionDetail", { id: item.id })}>{index+1}. {item.subject}</Text>
            ))}
        </View>
    )
}

export default QuestionList