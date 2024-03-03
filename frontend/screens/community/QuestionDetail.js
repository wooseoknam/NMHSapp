import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { Button, Modal, Text, TextInput, TouchableHighlight, View } from "react-native"
import { IP } from "../../data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuestionDetail = ({ route }) => {
    const { id } = route.params;
    const [data, setData] = useState([]);
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({
        defaultValues: {
            answer: "",
        },
    })
    const [userName, setUserName] = useState('')

    const onSubmit = async (data) => {
        const userName = await AsyncStorage.getItem('user_id')

        fetch(`http://${IP}:8080/answer/create/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                member: {"name": userName},
                content: data.answer,
            }),
        })
    }

    const onPut = () => {
        fetch(`http://${IP}:8080/question/modify/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject: "수정할 제목",
                content: "수정할 내용"
            }),
        })
    }

    const onDelete = () => {
        fetch(`http://${IP}:8080/question/delete/${id}`, {
            method: 'DELETE',
        })
    }
    
    const getUserName = async () => {
        setUserName(await AsyncStorage.getItem('user_id'))
    }

    useEffect(() => {
        getUserName()
        fetch(`http://${IP}:8080/question/detail/${id}`)
        .then(response => response.json())
        .then(response => {
            setData(response)
        })
    }, [])

    const [modalVisible, setModalVisible] = useState(false)

    const onPressButton = () => {
        setModalVisible(true)
    }

    const onPressOption = (option) => {
        console.log('Selected Option:', option)
        setModalVisible(false)
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(false);
                }}
            >
                <View>
                <View>
                    {/* 드롭다운 메뉴의 옵션들 */}
                    <TouchableHighlight onPress={() => onPressOption('Option 1')}>
                    <Text>Option 1</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => onPressOption('Option 2')}>
                    <Text>Option 2</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => onPressOption('Option 3')}>
                    <Text>Option 3</Text>
                    </TouchableHighlight>

                    <Button
                    title="Close"
                    onPress={() => {
                        setModalVisible(false);
                    }}
                    />
                </View>
                </View>
            </Modal>
            {
                data && 
                <>
                    <Text>제목: {data.subject}</Text>
                    <Text>내용: {data.content}</Text>

                    {data.answerList && data.answerList.map((item, index) => (
                        <Text key={index}>{item.content}</Text>
                    ))}

                    <Controller
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="댓글을 입력하세요."
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        )}
                        name="answer"
                    />
                    {errors.answer && <Text>댓글을 입력하세요.</Text>}

                    <Button title="답변 등록" onPress={handleSubmit(onSubmit)} disabled={!watch("answer")}/>
                    {data && data.member && data.member.name === userName &&
                        <View>
                            <Button title="글 수정" onPress={() => onPut()}></Button>
                            <Button title="글 삭제" onPress={() => onDelete()}></Button>
                        </View>
                    }
                </>
            }
        </View>
    )
}

export default QuestionDetail