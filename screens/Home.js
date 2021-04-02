import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, FlatList, Alert } from 'react-native'
import { Card, FAB } from 'react-native-paper'
// import {PROXY_URL} from '../@env'
import config from '../config'


function Home(props) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    function fetchData(){
            fetch(`${config.PROXY_URL}/`).then(res => res.json()).then(results => {
                setData(results)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                Alert.alert('Something went wrong. Please try again later')
            })        
    }
    
    useEffect(() => fetchData(), [])


    return (
        <View style={{ flex: 1 }}>
            {/* <ActivityIndicator size='large' color='#0000ff'/>                 */}
                <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Card style={styles.card} key={item.name} onPress={() => props.navigation.navigate('Profile', { item })}>
                        <View style={{ flexDirection: 'row' }}>

                            <Image style={styles.image} source={{ uri: item.picture }} />

                            <View style={{ marginLeft: 8 }}>
                                <Text style={styles.text}> {item.name} </Text>
                                <Text style={styles.text} style={{ fontSize: 14, marginTop: 5 }}> {item.position} </Text>
                            </View>

                        </View>
                    </Card>
                )}
            keyExtractor={item => item._id} onRefresh={fetchData} refreshing={loading} />
            

            <FAB style={styles.fab} small={false} icon='plus' theme={{ colors: { accent: '#006aff' } }} onPress={() => props.navigation.navigate('Create')} />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 5,
        padding: 10,
        // border:'2px solid red'
    },
    image: {
        padding: 10,
        width: 70,
        height: 70,
        borderRadius: 50
    },
    text: {
        fontSize: 17,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }

})

export default Home