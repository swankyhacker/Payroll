import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { useEffect } from 'react/cjs/react.development'

// import {PROXY_URL, CLOUD_URL} from '../@env'
import config from '../config'

function CreateEmployee({ navigation,route }) {
       
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [salary, setSalary] = useState('')
    const [phone, setPhone] = useState('')
    const [picture, setPicture] = useState('')
    const [position, setPosition] = useState('')
    const [modal, setModal] = useState(false)

    useEffect(() => {
        if (route.params){
            const {_id,name,position,email,salary,phone,picture} = route.params
            setName(name)
            setEmail(email)
            setSalary(salary)
            setPhone(phone)
            setPosition(position)
            setPicture(picture)
        }
    },[])

    function submitData() {
        fetch(`${config.PROXY_URL}/send-data`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, salary, phone, picture, position })
        }).then(res => res.json()).then(data => {
            console.log(data,config.PROXY_URL)
            Alert.alert(`${data.name} is now rollin'`)
            navigation.navigate('Home')
        }).catch(err => {
            console.log(err)
        })
    }

    async function pickFromGallery() {
        const { granted } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            })
            if (!data.cancelled) {
                let newFile = {
                    uri: data.uri,
                    type: `test/${data.uri.split('.').pop()}`,
                    name: `test.${data.uri.split('.').pop()}`
                }
                handleUpload(newFile)
            }
        }
        else {
            Alert.alert('Allow permissions to upload images from your device')
        }
    }

    async function pickFromCamera() {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            })
            if (!data.cancelled) {
                let newFile = {
                    uri: data.uri,
                    type: `test/${data.uri.split('.').pop()}`,
                    name: `test.${data.uri.split('.').pop()}`
                }
                handleUpload(newFile)
            }
        }
        else {
            Alert.alert('Allow permissions to upload images from your device')
        }
    }

    function handleUpload(image) {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'Payroll')
        data.append('cloud_name', `${config.CLOUD_PIN}`)

        fetch(`${config.CLOUD_URL}`, {
            method: 'post',
            body: data
        }).then(res => res.json()).then(data => {
            console.log(data)
            setPicture(data.url)
            setModal(false)
        })
    }

    function handleUpdate(){
        const {_id} = route.params
        fetch(`${config.PROXY_URL}/update`,{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:_id,name,position,email,salary,phone,picture
            })
        }).then(res => res.json()).then(info => {
            Alert.alert(`${info.name} was updated`)
            navigation.navigate('Home')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <View style={styles.root}>
                <TextInput label='Name' style={styles.inputStyle} theme={theme} value={name} onChangeText={text => setName(text)} mode='outlined' />
                <TextInput label='Email' style={styles.inputStyle} theme={theme} value={email} onChangeText={text => setEmail(text)} mode='outlined' />
                <TextInput label='Phone No.' style={styles.inputStyle} keyboardType='number-pad' theme={theme} value={phone} onChangeText={text => setPhone(text)} mode='outlined' />
                <TextInput label='Salary' style={styles.inputStyle} keyboardType='number-pad' theme={theme} value={salary} onChangeText={text => setSalary(text)} mode='outlined' />
                <TextInput label='Position' style={styles.inputStyle} theme={theme} value={position} onChangeText={text => setPosition(text)} mode='outlined' />

                <Button style={{ margin: 5 }} icon={picture === '' ? 'upload' : 'check'} theme={theme} mode='contained' onPress={() => setModal(true)} >
                    Upload
                </Button>
                { route.params ?
                <Button icon='content-save' theme={theme} mode='contained' style={{ margin: 5 }} onPress={() => handleUpdate()} >
                    Update
                </Button> :
                <Button icon='content-save' theme={theme} mode='contained' style={{ margin: 5 }} onPress={() => submitData()} >
                    Save
                </Button> }
                <Modal animationType='slide' transparent={true} visible={modal} onRequestClose={() => setModal(false)}>
                    <View style={styles.modalView}>
                        <View style={styles.modalButtons}>
                            <Button icon='image-area' theme={theme} mode='contained' onPress={() => pickFromGallery()} >
                                Gallery
                    </Button>
                            <Button icon='camera' theme={theme} mode='contained' onPress={() => pickFromCamera()} >
                                Camera
                    </Button>
                        </View>
                        <Button theme={theme} onPress={() => setModal(false)} >
                            Cancel
                    </Button>
                    </View>
                </Modal>
        </View>
    )
}

const theme = {
    colors: {
        primary: '#006aff'
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        margin: 5
    },
    inputStyle: {
        margin: 5
    },
    modalView: {
        position: 'absolute',
        bottom: 5,
        width: '100%',
        backgroundColor: '#ffffff'
    },
    modalButtons: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})

export default CreateEmployee