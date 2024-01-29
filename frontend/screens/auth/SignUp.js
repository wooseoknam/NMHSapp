import React, {useState, createRef} from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// import Loader from './Components/Loader';

const SignUp = (props) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
    ] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            content: "",
        },
    })

    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const addressInputRef = createRef();
    const passwordInputRef = createRef();

    const onSubmit = (data) => {
        fetch('http://192.168.0.5:8080/member/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: 'a@na.com',
                password: 'asdf'
            }),
        })
        .then((res) => {
            if (res.ok === true) {
                setIsRegistraionSuccess(true);
            }
        })
    };

    if (isRegistraionSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={require('../banner_01.jpg')}
                    style={{
                        height: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                />
                <Text style={styles.successTextStyle}>
                Registration Successful
                </Text>
                <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate('LoginScreen')}>
                <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
        {/* <Loader loading={loading} /> */}
        <ScrollView
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
                            onSubmitEditing={() =>
                                emailInputRef.current && emailInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                            value={value}
                        />
                    )}
                    name='name'
                />
            </View>
            <View style={styles.SectionStyle}>
                <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                underlineColorAndroid="#f000"
                placeholder="이메일"
                placeholderTextColor="#8b9cb5"
                keyboardType="email-address"
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
                />
            </View>
            <View style={styles.SectionStyle}>
                <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                    setUserPassword(UserPassword)
                }
                underlineColorAndroid="#f000"
                placeholder="비밀번호"
                placeholderTextColor="#8b9cb5"
                ref={passwordInputRef}
                returnKeyType="next"
                secureTextEntry={true}
                onSubmitEditing={() =>
                    ageInputRef.current &&
                    ageInputRef.current.focus()
                }
                blurOnSubmit={false}
                />
            </View>
            {errortext != '' ? (
                <Text style={styles.errorTextStyle}>
                {errortext}
                </Text>
            ) : null}
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonTextStyle}>회원가입</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScrollView>
        </View>
    );
};
export default SignUp;

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
    // color: '#FFFFFF',
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
    // color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    // color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});