import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import UserList from "../screens/Users/UserList";
import UserDetails from "../screens/Users/UserDetails";
import Post from "../screens/Posts/index";
import AddPost from "../screens/Posts/AddPost";
const Stack = createStackNavigator();
const Index = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'UserList'} headerMode={'none'}>
                <Stack.Screen name="UserList" component={UserList} />
                <Stack.Screen name="UserDetails" component={UserDetails} />
                <Stack.Screen name="Post" component={Post} />
                <Stack.Screen name="AddPost" component={AddPost} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Index;