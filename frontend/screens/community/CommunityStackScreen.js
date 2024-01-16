import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';
import Create from './Create';

const Stack = createNativeStackNavigator();

const CommunityStackScreen = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="List" component={QuestionList} />
            <Stack.Screen name="Detail" component={QuestionDetail} />
            <Stack.Screen name="Create" component={Create} />
        </Stack.Navigator>
    )
}

export default CommunityStackScreen