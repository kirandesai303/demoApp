import { Icon, Root } from 'native-base';
import React, { useEffect, useState } from 'react';

import {
    FlatList,
    View,
    Text
} from 'react-native';
import { Card, Header } from '../../components';
import * as API from "../../services/Api";

const Details = (props) => {
    return (
        <View style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{props.title}</Text>
            <Text>{props.description}</Text>
        </View>
    )

}
const UserDetails = ({ navigation, route }) => {
    const { userData } = route.params
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f6f8' }}>
            <Header
                back={true}
                title={userData.name}
                onBackPress={() => navigation.goBack()}
            />
            <View style={{ paddingHorizontal: 20 }}>
                <Details
                    title={'Name'}
                    description={userData.name}
                />
                <Details
                    title={'User name '}
                    description={userData.username}
                />
                <Details
                    title={'email'}
                    description={userData.email}
                />
                <Details
                    title={'Phone'}
                    description={userData.phone}
                />
                <Details
                    title={'Web-site '}
                    description={userData.website}
                />
                <Details
                    title={'Company Name '}
                    description={userData.company.name}
                />
            </View>


        </View>

    )
}
export default UserDetails