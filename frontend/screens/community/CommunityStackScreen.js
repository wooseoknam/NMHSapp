import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';
import Create from './Create';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

const CommunityStackScreen = () => {
    return (
        <>
          <Stack.Navigator>
              <Stack.Screen 
                  name="List" 
                  component={QuestionList} 
                  options={{
                      title: "남명학사 서울관",
                      headerRight: () => (
                        <Button
                          onPress={() => alert('This is a button!')}
                          title="Info"
                        />
                      ),
                  }}
              />
              <Stack.Screen 
                  name="Detail"
                  component={QuestionDetail} 
                  options={{title: '게시판'}}
              />
              <Stack.Screen 
                  name="Create" 
                  component={Create}
                  options={{
                      title: '글 쓰기'
                  }}
              />
          </Stack.Navigator>
        </>
    )
}

export default CommunityStackScreen