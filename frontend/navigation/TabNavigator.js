import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import QuestionList from "../screens/QuestionList";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Community" component={QuestionList} />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
        </Tab.Navigator>
    )
}

export default TabNavigator