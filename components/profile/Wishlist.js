import { React, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, ScrollView, SafeAreaView, Pressable, FlatList, Set, Alert } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { events } from "../../data/events-data";

const Wishlist = ({ navigation }) => {

    // const [liked, setLiked] = useState(false);
    const [selected, setSelected] = useState(events)
    const [cart, setCart] = useState([])

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
                <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.eventName}</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.date}</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.location}</Text>
                </View>
                <AntDesign name="delete" size={24} color="red" style={{ width: 20, margin: 'auto' }} onPress={() => deleteItem(item.id)} />
            </View>
            <View style={styles.itemSeparator} />
        </li>
    );

    return (

        <ScrollView scrollEnabled={false}>
            <ImageBackground source={require('../wallpaper.jpg')} style={styles.background}
                resizeMode="cover">
                <View style={{ alignItems: 'center', height: 550, backgroundColor: "black", borderRadius: 12, borderWidth: 10, opacity: 0.85, }}>
                    <Text style={{ fontSize: 16, color: 'yellow', minHeight: 30 }}>Upcoming events</Text>
                    <View style={{ borderRadius: 5, height: 250, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <ScrollView>
                            <FlatList
                                data={selected}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => {
                                    return (
                                        <Pressable onPress={() => handleOnPress(item)}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: item.isFavorite ? '#ccfff2' : 'white' }}>
                                                <MaterialIcons name="event-available" Text="event" size={48} color='#009973' />
                                                <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                                                    <Text style={{
                                                        fontSize: 16, fontWeight: item.isFavorite ? 'bold' : 'normal'
                                                    }}>{item.eventName}</Text>
                                                    <Text style={{ fontSize: 12, fontWeight: item.isFavorite ? 'bold' : 'normal' }}>{item.date}</Text>
                                                    <Text style={{ fontSize: 12, fontWeight: item.isFavorite ? 'bold' : 'normal' }}>{item.location}</Text>
                                                </View>
                                                <MaterialCommunityIcons
                                                    name={item.isFavorite ? "heart" : "heart-outline"}
                                                    size={24}
                                                    color={item.isFavorite ? "red" : "black"}
                                                />
                                            </View>
                                            <View style={styles.itemSeparator} />
                                        </Pressable>
                                    )
                                }}
                            />
                        </ScrollView>
                    </View>
                    <Text style={{ fontSize: 16, color: 'yellow', minHeight: 30 }}>My events</Text>
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
                        <FontAwesome6 name="People-group" size={30} color="black" />
                        <SimpleLineIcons name="settings" size={30} color="black" onPress={() => navigation.navigate("Settings")} />
                    </View>
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Text>Explore</Text>
                        <Text>Wishlist</Text>
                        <Text>Community</Text>
                        <Text>Settings</Text>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    );
};

export default Wishlist;

const styles = StyleSheet.create({
    itemSeparator: {
        height: 1,
        backgroundColor: 'black'
    },
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)', // Optional overlay color
    }
});