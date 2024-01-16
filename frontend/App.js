import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Test from './screens/Test';
import CommunityStackScreen from './screens/community/CommunityStackScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Community" component={CommunityStackScreen} />
        <Tab.Screen name="Test" component={Test} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}