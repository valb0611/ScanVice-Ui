import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import { Entypo, FontAwesome } from '@expo/vector-icons'; // Importamos FontAwesome para las estrellas
import colors from '../../colors';
import iconmenu from '../../assets/images/iconmenu.png';

export default function EmployerMain({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
        PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsBlack: require("../../assets/fonts/Poppins-Black.ttf"),
    });

    const [empleados, setEmpleados] = useState([]);
    const [favoritos, setFavoritos] = useState([]);

    const usuarioRegistrado = route.params.usuarioRegistrado?.[0];

    useEffect(() => {
        async function fetchEmpleados() {
            try {
                const response = await axios.get("http://192.168.100.14:8080/api/empleado");
                setEmpleados(response.data);
            } catch (error) {
                console.log('Error al obtener empleados:', error);
            }
        }
        fetchEmpleados();
    }, []);

    useEffect(() => {
        if (usuarioRegistrado) {
            fetchFavoritos();
            
        }
    }, [usuarioRegistrado]);

    const fetchFavoritos = async () => {
        try {
            const empleadosResponse = await axios.get("http://192.168.100.14:8080/api/empleado");

            if (usuarioRegistrado && usuarioRegistrado.empleadosFavoritos) {
                const empleadosFavoritos = empleadosResponse.data.filter(empleado =>
                    usuarioRegistrado.empleadosFavoritos.includes(empleado._id.toString())
                );
                setFavoritos(empleadosFavoritos);
            } else {
                setFavoritos([]);
            }
        } catch (error) {
            console.error('Error al obtener empleados favoritos:', error);
        }
    };

    const handleRemoveFavorito = async (empleadoId) => {
        if (!usuarioRegistrado || !usuarioRegistrado._id) {
            console.log('No se pudo eliminar el favorito: Usuario no registrado.');
            return;
        }

        try {
            const response = await axios.delete("http://192.168.100.14:8080/api/empleador/removeFavorito", {
                data: {
                    item_id: usuarioRegistrado._id,
                    empleado_id: empleadoId,
                },
            });

            if (response.status === 200) {
                setFavoritos((prevFavoritos) => prevFavoritos.filter((empleado) => empleado._id !== empleadoId));
            }
        } catch (error) {
            console.error('Error al intentar eliminar el favorito:', error.message || error);
        }
    };

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, []);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    const handleNavigate = (screen, params) => {
        navigation.navigate(screen, params);
    };

    const renderStars = (calificaciones) => {
        if (!calificaciones || calificaciones.length === 0) {
            return <Text style={styles.cardText}>Sin calificación</Text>;
        }

        const promedio = calificaciones.reduce((acc, cal) => acc + cal, 0) / calificaciones.length;
        const estrellas = [];

        for (let i = 1; i <= 5; i++) {
            estrellas.push(
                <FontAwesome
                    key={i}
                    name={i <= promedio ? "star" : "star-o"}
                    size={18}
                    color="#FFD700"
                    style={{ marginRight: 2 }}
                />
            );
        }

        return estrellas;
    };

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.navBar} onLayout={onLayout}>
                    <Text style={styles.secondTitleNav}> ScanVice </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Map")} style={styles.chatButton}>
                        <Entypo name="map" size={24} color={colors.lightGray} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate("Search", { usuarioRegistrado })} style={styles.chatButton}>
                        <Entypo name="magnifying-glass" size={24} color={colors.lightGray} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("UserProfile", { usuarioRegistrado })} style={styles.chatButton}>
                        <Entypo name="user" size={24} color={colors.lightGray} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("FacturasScreen", { usuarioRegistrado })} style={styles.chatButton}>
                        <Entypo name="credit" size={24} color={colors.lightGray} />
                    </TouchableOpacity>
                </View>

                <View style={styles.container} onLayout={onLayout}>
                    <Text style={styles.mainTitle}>Tus Favoritos</Text>
                </View>

                <View style={styles.cardsContainer}>
                    {favoritos.map((empleado) => (
                        <View key={empleado._id} style={styles.card}>
                            <Text style={styles.cardTitle}>{empleado.nombre} {empleado.apellidos}</Text>
                            <Text style={styles.cardText}>{capitalizeFirstLetter(empleado.profesion)}</Text>
                            <Text style={styles.cardText}>Tarifa: ₡{empleado.tarifa}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center',textAlign: "center" }}>
                                {renderStars(empleado.calificaciones)}
                            </View>
                            <View style={styles.fourthContainer}>

                            <TouchableOpacity
                                style={styles.profileButton}
                                onPress={() => handleNavigate('EmployeeProfile', { empleado, usuarioRegistrado })}
                            >
                                <Text style={styles.profileButtonText}>Ver Perfil Completo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => handleRemoveFavorito(empleado._id)}
                            >
                                <Text style={styles.removeButtonText}>Eliminar de Favoritos</Text>
                            </TouchableOpacity>

                            </View>

                           
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({  
    favoriteButton: {
      fontSize: 14,
      color: "#03045E",
      marginTop: 10,
      textAlign: 'center',
      width:"40%"
    },
    fourthContainer: {
        
        height: 70,
        margin: "auto",
        borderRadius: 25,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    removeButton: {
        
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width:"40%",
      marginHorizontal: 10,


  },
  removeButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'PoppinsSemiBold',
     

  },
    profileButton: {
        marginTop: 10,
        backgroundColor: '#03045E',
        borderRadius:5,
        padding: 10,
        width:"40%",
        

    },
    profileButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'PoppinsSemiBold',
    },
    favoritosContainer: {
      padding: 20,
      marginTop: 20,
    },
    icons:{
        width:60,
        height:60,
        margin:"auto"
    },
    icons2:{
        width:300,
        height:200,
        margin: "auto",
        marginTop:0
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    
    secondContainer:{
        width:'80%',
        backgroundColor: "#D9D9D9",
        height: 250,
        margin:"auto",
        borderRadius: 25,
        marginTop:20,
    },
    buttonContainer: {
      display:"flex",
      height: 60,
      flexDirection:"row",
      margin:"auto"
    },
    chatButton: {
     margin:"auto"
    },
    button1:{
        width: 100,
        height:100,
        borderRadius:50,
        justifyContent:"center",
        margin:"auto",
        display: "flex",
        backgroundColor: "#D9D9D9",
        
    },
    button2:{
        width: 329,
        height:50,
        borderBottomRightRadius:25,
        borderBottomLeftRadius:25,
        justifyContent:"center",
        margin:"auto",
        display: "flex",
        backgroundColor: "#03045E",
        
    },
    buttonText:{
        margin:"auto",
        color:"#D9D9D9",
        fontFamily:"PoppinsSemiBold",
    },
    displayText:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%', 
        paddingHorizontal: 20,
    },
    mainTitle: {
      marginTop:20,
      fontWeight: "600",
      fontSize:50,
      color:"#03045E",
      fontFamily:"PoppinsBold",
      marginBottom:0,
    },
    secondTitle:{
      fontWeight: "600",
      fontSize:30,
      color:"#03045E",
      textAlign:"center",
      marginTop:20,
      fontFamily:"PoppinsSemiBold",
      
    },
    
    secondMainText:{
      fontWeight: "400",
      fontSize:15,
      textAlign:"center",
      width:270,
      color:"#03045E",
      margin:"auto",
      marginTop:20,
      fontFamily:"PoppinsSemiBold"
      },
    mainText:{
      fontWeight: "600",
      fontSize:18,
      color:"#03045E",
      
       fontFamily:"PoppinsSemiBold"
    },
    secondText:{
      fontWeight: "400",
      fontSize:13,
      textAlign:"center",
      width:220,
      color:"#03045E",
      margin:"auto",
      marginTop:0,
      fontFamily:"PoppinsSemiBold"
    },
    navBar:{
      justifyContent: "center",
      display: "flex",
      height:60,
      marginTop: 30,
      fontFamily:"PoppinsSemiBold",
  
    },
    secondTitleNav:{
      fontWeight: "600",
      fontSize:30,
      color:"#03045E",
      fontFamily:"PoppinsSemiBold",
      
    },
    menu:{
      width: 30,
      height:30
    },
    mh:{
      justifyContent: "flex-end",
    },
    sv:{
      
      marginLeft: 0,
      fontWeight: "800",
      fontSize:25,
      fontFamily:"PoppinsSemiBold",
      color:"#03045E",
      
      },

  cardsContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#F6F7FB",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#03045E",
    textAlign: "center"
  },
  cardText: {
    textAlign: "center",
    fontSize: 16,
    color: "#03045E",
  },
  container4: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    
},
chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: .9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
}
});
