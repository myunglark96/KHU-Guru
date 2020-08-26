import React from 'react'
import {
    View,
    Text,
    Switch,
    Image,
    TouchableOpacity,
    Button,
    StyleSheet,
    AsyncStorage,
    Alert
} from 'react-native'
import Seperator from './seperator'

export default class Students extends React.Component{
    render(){
        return (
            <>
            <TouchableOpacity onPress={this.props.move} style={{flexDirection:'row'}}>
                <View style={styles.container}>
                    <View style={styles.container_text}>
                        <Text style={styles.title}>
                            {this.props.STUDENTNAME}
                        </Text>
                        <Text style={styles.name}>
                            {this.props.STUDENTNUM}
                        </Text>
                    </View>
                    <View style={styles.container_text_left}>
                        <Text style={styles.time}>{this.props.GRADE}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Seperator/>
            </>
        )
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        //padding: 10,
        //marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        //borderRadius: 5,
        backgroundColor: '#FFF',
        //elevation: 10,
        //borderWidth:1
    },
    time:{
        flex:1,
        justifyContent:'center'
    },
    title: {
        fontSize: 16,
        paddingVertical:2,
        color: '#000',
    },
    container_text: {
        flex: 1,
        //flexDirection: 'column',
        marginLeft: 20,
        alignItems:'baseline',
    },
    container_text_left: {
        flex: 1,
        //flexDirection: 'column',
        marginRight: 12,
        alignItems:'flex-end',
    },
    name : {
        fontSize: 12,
        fontStyle: 'italic',
    },
})
