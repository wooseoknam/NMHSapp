import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native"

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
        fetch('http://172.30.1.77:8080/answer/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answer: data.answer,
            }),
        })
    }

    useEffect(() => {
        fetch(`http://172.30.1.77:8080/question/detail/${id}`)
        .then(response => response.json())
        .then(response => {
            setData(response);
        })
    }, []);

    return (
        <View>
            <Text>제목: {data.subject}</Text>
            <Text>내용: {data.content}</Text>

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
        </View>
    )
}

export default QuestionDetail