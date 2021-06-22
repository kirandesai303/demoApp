import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { Header } from '../../components/index';
import { Color } from '../../helper';
import * as API from '../../services/Api';
import { Toast, Root } from "native-base";



const AddUser = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);

    useEffect(() => {
        if (route.params.edit) {
            const { edit, data } = route.params
            if (edit) {
                setTitle(data.title)
                setBody(data.body)
            }
        }
    }, [])
    function ToastShow(msg) {
        Toast.show({
            text: msg,
            type: 'danger'
        })
    }
    function createPost() {
        if (!title) {
            ToastShow('Please enter Post title')
        } else {
            var regex = /^[A-Za-z0-9 ]+$/
            if (body && regex.test(body)) {
                const data = {
                    userId: route.params.userId,
                    title: title,
                    body: body,
                };
                API.addPost(data)
                    .then(response => {
                        alert('Post added')

                    })
                    .catch(error => {
                        console.log(error);

                    });
            } else {
                ToastShow('Please enter Post description, not allowed special character')
            }
        }
    }
    function editPost() {
        const data = {
            id: 1,
            userId: route.params.userId,
            title: title,
            body: body,
        };
        API.updatePost(data, route.params.data.id)
            .then(response => {
                console.log('response__', response)
                alert('Post Updated')

            })
            .catch(error => {
                console.log(error);

            });
    }
    return (
        <Root>
            <SafeAreaView >
                <View style={{ flex: 1 }}>
                    <Header
                        back={true}
                        title={'Create new post'}
                        onBackPress={() => navigation.goBack()}
                    />
                    <View style={{ paddingHorizontal: 15 }}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Enter Post title"
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                            KeyBoardType={'default'}
                        />
                        <TextInput
                            style={[styles.textInputStyle, { height: 120, alignItems: 'flex-start' }]}
                            placeholder="Enter Post description"
                            value={body}
                            onChangeText={text => setBody(text)}
                            KeyBoardType={'default'}
                            numberOfLines={5}
                            multiline={true}
                        />
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => { route.params.edit ? editPost() : createPost() }} >
                            <Text style={{ color: Color.White }}>Add Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Root>
    );
}
const styles = StyleSheet.create({
    textInputStyle: {
        borderWidth: 1, height: 45, marginTop: 10, paddingLeft: 10, borderColor: Color.gray8A8A8A, borderRadius: 5
    },
    buttonStyle: {
        width: '100%', backgroundColor: Color.sky1E8FCE, height: 45, marginTop: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center'
    }
})
export default AddUser;
