import React from 'react';
import 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Dashboard } from '../screens/Dashboard';
import { ReserveSpot } from '../screens/ReserveSpot';
import { WaitingSpot } from '../screens/WaitingSpot';
import { CurrentSpot } from '../screens/CurrentSpot';
import { EndFlow } from '../screens/EndFlow';
import { OldTravel } from '../screens/OldTravel';
import { Setup } from '../screens/Setup';
import { ChangePassword } from '../screens/ChangePassword';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){
  const theme = useTheme();

  return(
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        headerShown: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88
        }
      }}
    >
      <Screen
        name="Vagas"
        component={MainStackNavigator}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="maps-ugc"
              size={size}
              color={color}
            />
          ))
        }}
      />

      <Screen
        name="Viagens"
        component={OldTravelNavigator}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="card-travel"
              size={size}
              color={color}
            />
          ))
        }}
      />

      <Screen
        name="Config."
        component={ConfigNavigator}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="settings"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </Navigator>
  );
	
}

const Stack = createStackNavigator();

const screenOptionStyle = {
   headerShown: false,
};


const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Dashboard} />
      <Stack.Screen name="Reserve" component={ReserveSpot} />
      <Stack.Screen name="WaitingSpot" component={WaitingSpot} />
      <Stack.Screen name="CurrentSpot" component={CurrentSpot} />
      <Stack.Screen name="EndFlow" component={EndFlow} />
    </Stack.Navigator>
  );
}

const OldTravelNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="OldTravel" component={OldTravel} />
    </Stack.Navigator>
  );
}

const ConfigNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Setup" component={Setup} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, OldTravelNavigator, ConfigNavigator };