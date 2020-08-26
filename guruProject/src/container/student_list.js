import React, { Component, useState, useEffect } from "react";
import { Text, StyleSheet, View, FlatList, AsyncStorage, Alert } from "react-native";
import { Container, List, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, ListItem } from 'native-base'
import {Col, Row, Grid} from 'react-native-easy-grid'
import Student from '../components/students'
import Empty_lecture from '../components/empty_lecture'

export default function Student_list({ navigation, route, props }) {
    const [student_list, setStudent_list] = useState([])

    const {name} = route.params
    const {PROFESSOR} = route.params

    const _renderItem = ({ item }) => {
        console.log(item.name)
        return(
            <Student {...item} move={() => this.props.navigation.navigate("Student_screen", item)} action={() => this._onPressButton(item)}/>
        )
    }

    useEffect(() => {
        fetch('http://54.90.237.101:9000/users')
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setStudent_list(json)
            })
            .catch((error) => console.error(error))
            //.finally(() => setLoading(false));
        }, []);

    const _renderEmpty = () => {
        return (
            <Empty_lecture text='No Lectures...' />
        )
    }

    return (
        <View style={{backgroundColor:'#ffffff'}}>
            <View style={Styles.container}>
                <View style={Styles.titleContainer}>
                    <Text style={Styles.title}>{name}</Text>
                </View>
                <View style={Styles.nameContainer}>
                    <Text style={Styles.name}>{PROFESSOR}</Text>
                </View>
            </View>
            <FlatList
                //style={{ width: "100%" }}
                data={student_list}
                ListEmptyComponent={_renderEmpty}
                keyExtractor={(item, index) => index.toString()}
                renderItem={_renderItem}
            />
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        height:120,
        backgroundColor: '#FFFFFF',
    },
    title: {
        paddingTop:8,
        fontSize: 30,
    },
    name:{
        fontSize:15,
        paddingBottom:10,
        paddingRight:10     
    },
    nameContainer:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'flex-end',
        marginRight:10
    },
    titleContainer:{
        flex:2,
        alignItems:'center',
        marginTop:30
        
    }
});