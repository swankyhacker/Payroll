import React from 'react'
import { Text, View, StyleSheet, Image, Linking, Platform,Alert } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { Title, Card, Button } from 'react-native-paper'
import { MaterialIcons, Entypo } from '@expo/vector-icons'

// import {PROXY_URL} from '../@env'
import config from '../config'


function Profile(props) {

    const {_id,name,position,email,salary,phone,picture} = props.route.params.item

    function getPhone(number){
        if (Platform.OS === 'android'){
            Linking.openURL(`tel:${number}`)
        }
        else{
            Linking.openURL(`telprompt:${number}`)
        }
    }

    function deleteEmployee(){
        fetch(`${config.PROXY_URL}/delete`,{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:_id
            })            
        }).then(res => res.json()).then(employee => {
            Alert.alert(`${employee.name} was deleted.`)
            props.navigation.navigate('Home')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <View style={styles.root}>

            <LinearGradient colors={['#0033ff', '#6bc1ff']} style={{ height: '20%' }} />

            <View style={{ alignItems: 'center', marginTop: -70 }}>
                <Image
                    style={{ width: 140, height: 140, borderRadius: 70 }}
                    source={{ uri: picture}} />
            </View>

            <View style={{ alignItems: 'center',marginBottom:20 }}>
                <Title style={{ textTransform: 'capitalize', fontSize: 22 }}> {name} </Title>
                <Text style={{ textTransform: 'capitalize', fontSize: 16 }}> {position} </Text>
            </View>

            <Card style={styles.myCard} onPress={() => Linking.openURL(`mailto:${email}`)}>
                <View style={styles.cardContent}>
                    <MaterialIcons name='email' size={32} color='#006aff'></MaterialIcons>
                    <Text style={styles.text}>{email}</Text>
                </View>
            </Card>

            <Card style={styles.myCard} onPress={() => getPhone(phone)}>
                <View style={styles.cardContent}>
                    <Entypo name='phone' size={32} color='#006aff'></Entypo>
                    <Text style={styles.text}>{phone}</Text>
                </View>
            </Card>

            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name='attach-money' size={32} color='#006aff'></MaterialIcons>
                    <Text style={styles.text}>{salary} (per annum)</Text>
                </View>
            </Card>
        
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:40}} >
                <Button style={styles.button} icon='account-edit' mode='contained' color='#006aff' onPress={() => props.navigation.navigate('Create',{_id,name,position,email,salary,phone,picture})}>Edit</Button>
                <Button style={styles.button} icon='delete' mode='contained' color='#006aff' onPress={() => deleteEmployee()}>Delete</Button>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    myCard: {
        margin: 5,
        marginLeft:15,
        marginRight:15
        // marginTop:25
    },
    cardContent: {
        flexDirection: 'row',
        padding: 12
    },
    text: {
        fontSize: 18,
        marginLeft: 10,
        textAlignVertical: 'center'
    },
    button:{
        padding:5,
        width:120
    }
})

export default Profile