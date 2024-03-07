import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native"
import { IP } from "../../data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card, ListItem } from "@rneui/themed";

const QuestionDetail = ({ route }) => {
    const { id } = route.params
    const [data, setData] = useState([])
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

    return (
        <View>
            {
                data && 
                <>
                    <Card>
                        <Card.Title>{data.subject}</Card.Title>
                        <Card.Divider />
                        <Text>{data.content}</Text>  
                    </Card>

                    <Card>
                        {data.answerList && data.answerList.map((item, index) => (
                            <ListItem key={index}>
                                <ListItem.Content>
                                    <ListItem.Title>{`익명${index+1}`}</ListItem.Title>
                                    <ListItem.Subtitle>{item.content}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </Card>

                    <Card>
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
                    </Card>

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