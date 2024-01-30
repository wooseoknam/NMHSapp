import { Controller, useForm } from 'react-hook-form'
import { Button, Text, TextInput, View } from 'react-native'
import { IP } from '../../data'

const Create = ({ navigation }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            subject: "",
            content: "",
        },
    })

    const onSubmit = (data) => {
        fetch(`http://${IP}:8080/question/create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: data.content,
                subject: data.subject,
            }),
        }).then(
            navigation.navigate("List")
        )
    }

    return (
        <View>
            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder="제목"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
                )}
                name="subject"
            />
            {errors.subject && <Text>제목을 입력하세요.</Text>}

            <Controller
                control={control}
                rules={{
                required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    placeholder="내용을 입력하세요."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
                )}
                name="content"
            />
            {errors.content && <Text>내용을 입력하세요.</Text>}

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

export default Create