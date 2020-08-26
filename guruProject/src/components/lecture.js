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

export default class Lecture extends React.Component{
    render(){
        return (
            <>
            <TouchableOpacity onPress={this.props.move} style={{flexDirection:'row'}}>
                <View style={styles.container}>
                    <View style={styles.container_text}>
                        <Text style={styles.title}>
                            {this.props.name}
                        </Text>
                        <Text style={styles.name}>
                            {this.props.PROFESSOR}
                        </Text>
                    </View>
                    <View style={styles.container_text_left}>
                        <Text style={styles.time}>{this.props.DAYTIME}</Text>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Button 
                            color="#000000" 
                            title="DEL"
                            onPress={this.props.action}
                        />
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
        fontSize:14,
    },
    title: {
        paddingVertical:4,
        fontSize: 18,
        color: '#000',
    },
    container_text: {
        flex: 1,
        //flexDirection: 'column',
        marginLeft: 12,
        alignItems:'baseline',
    },
    container_text_left: {
        flex: 1.5,
        justifyContent:'flex-end',
        marginLeft:10
        //flexDirection: 'column',
        //borderWidth:1

    },
    name : {
        fontSize: 13,
        fontStyle: 'italic',
    },
})
