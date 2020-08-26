import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    FlatList,
    PermissionsAndroid
} from 'react-native'
import Layout from '../components/bluetooth_list_layout'
import Empty from '../components/empty'
import Toggle from '../components/toggle'
import Subtitle from '../components/subtitle'
import Device from '../components/device'
import BluetoothSerial from 'react-native-bluetooth-serial-next'

function BluetoothList(props){
    const [list, setList] = useState([]);
    const [bolEnable, setBolEnable] = useState(false);

    const renderEmpty = () => <Empty text='No Devices'/>
    const renderItem = ({item}) => {
        return <Device {...item} iconLeft={require('../../icons/smartphone.png')} iconRight={require('../icons/smartphone.png')}/>
    }

    /*useEffect(()=>{
        async function init(){
            const enable = await BluetoothSerial.requestEnable();
            const list = await BluetoothSerial.list();
            setList(list)
            setBolEnable(enable)
            console.log(list)
        }

        init();

        return() =>{
            async function remove(){
                await BluetoothSerial.stopScanning();
                console.log("end sanner");
            }
            remove();
        }
    }, []);*/

    const enableBluetooth = async () => {
        try{
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
            .then(result => {
                if (!result) {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
                }
            });
            await BluetoothSerial.requestEnable();
            //const list = await BluetoothSerial.list();
            //const list = await BluetoothSerial.discoverUnpairedDevices();
            const list = await BluetoothSerial.listUnpaired();
            await BluetoothSerial.stopScanning();
            setBolEnable(true);
            setList(list);
            console.log(list);
        }catch(error){
            console.log(error);
        }
    };

    const disableBluetooth = async () => {
        try{
            await BluetoothSerial.disable();
            await BluetoothSerial.stopScanning();
            setBolEnable(false);
            setList([])
        }catch(error){
            console.log(error);
        }
    };

    const toggleBluetooth = value => {
        if(value){
            return enableBluetooth();
        }
        disableBluetooth();
    }

    return(
        <Layout title='Bluetooth'>
            <Toggle value={bolEnable} onValueChange={toggleBluetooth}/>
            <Subtitle title='Devices List'/>
            <FlatList
                data={list}
                ListEmptyComponent={renderEmpty}
                renderItem = {renderItem}
            />    
        </Layout>
        
    )
}

export default BluetoothList