import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { Color } from '../helper';



const Card = (props) => {
    return (
        <>
            <View style={styles.cardContainer}>
                <View style={styles.leftView}>
                    <Text style={{ fontSize: 18, color: Color.black292929, fontWeight: 'bold' }}>{`${props.name}(${props.Username})`} </Text>
                    <Text style={styles.compname}>{props.companyName}</Text>
                    <Text style={styles.compname}>{props.phoneNumber}</Text>
                </View>
                <View style={styles.rightView}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={props.button1onPress}>
                        <Text style={styles.texStyle}>{props.button1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonStyle, { marginTop: 5 }]} onPress={props.button2onPress}>
                        <Text style={styles.texStyle}>{props.button2}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    cardContainer: {
        width: '100%', elevation: 3, shadowColor: Color.Black,
        shadowRadius: 4,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2
        }, backgroundColor: Color.White, borderRadius: 5, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10, marginVertical: 7
    },
    leftView: {
        width: '75%', justifyContent: 'center'
    },
    rightView: {
        width: '25%'
    },
    buttonStyle: {
        paddingVertical: 10, backgroundColor: Color.sky1E8FCE, borderRadius: 10, alignItems: 'center'
    },
    texStyle: {
        color: Color.White
    },
    compname: {
        fontSize: 12,
        color: Color.gray8A8A8A
    }


})
export default Card