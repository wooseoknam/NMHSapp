import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native"
import { IP } from "../../data";

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
    });

    const onSubmit = (data) => {
        fetch(`http://${IP}:8080/answer/create/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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

    useEffect(() => {
        fetch(`http://${IP}:8080/question/detail/${id}`)
        .then(response => response.json())
        .then(response => {
            setData(response);
        })
    }, []);

    return (
        <View>
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
            <Button title="글 수정" onPress={() => onPut()}></Button>
            <Button title="글 삭제" onPress={() => onDelete()}></Button>
        </View>
    )
}

export default QuestionDetail