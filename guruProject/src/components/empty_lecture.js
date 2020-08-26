import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'

function Empty_lecture(props){
    return(
        <View style={styles.container}>
            <Image style={styles.icon} source={require('../../icons/lecture.png')}/>
            <Text style={styles.text}>{props.text}</Text>
        </View>

    )
}

const styles=StyleSheet.create({
    text:{
        fontSize:20
    },
    container:{
        alignItems:'center'
    },
    icon:{
        width:400,
        height:400,
        marginVertical:50
    },
})

export default Empty_lecture