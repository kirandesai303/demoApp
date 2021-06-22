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
import { Icon, Root } from 'native-base';

const Header = (props) => {
    return (
        <>
            <View style={styles.container}>
                {props.back ?
                    <TouchableOpacity style={{ flex: 0.05, padding: 2 }} onPress={props.onBackPress}>
                        <Icon name='md-chevron-back' type='Ionicons' style={{ color: Color.White }} />
                    </TouchableOpacity> : null}
                <View style={{ flex: 0.9, alignItems: 'center' }}>
                    <Text style={{ color: Color.White, fontSize: 16 }}>{props.title}</Text>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 55, backgroundColor: Color.blue112032, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
    },

})
export default Header