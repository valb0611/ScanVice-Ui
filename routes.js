import React, { createContext, useEffect, useState, useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

import AboutUs from './layouts/main/aboutUs';
import Map from './layouts/employer/map';

import SignUpMain from './layouts/main/signUpMain';
import SignupEmployee from './layouts/account/signUpEmployee';
import SignupEmployer from './layouts/account/signUpEmployer';

import LogInEmployee from './layouts/account/loginEmployee';
import LogInEmployer from './layouts/account/logInEmployer';
import LogInMain from './layouts/main/logInMain';

import EmployerMain from './layouts/main/employerMain'; 
import EmployeeMain from './layouts/main/employeeMain';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Search from './layouts/employer/search';

import EmployerProfile from './layouts/employer/employerProfile';
import EmployeeProfileEmployer from './layouts/employer/employeeProfileEmployer';

import ProfileScreen from './layouts/employee/employeeProfile';
import FacturasScreen from './layouts/employer/billsEmployer';
import EmployeeProfile from './layouts/employee/employeeProfile';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={Map} />
      {/* Elimina la pantalla de Chat si no se utiliza */}
      {/* <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} /> */}
      {/* Puedes añadir más pantallas si es necesario */}
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor="#03045E"
      inactiveColor="black"
      barStyle={{ backgroundColor: '#D9D9D9' }}
    >
      <Tab.Screen
        name="Home"
        component={MyStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-heart" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Map}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-marker-check-outline" size={24} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AboutUs">
      <Stack.Screen name='AboutUs' component={AboutUs} />
      <Stack.Screen name='SignUpMain' component={SignUpMain} />
      <Stack.Screen name='LogInMain' component={LogInMain} />
      <Stack.Screen name='LogInEmployer' component={LogInEmployer} />
      <Stack.Screen name='LogInEmployee' component={LogInEmployee} />
      <Stack.Screen name='SignUpEmployer' component={SignupEmployer} />
      <Stack.Screen name='SignUpEmployee' component={SignupEmployee} />
      <Stack.Screen name='EmployerMain' component={EmployerMain} />
      <Stack.Screen name='EmployeeMain' component={EmployeeMain} />
      <Stack.Screen name='Map' component={Map} />
      <Stack.Screen name='Search' component={Search} />
      <Stack.Screen name="UserProfile" component={EmployerProfile} />
      <Stack.Screen name="EmployeeProfile" component={EmployeeProfileEmployer} />
      <Stack.Screen name="EmployeeProfileEmployee" component={ProfileScreen} />
      <Stack.Screen name="FacturasScreen" component={FacturasScreen} />
      <Stack.Screen name="UserEmployeeProfile" component={EmployeeProfile} />
      <Stack.Screen name="EmployeeProfileDetail" component={EmployeeProfile} />
    </Stack.Navigator>
  );
}

// Eliminamos el contexto de autenticación ya que no usaremos Firebase
function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulación de un usuario autenticado
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Aquí podrías verificar la autenticación de otra manera si es necesario
    // Por ahora, simulamos que no hay usuario autenticado
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MyTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function Navigation() {
  return (
    <RootNavigator />
  );
}
