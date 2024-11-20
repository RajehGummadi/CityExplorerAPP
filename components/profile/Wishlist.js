import { React, useState } from "react";
import { StyleSheet, View, Text, Modal, Button, TextInput, ImageBackground, ScrollView, TouchableOpacity, SafeAreaView, Pressable, FlatList, Set, Alert } from "react-native";
import Hoverable from 'react-native-web-hover';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { events } from "../../data/events-data";

const Wishlist = ({ navigation }) => {

    // const [liked, setLiked] = useState(false);
    const [selected, setSelected] = useState(events)
    const [cart, setCart] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Function to handle item selection
    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedItem(null);
        setModalVisible(false);
    };


    const handleOnPress = (event) => {
        const newEvent = selected.map((val) => {
            if (val.id === event.id) {
                return { ...val, isFavorite: !val.isFavorite }
            }
            else {
                return val;
            }
        })
        setSelected(newEvent)

        events.forEach((product) => {
            if (!event.isFavorite) {
                if (event.id === product.id)
                    setCart([...cart.push(product)]);
                return;
            } else {
                if (event.id === product.id)
                    deleteItem(product.id);
                return;
            }
        })
        console.log(event);
        console.log(cart);
    }

    const deleteItem = (id) => {
        console.log("inside deleteItem");
        console.log("item id:" + id);
        const newItems = cart.filter(item => item.id !== id);
        setCart(newItems);
        const newEvent = selected.map((val) => {
            if (val.id === id) {
                return { ...val, isFavorite: false }
            }
            else {
                return val;
            }
        })
        setSelected(newEvent)
        // setSelected(newItems);
    }



    const cartItems = cart.map(item =>
        <li key={item.id}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                <MaterialIcons name="event-available" Text="event" size={48} color='#668cff' />
                <View style={{ flexDirection: 'column', flexWrap: 'wrap', width: 275 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.eventName}</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.date}</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.location}</Text>
                </View>
                <AntDesign name="delete" size={24} color="red" style={{ width: 40, margin: 0 }} onPress={() => deleteItem(item.id)} />
            </View>
            <View style={styles.itemSeparator} />
        </li>
    );


    return (

        <ScrollView scrollEnabled={false}>
            <ImageBackground source={require('../wallpaper.jpg')}
                resizeMode="cover">
                <View style={{ alignItems: 'center', height: 553 }}>
                    <Text style={{ fontSize: 16, color: 'white', minHeight: 30 }}>Upcoming events</Text>
                    <View style={{ width: 'auto', height: 225, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <ScrollView>
                            <FlatList
                                data={selected}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => {
                                    return (
                                        <Pressable onPress={() => handleOnPress(item)}>
                                            <View style={{ width: 'auto', flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: item.isFavorite ? '#ccfff2' : 'white' }}>
                                                <MaterialIcons name="event-available" Text="event" size={48} color='#009973' />
                                                <View style={{ flexDirection: 'column', flexWrap: 'wrap', width: 260 }}>
                                                    <Text style={{
                                                        fontSize: 16, fontWeight: item.isFavorite ? 'bold' : 'normal'
                                                    }}>{item.eventName}</Text>
                                                    <Text style={{ fontSize: 12, fontWeight: item.isFavorite ? 'bold' : 'normal' }}>{item.date}</Text>
                                                    <Text style={{ fontSize: 12, fontWeight: item.isFavorite ? 'bold' : 'normal' }}>{item.location}</Text>
                                                </View>
                                                <View style={{ width: 60, flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: item.isFavorite ? '#ccfff2' : 'white' }}>
                                                    <MaterialCommunityIcons
                                                        name={item.isFavorite ? "heart" : "heart-outline"}
                                                        size={24}
                                                        color={item.isFavorite ? "red" : "black"}
                                                    />
                                                    {/* <MaterialCommunityIcons name="magnify-plus-outline" size={30} color="black" onPress={() => handlePopup()} /> */}
                                                    <View style={styles.container}>
                                                        {/* Button to Open Popup */}
                                                        <Text style={{ color: "gray", width: '10', height: '5', fontSize: '6' }}
                                                            onPress={() => handleSelectItem(item)}
                                                        >Details..</Text>


                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.itemSeparator} />
                                        </Pressable>
                                    )
                                }}
                            />
                            {/* Popup Modal */}
                            <Modal
                                transparent={true}
                                visible={modalVisible}
                                animationType="slide"
                                onRequestClose={closeModal}
                            >
                                <View style={styles.modalBackground}>
                                    <View style={styles.modalContainer}>
                                        <Text style={styles.title}>{selectedItem?.eventName}</Text>
                                        <Text>{selectedItem?.details}</Text>

                                        {/* Close Button */}
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={closeModal}
                                        >
                                            <Text style={styles.buttonText}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </ScrollView>
                    </View>
                    <Text style={{ fontSize: 16, color: 'white', minHeight: 30 }}>My events</Text>
                    <View style={{ borderRadius: 5, height: 250, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <ScrollView>

                            <ul style={{ margin: 0, padding: 0 }}>{cartItems}</ul>

                        </ScrollView>
                    </View>
                </View>
                <View style={{
                    justifyContent: 'flex-end',
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly', flexBasis: 'auto' }}>
                        <MaterialCommunityIcons name="file-find-outline" size={30} color="black" onPress={() => navigation.navigate("CityExplorerHome")} />
                        <Feather name="heart" size={30} color="black" />
                        <FontAwesome6 name="people-group" size={30} color="black" />
                        <SimpleLineIcons name="settings" size={30} color="black" onPress={() => navigation.navigate("Settings")} />
                    </View>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Text>Explore</Text>
                        <Text>Wishlist</Text>
                        <Text>People</Text>
                        <Text>Settings</Text>
                    </View>
                </View>
            </ImageBackground >
        </ScrollView>
    );
};

export default Wishlist;

const styles = StyleSheet.create({
    itemSeparator: {
        height: 1,
        backgroundColor: 'black'
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)', // Optional overlay color
    },
    container: {
        flex: 1
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});