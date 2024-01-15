import { useEffect, useState } from "react"
import { Text, View } from "react-native"

const QuestionDetail = ({ route }) => {
    const { id } = route.params;
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://192.168.0.5:8080/question/detail/${id}`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setData(response);
        })
    }, []);

    return (
        <View>
            <Text>제목: {data.subject}</Text>
            <Text>내용: {data.content}</Text>
        </View>
    )
}

export default QuestionDetail