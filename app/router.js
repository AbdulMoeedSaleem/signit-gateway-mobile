import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// screens
import SignatureRequestScreen from './screens/signatureRequests';
import configurations from './constants';
import SignatureRequestDetailScreen from './screens/signatureRequestDetail';
import DocumentsScreen from './screens/documents';
const RoutesData = [
  {
    component: SignatureRequestScreen,
    name: 'Signature Requests',
    options: {title: 'Signature Requests'},
  },
  {
    component: SignatureRequestDetailScreen,
    name: 'Signature Request Detail',
    options: {title: 'Signature Request Detail'},
  },
  {
    component: DocumentsScreen,
    name: 'Documents',
    options: {title: 'Select document'},
  },
];
const Stack = createNativeStackNavigator();
const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signature Requests"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: configurations.theme.primaryColor,
          },
          headerTintColor: configurations.theme.textColorLight,
        }}>
        {RoutesData.map((screenProps, i) => (
          <Stack.Screen key={i} {...screenProps} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
