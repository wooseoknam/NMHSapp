import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, View, Text, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { IP } from '../../data';

const SignUp = ({ navigation }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: '',
            password: ''
        },
    })

    const onSubmit = (data) => {
        fetch(`http://${IP}:8080/member/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password
            }),
        })
        .then((res) => {
            if (res.ok === true) {
                console.log("회원가입 성공")
                navigation.navigate("SignIn")
            } else {
                alert("이미 존재하는 아이디입니다.")
            }
        })
    }

    return (
        <View style={{flex: 1}}>
            <View
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                justifyContent: 'center',
                alignContent: 'center',
                }}>
                <View style={{alignItems: 'center'}}>
                    <Image
                        source={require('../banner_01.jpg')}
                        style={{
                        width: '50%',
                        height: 100,
                        resizeMode: 'contain',
                        margin: 30,
                        }}
                    />
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            rules={{required: true}}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    underlineColorAndroid="#f000"
                                    placeholder="이름"
                                    placeholderTextColor="#8b9cb5"
                                    autoCapitalize="sentences"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    value={value}
                                />
                            )}
                            name='name'
                        />
                    </View>
                    {errors.name && <Text>             이름을 입력해주세요.</Text>}
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            rules={{required: true}}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    underlineColorAndroid="#f000"
                                    placeholder="이메일"
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    value={value}
                                />
                            )}
                            name='email'
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <Controller
                            control={control}
                            rules={{required: true}}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="비밀번호"
                                    style={styles.inputStyle}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    secureTextEntry={true}
                                    value={value}
                                    underlineColorAndroid="#f000"
                                    placeholderTextColor="#8b9cb5"
                                />
                            )}
                            name='password'
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.buttonTextStyle}>회원가입</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}
export default SignUp

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    successTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    }
})