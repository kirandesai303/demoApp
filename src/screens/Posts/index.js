import { Icon, Root, Toast } from 'native-base';
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
    const [userPosts, setUserPost] = useState([])
    const [usersId, setUserId] = useState()
    const { usersData } = route.params

    useEffect(() => {
        console.log('usersData__', usersData)
        setUserId(usersData.id)
        let userData = []
        API.usersPost(usersData.id)
            .then(response => {
                userData.push(response.data)
                setUserPost(userData)
            })
            .catch(error => {
                console.log(error);

            });
    }, [])

    useEffect(() => {
        let usersPost = []
        if (userPosts) {
            if (route.params.post) {
                let usersPost = [...userPosts]
                usersPost.push(route.params.post)
                setUserPost([...usersPost])
            }
        } else {
            usersPost.push(route.params.post)
            setUserPost([...usersPost])
        }

    }, [route.params.post])

    useEffect(() => {
        let userPost = [...userPosts]
        console.log('userPost____', userPost)
        let filterPostIndex = userPost.findIndex((i) => i.id == route.params.postEdit.id)
        console.log('userPost____', filterPostIndex)


        userPost[filterPostIndex] = route.params.postEdit;
        console.log('userPost____', userPost)
        setUserPost([...userPost])


    }, [route.params.postEdit])
    function addPost() {
        navigation.navigate('AddPost', { edit: false })
    }
    function ToastShow(msg) {
        Toast.show({
            text: msg,
            type: 'danger'
        })
    }
    function deletePost(id) {
        API.deletePost(id)
            .then(response => {
                let userPost = [...userPosts]
                let filterPostIndex = userPost.findIndex((i) => i.id == id)
                userPost.splice(filterPostIndex, 1)
                setUserPost(userPost)
                ToastShow('Post deleted')
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <Root>
            <View style={{ flex: 1, backgroundColor: '#f1f6f8' }}>
                <Header
                    back={true}
                    title={'User Post'}
                    onBackPress={() => navigation.goBack()}
                />
                {userPosts.length > 0 ?
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
                                            onPress={() => navigation.navigate('AddPost', { edit: true, data: item, userId: usersId })}
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
                    </View> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: Color.gray8A8A8A }}>No Post available!</Text>
                    </View>}
                <TouchableOpacity
                    onPress={() => addPost({ userId: usersId })}
                    style={styles.buttonStyle}>
                    <Text style={{ color: Color.White, fontSize: 25 }}>+</Text>
                </TouchableOpacity>
            </View>
        </Root>

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
        }, borderRadius: 3, backgroundColor: Color.White, paddingHorizontal: 10, paddingVertical: 15, marginVertical: 7
    }
})
export default Index