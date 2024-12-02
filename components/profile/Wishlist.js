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

const Wishlist = ({ navigation, route }) => {

    // const [liked, setLiked] = useState(false);
    const { userName, userToken } = route.params; // Retrieve the username passed from Login
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
                <View style={{ flexDirection: 'column', flexWrap: 'wrap', width: 'auto' }}>
                    <Text style={{ width: 225, fontSize: 16, fontWeight: 'bold' }}>{item.eventName}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.date}  </Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.time}</Text>
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.location}</Text>
                </View>
                <AntDesign name="delete" size={24} color="red" style={{ width: 30, margin: 20 }} onPress={() => deleteItem(item.id)} />
            </View>
            <View style={styles.itemSeparator} />
        </li>
    );


    return (
        <View style={styles.container}>
            <ImageBackground
                //source={require('../wallpaper.jpg')}
                source={{ uri: 'https://example.com/your-image.jpg' }}
                resizeMode="cover">
                <View style={styles.overlay} />
                <ScrollView scrollEnabled={false}>


                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <Text style={{ fontSize: 16, color: 'white', minHeight: 30, textAlign: 'center' }}>Upcoming events</Text>
                        <View style={{ width: 'auto', height: 225, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                            <ScrollView >
                                <FlatList
                                    data={selected}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => {
                                        return (
                                            <Pressable onPress={() => handleOnPress(item)}>
                                                <View style={{ width: 'auto', flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: item.isFavorite ? '#ccfff2' : 'white' }}>
                                                    <MaterialIcons name="event-available" Text="event" size={48} color='#009973' />
                                                    <View style={{ flexDirection: 'column', flexWrap: 'wrap', width: 225 }}>
                                                        <Text style={{
                                                            fontSize: 16, fontWeight: item.isFavorite ? 'bold' : 'normal'
                                                        }}>{item.eventName}</Text>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                                                            <Text style={{ fontSize: 12, fontWeight: item.isFavorite ? 'bold' : 'normal' }}>{item.date}  </Text>
                                                            <Text style={{ fontSize: 12, fontWeight: item.isFavorite ? 'bold' : 'normal' }}>{item.time}</Text>
                                                        </View>
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
                        <Text style={{ fontSize: 16, color: 'white', minHeight: 30, textAlign: 'center' }}>My events</Text>
                        <View style={{ borderRadius: 5, height: 225, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                            <ScrollView>

                                <ul style={{ margin: 0, padding: 0, width: 'auto' }}>{cartItems}</ul>

                            </ScrollView>
                        </View>

                    </ScrollView>
                    {/* <View style={{
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
                        <Text>Community</Text>
                        <Text>Settings</Text>
                    </View>
                </View> */}


                </ScrollView>

            </ImageBackground >
            <View style={styles.bottomNavContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("CityExplorerHome", { userName, userToken })} style={styles.navItem}>
                    <MaterialCommunityIcons name="file-find-outline" size={30} color="black" />
                    <Text style={styles.navText}>Explore</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Wishlist", { userName, userToken })} style={styles.navItem}>
                    <Feather name="heart" size={30} color="black" />
                    <Text style={styles.navText}>Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("community", { userName, userToken })} style={styles.navItem}>
                    <FontAwesome6 name="people-group" size={30} color="black" />
                    <Text style={styles.navText}>Community</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Settings", { userName, userToken })} style={styles.navItem}>
                    <SimpleLineIcons name="settings" size={30} color="black" />
                    <Text style={styles.navText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Wishlist;

const styles = StyleSheet.create({
    itemSeparator: {
        height: 1,
        backgroundColor: 'black'
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        paddingBottom: 100, // Extra space for the bottom navigation
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 2,
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
        elevation: 5, // Adds shadow for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // Adds shadow for iOS
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        scrollEnabled: false
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
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: 'black',
        marginTop: 4,
    },
});