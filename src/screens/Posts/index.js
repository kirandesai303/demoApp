import { Icon, Root } from 'native-base';
import React, { useEffect, useState } from 'react';

import {
    FlatList,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Card, Header } from '../../components';
import { Color } from '../../helper';
import * as API from "../../services/Api";

const Index = ({ navigation, route }) => {
    const [userPosts, setUserPost] = useState()
    const [usersId, setUserId] = useState()

    const { usersData } = route.params
    useEffect(() => {
        console.log('usersData__', usersData)
        setUserId(usersData.id)
        let userData = []
        API.usersPost(usersData.id)
            .then(response => {
                console.log('response__', response)
                userData.push(response.data)
                console.log('data___', userData)
                setUserPost(userData)
            })
            .catch(error => {
                console.log(error);

            });
    }, [])

    function addPost() {
        navigation.navigate('AddPost', { edit: false })
    }
    function deletePost(id) {
        API.deletePost(id)
            .then(response => {
                alert('Post deleted')
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f6f8' }}>
            <Header
                back={true}
                title={'User Post'}
                onBackPress={() => navigation.goBack()}
            />

            <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                <FlatList
                    bounces={false}
                    data={userPosts}
                    contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 60 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                        <View style={styles.cardContaine}>
                            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                            <Text style={{ top: 3 }}>{item.body}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, }}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('AddPost', { edit: true, data: item })}
                                    style={styles.actionButton}>
                                    <Text style={styles.textStyle}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton} onPress={() => deletePost(item.id)}>
                                    <Text style={styles.textStyle}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                />
            </View>
            <TouchableOpacity
                onPress={() => addPost({ userId: usersId })}
                style={styles.buttonStyle}>
                <Text style={{ color: Color.White, fontSize: 25 }}>+</Text>
            </TouchableOpacity>
        </View>

    )
}
const styles = StyleSheet.create({
    buttonStyle: {
        position: 'absolute', right: 30, justifyContent: 'center', alignItems: 'center', bottom: 20, elevation: 10, backgroundColor: Color.blue112032, height: 55, width: 55, borderRadius: 55 / 2
    },
    actionButton: {
        paddingHorizontal: 10, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: Color.sky1E8FCE, width: '20%'
    },
    textStyle: {
        color: Color.White
    },
    cardContaine: {
        elevation: 5, shadowColor: Color.Black,
        shadowRadius: 4,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2
        }, borderRadius: 3, backgroundColor: Color.White, paddingHorizontal: 10, paddingVertical: 15
    }
})
export default Index