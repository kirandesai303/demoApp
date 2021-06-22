import { Icon, Root } from 'native-base';
import React, { useEffect, useState } from 'react';

import {
    FlatList,
    View,
    ActivityIndicator
} from 'react-native';
import { Card, Header } from '../../components';
import { Color } from '../../helper';
import * as API from "../../services/Api";

const UserList = ({ navigation }) => {
    const [userList, setUserList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        API.userData()
            .then(response => {
                setUserList(response.data)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error);

            });
    }, [])
    if (loading)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={Color.sky1E8FCE} />
            </View>
        )
    else
        return (
            <View style={{ flex: 1, backgroundColor: '#f1f6f8' }}>
                <Header
                    // back={true}
                    title={'Users'}
                />
                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                    <FlatList
                        bounces={false}
                        data={userList}
                        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 60 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) =>
                            <Card
                                name={item.name}
                                Username={item.username}
                                companyName={item.company.name}
                                phoneNumber={item.phone}
                                button1='View'
                                button2='Post'
                                button1onPress={() => navigation.navigate('UserDetails', { userData: item })}
                                button2onPress={() => { navigation.navigate('Post', { usersData: item }) }}
                            />
                        }
                    />
                </View>


            </View>

        )
}
export default UserList