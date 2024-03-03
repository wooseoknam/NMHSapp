import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuestionList from './QuestionList';
import QuestionDetail from './QuestionDetail';
import Create from './Create';
import { Button, View } from 'react-native';
import { Tooltip } from '@rneui/themed';
import ModalDropdown from 'react-native-modal-dropdown';

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
                options={{
                    title: '게시판',
                    headerRight: () => (
                        // <ControlledTooltip
                        //     containerStyle={{ }}
                        //     popover={
                        //         <View>
                        //             <TouchableHighlight>
                        //                 <Text>Option 1</Text>
                        //             </TouchableHighlight>
                        //             <Divider />

                        //             <TouchableHighlight>
                        //                 <Text>Option 2</Text>
                        //             </TouchableHighlight>
                        //             <Divider/>

                        //             <TouchableHighlight>
                        //                 <Text>Option 3</Text>
                        //             </TouchableHighlight>
                        //         </View>
                        //     }
                        //     borderColor={'red'}
                        // >
                        //     <Text>...</Text>
                        // </ControlledTooltip>
                        <ModalDropdown options={['option 1', 'option 2']}/>
                    )
                }}
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