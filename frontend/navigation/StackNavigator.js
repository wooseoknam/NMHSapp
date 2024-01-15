import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionList from '../screens/QuestionList';
import QuestionDetail from '../screens/QuestionDetail';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="QuestionList" component={QuestionList} />
            <Stack.Screen name="QuestionDetail" component={QuestionDetail} />
        </Stack.Navigator>
    )
}

export default StackNavigator