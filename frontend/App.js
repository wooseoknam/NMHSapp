import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Test from './screens/Test';
import CommunityStackScreen from './screens/community/CommunityStackScreen';
import Menu from './screens/menu/Menu';
import SplashScreen from './screens/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Test"
          component={Test}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}