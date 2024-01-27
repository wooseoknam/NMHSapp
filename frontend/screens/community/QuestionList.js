import { useEffect, useState } from "react"
import { Button, Dimensions, ScrollView, View, Text, TouchableOpacity } from "react-native"
import { useIsFocused } from "@react-navigation/native";
import { Icon, ListItem } from "@rneui/themed";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const QuestionList = ({ navigation }) => {
    const [data, setData] = useState([]);
    const isFocused = useIsFocused();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        fetch('http://192.168.0.5:8080/question/list')
        .then(response => response.json())
        .then(response => {
            setData(response);
        })
    }, [isFocused]);

    return (
        <View style={ { flex: 1 } }>
            <ScrollView>
                {data.map((l, i) => (
                    <ListItem 
                        key={i} 
                        bottomDivider
                        onPress={() => navigation.navigate("Detail", { id: l.id })}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{l.subject}</ListItem.Title>
                            <ListItem.Subtitle>{l.content} {l.answerList.length}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
            <View style={ {
                position: 'absolute',
                top: Dimensions.get('window').height / 1.4,
                left: Dimensions.get('window').width / 1.5
            } }>
                <TouchableOpacity
                    style={{
                    backgroundColor: 'blue',
                    padding: 10,
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate("Create")}
                >
                    <Icon name="add-circle-outline" type="ionicon" color="white" size={24} />
                    <Text style={{ color: 'white', marginLeft: 10 }}>글 쓰기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default QuestionList