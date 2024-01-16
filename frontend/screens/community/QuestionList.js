import { useEffect, useState } from "react"
import { View, Text, Button } from "react-native"
import { useIsFocused } from "@react-navigation/native";

const QuestionList = ({ navigation }) => {
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        fetch('http://172.30.1.77:8080/question/list')
        .then(response => response.json())
        .then(response => {
            setData(response);
        })
    }, [isFocused]);

    return (
        <View>
            {data.map((item, index) => (
                <Text key={index} onPress={() => navigation.navigate("Detail", { id: item.id })}>{index+1}. {item.subject}</Text>
            ))}
            <Button title="글 작성" onPress={() => navigation.navigate("Create")}/>
        </View>
    )
}

export default QuestionList