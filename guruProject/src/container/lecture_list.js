import React, { Component, useState } from "react";
import {TouchableOpacity ,StyleSheet, Text, View, FlatList, ListItem, List, AsyncStorage, Alert, Button } from "react-native";

import RNPicker from "rn-modal-picker";
import Empty_lecture from '../components/empty_lecture'
import Lecture from '../components/lecture'
//import { TouchableHighlight } from "react-native-gesture-handler";

class LectureList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataSource: [],
            placeHolderText: "강의 검색",
            selectedText: this.placeHolderText
        };

    }

    componentDidMount() {
        AsyncStorage.getItem('@guruProject:state').then((state) => {
            if (state != null) {
                this.setState(JSON.parse(state));
            }
        });
        fetch('http://54.90.237.101:9000/lecture')
            .then((response) => response.json())
            .then((json) => {
                for(key in json){
                    json[key].name = json[key].SUBJECTNAME
                    delete json[key].SUBJECTNAME
                }

                this.setState({
                    dataSource : json
                })
            })
            .then(console.log(this.state.dataSource))
            .catch((error) => console.error(error))
            
    }

    _onPressButton(item){
        Alert.alert('remove')
        AsyncStorage.removeItem("@guruProject:state")
        const filteredData = this.state.data.filter(Data => Data.name != item.name)
        this.setState({
            data: filteredData
        });
    }

    saveItem = () => {
        AsyncStorage.setItem('@guruProject:state', JSON.stringify(this.state))
    }

    _renderEmpty() {
        return (
            <Empty_lecture text='No Lectures...' />
        )
    }
    _onPress(item){
        //() => this.props.navigation.navigate('Student_screen')
        Alert.alert("woeifj")
    }
    _renderItem = ({ item }) => (
        <Lecture {...item} move={() => this.props.navigation.navigate("Student_screen", item)} action={() => this._onPressButton(item)}/>
    )
    async _selectedValue(index, item) {
        const { data } = this.state
        await this.setState({
            data: data.concat({ ...item })
        });
        this.saveItem()
    }
    
    render() {
        return (
            <View style={Styles.container}>
                <RNPicker
                    dataSource={this.state.dataSource}
                    dummyDataSource={this.state.dataSource}
                    defaultValue={false}
                    pickerTitle={"강의 선택"}
                    showSearchBar={true}
                    disablePicker={false}
                    changeAnimation={"none"}
                    searchBarPlaceHolder={"검색..."}
                    showPickerTitle={true}
                    searchBarContainerStyle={this.props.searchBarContainerStyle}
                    pickerStyle={Styles.pickerStyle}
                    itemSeparatorStyle={Styles.itemSeparatorStyle}
                    pickerItemTextStyle={Styles.listTextViewStyle}
                    selectedLabel={this.state.placeHolderText}
                    placeHolderLabel={this.state.placeHolderText}
                    selectLabelTextStyle={Styles.placeHolderTextStyle}
                    placeHolderTextStyle={Styles.placeHolderTextStyle}
                    dropDownImageStyle={Styles.dropDownImageStyle}
                    selectedValue={(index, item) => this._selectedValue(index, item)}
                />
                <FlatList
                    style={{ width: "100%", paddingTop:30}}
                    data={this.state.data}
                    ListEmptyComponent={this._renderEmpty}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }

}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:'#FFFFFF'
    },
    itemSeparatorStyle: {
        height: 1,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#D3D3D3"
    },
    searchBarContainerStyle: {
        marginBottom: 10,
        flexDirection: "row",
        height: 40,
        shadowOpacity: 1.0,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 1
        },
        backgroundColor: "rgba(255,255,255,1)",
        shadowColor: "#d3d3d3",
        borderRadius: 10,
        elevation: 3,
        marginLeft: 10,
        marginRight: 10
    },

    selectLabelTextStyle: {
        color: "#000",
        textAlign: "left",
        width: "99%",
        padding: 10,
        flexDirection: "row"
    },
    placeHolderTextStyle: {
        color: "#D3D3D3",
        padding: 10,
        textAlign: "left",
        width: "99%",
        flexDirection: "row",
        fontSize: 15,
    },
    dropDownImageStyle: {
        marginLeft: 10,
        width: 10,
        height: 10,
        alignSelf: "center",
    },
    listTextViewStyle: {
        color: "#000",
        marginVertical: 10,
        flex: 0.9,
        marginLeft: 20,
        marginHorizontal: 10,
        textAlign: "left"
    },
    pickerStyle: {
        marginLeft: 18,
        elevation: 3,
        paddingRight: 25,
        marginRight: 10,
        marginBottom: 2,
        shadowOpacity: 1.0,
        shadowOffset: {
            width: 1,
            height: 1
        },
        borderWidth: 1,
        shadowRadius: 10,
        backgroundColor: "rgba(255,255,255,1)",
        shadowColor: "#d3d3d3",
        borderRadius: 5,
        flexDirection: "row",
        marginTop: 20
    }
});

export default LectureList