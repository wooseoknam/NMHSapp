import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Test from './screens/Test';
import CommunityStackScreen from './screens/community/CommunityStackScreen';
import Menu from './screens/menu/Menu';
import SplashScreen from './screens/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/auth/SignIn';
import SignUp from './screens/auth/SignUp';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Community" component={CommunityStackScreen} />
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Test" component={Test} />
    </Tab.Navigator>
  )
}

const Auth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    // <NavigationContainer>
    //   <Tab.Navigator screenOptions={{ headerShown: false }}>
    //     <Tab.Screen name="Community" component={CommunityStackScreen} />
    //     <Tab.Screen name="Menu" component={Menu} />
    //     <Tab.Screen name="Test" component={Test} />
    //     <Tab.Screen name="Splash" component={SplashScreen} />
    //   </Tab.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}} />
        <Stack.Screen name="MainTab" component={MainTabScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}