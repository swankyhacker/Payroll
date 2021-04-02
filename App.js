import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'

import Home from './screens/Home.js'
import CreateEmployee from './screens/createEmployee.js'
import Profile from './screens/profile.js'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

function App() {

  const options = {
    home: {
      title: 'Home',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#006aff'
      }
    }
  }

  return (
    <View style={styles.container}>

      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={options.home} />
        <Stack.Screen name='Create' component={CreateEmployee} options={{...options.home,title:'Create Employee'}} />
        <Stack.Screen name='Profile' component={Profile} options={{...options.home,title:'Profile'}} />
      </Stack.Navigator>
      {/* <Home/> */}
      {/* <CreateWaifu/> */}
      {/* <Profile /> */}
      <StatusBar style="auto" />
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
    marginTop: Constants.statusBarHeight,
    // flexDirection: 'row', 
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
