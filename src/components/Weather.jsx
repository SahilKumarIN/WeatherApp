import { Image, Linking, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'



export default function Weather() {



    const [isCelsius, setIsCelsius] = useState(true);
    const [inputTxt, setInputTxt] = useState("");
    const [data, setData] = useState({
        status: false,
        data: {}
    });

    const handleCelsius = () => {
        setIsCelsius(!isCelsius)
    }

    const getData = async (inputTxt) => {
        try {

            const resp = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${inputTxt}`, {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': '431a83f16cmshc1c8504e4f64fabp1a6fc3jsn58010b788785',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            })

            if (resp.status === 200) {
                const dataJSON = await resp.json()
                setData({ status: true, data: dataJSON })
            } else {
                throw new Error("There was an error with code " + resp.status)
            }

        } catch (error) {
            setData({ status: false, data: "Oops! Looks like a problem !\nPlease Try Again !!!" })
        }
    }

    useEffect(() => {
        const state = "India"
        getData(state)
    }, [])




    return (
        <>
            {data.status ?
                <View>
                    <View style={styles.weatherDegree}>
                        <View style={styles.dateTimeContainer}>
                            <Text style={styles.dateTimeTxt}>{data.data.location.localtime}</Text>
                            <Text style={styles.timezone}>{data.data.location.tz_id}</Text>

                        </View>
                        <View style={styles.locationContainer}>
                            <Text style={styles.countryTxt}>🗺️ {data.data.location.country}</Text>
                            <Text style={styles.locationTxt}>📍{data.data.location.name + "," + data.data.location.region}</Text>
                        </View>
                        <View style={styles.weatherContainer}>
                            <Text style={styles.weatherDegreeTxt}>{isCelsius ? data.data.current.temp_c : data.data.current.temp_f}</Text>
                            <Text style={styles.weatherDegreeIcon}>{isCelsius ? "℃" : "℉"}</Text>
                            <View >
                                <Image
                                    source={{
                                        uri: "https:" + data.data.current.condition.icon
                                    }}
                                    style={styles.weatherLogo}
                                />
                                <Text style={styles.conditionTxt}>{data.data.current.condition.text}</Text>
                            </View>
                        </View>
                    </View>
                    <View key="humidity" style={styles.othersContainer}>
                        <View style={styles.otherDetailsContainer}>
                            {/* Humidity Container */}
                            <Text style={styles.otherDetailsText}>{data.data.current.humidity}</Text>
                            <Text style={styles.otherDetailsTextFooter}>Humidity</Text>
                        </View>

                        <View key="feels_like" style={styles.otherDetailsContainer}>
                            {/* Feels Like */}
                            <Text style={styles.otherDetailsText}>{isCelsius ? data.data.current.feelslike_c + "℃" : data.data.current.feelslike_f + "℉"}</Text>
                            <Text style={styles.otherDetailsTextFooter}>Feels Like</Text>
                        </View>

                        <View key="cloud" style={styles.otherDetailsContainer}>
                            {/* Cloud */}
                            <Text style={styles.otherDetailsText}>{data.data.current.cloud}</Text>
                            <Text style={styles.otherDetailsTextFooter}>Cloud</Text>
                        </View>
                    </View>

                    <View style={styles.SearchContainer}>
                        <TextInput
                            placeholder='enter location'
                            placeholderTextColor="white"
                            style={styles.inputTxt}
                            value={inputTxt}
                            onChangeText={text => setInputTxt(text)}
                        />
                        <Pressable
                            onPress={() => getData(inputTxt)}
                        >
                            <View style={styles.searchBtnContainer}>
                                <Text style={styles.searchBtnTxt}>🔍 Search</Text>
                            </View>
                        </Pressable>

                    </View>
                    <View style={styles.chkDegree}>
                        <Pressable
                            onPress={handleCelsius}
                        >
                            <View style={[isCelsius ? styles.btnSelected : styles.btn]}>
                                <Text style={[isCelsius ? styles.btnTxtSelected : styles.btnTxt]}>Celsius</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={handleCelsius}
                        >
                            <View style={[styles.btn, isCelsius ? styles.btn : styles.btnSelected]}>
                                <Text style={[isCelsius ? styles.btnTxt : styles.btnTxtSelected]}>Fahrenheit</Text>
                            </View>
                        </Pressable>
                    </View>

                </View>
                :
                <View style={styles.error}>
                    <Text style={styles.errorTxt}>There was some problem getting weather data ! 😞</Text>
                    <View style={styles.SearchContainer}>
                        <TextInput
                            placeholder='enter location'
                            placeholderTextColor="white"
                            style={styles.inputTxt}
                            value={inputTxt}
                            onChangeText={text => setInputTxt(text)}
                        />
                        <Pressable
                            onPress={() => getData(inputTxt)}
                        >
                            <View style={styles.searchBtnContainer}>
                                <Text style={styles.searchBtnTxt}>🔍 Search</Text>
                            </View>
                        </Pressable>

                    </View>

                </View>


            }
            <View
                style={{
                    alignSelf: 'center',
                    width:'80%',
                    height: '100',
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent: 'center'
                 }} 
                onPress={() => Linking.openURL("https://www.weatherapi.com/")}>
                <Text style={{textAlign: 'center' , color: 'black'}}>Powered by</Text>
                <Image
                    source={{
                        uri: 'https://cdn.weatherapi.com/v4/images/weatherapi_logo.png'
                    }}
                    style={{
                        width: 100,
                        height: 50,
                        aspectRatio: 16/6,
                        alignSelf: 'center'
                    }}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    weatherDegree: {
        backgroundColor: '#dadada',
        height: '60%',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateTimeContainer: {
        marginTop: -40
    },
    dateTimeTxt: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#283593',
        textAlign: 'center'
    },
    timezone: {
        color: 'gray',
        fontWeight: 'bold',
    },
    locationContainer: {
        alignSelf: 'flex-end',
        marginHorizontal: 20
    },
    locationTxt: {
        fontWeight: 'bold',
        fontSize: 18
    },
    countryTxt: {
        fontWeight: 'bold',
        fontSize: 16
    },
    weatherContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    weatherDegreeTxt: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'black'
    },
    weatherDegreeIcon: {
        fontWeight: 'bold',
        fontSize: 50,
        alignSelf: 'flex-start',
        color: 'black'
    },
    weatherLogo: {
        width: 128,
        height: 128
    },
    conditionTxt: {
        textAlign: 'center',
        marginTop: -15,
        color: 'black'
    },
    othersContainer: {
        width: '80%',
        height: 80,
        backgroundColor: 'white',
        borderRadius: 16,
        alignSelf: 'center',
        marginTop: -40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    SearchContainer: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 20
    },
    inputTxt: {
        width: '60%',
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        color: 'white',
        fontSize: 18,
        fontWeight: '800'
    },
    searchBtnContainer: {
        backgroundColor: '#ffffff',
        padding: 10,
        width: 100,
        borderRadius: 10,

    },
    searchBtnTxt: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    },
    otherDetailsContainer: {
        // width: '25%',
        height: '90%',
        borderRadius: 12,
        padding: 8
    },
    otherDetailsText: {
        fontSize: 30,
        fontWeight: '900',
        fontFamily: 'cursive',
        color: 'black',
        textAlign: 'center'
    },
    otherDetailsTextFooter: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center'
    },
    chkDegree: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    btn: {
        backgroundColor: '#ffcdd2',
        padding: 16,
        borderRadius: 10
    },
    btnTxt: {
        textAlign: 'center',
        color: '#c62828',
        fontWeight: '900',
        fontSize: 16
    },
    btnSelected: {
        backgroundColor: '#c8e6c9',
        padding: 16,
        borderRadius: 10
    },
    btnTxtSelected: {
        textAlign: 'center',
        color: '#2e7d32',
        fontWeight: '900',
        fontSize: 16
    },
    error: {
        backgroundColor: '#ffcdd2',
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginVertical: 100,
        alignSelf: 'center',
        width: '85%',
        borderRadius: 14
    },
    errorTxt: {
        color: '#c62828',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    }
})