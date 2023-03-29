/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Platform,
  StyleSheet,
} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import UserScreen from './screens/UserScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDetails from './screens/UserDetails';
import { RootStackParamList } from './utils/types';

const LOCAL_SYSTEM_IP_ADDRESS = '10.0.2.2';

const client = new ApolloClient({
  uri: Platform.select({
    android: `http://${LOCAL_SYSTEM_IP_ADDRESS}:9002`,
    ios: 'http://localhost:9002/',
  }),
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator<RootStackParamList>();


function App(): JSX.Element {  
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="List" component={UserScreen} />
          <Stack.Screen name="Details" component={UserDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  });

export default App;
