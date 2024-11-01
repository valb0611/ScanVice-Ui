import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput,Alert } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import SharedValues from '../../components/animationMVV';
import Navigation from '../../routes';
import people from '../../assets/images/people.png';
import iconmenu from '../../assets/images/iconmenu.png';
import { Entypo } from '@expo/vector-icons';
import colors from '../../colors';
import { FontAwesome } from '@expo/vector-icons';


export default function EmployerMain({ route, navigation }) {
    const [fontsLoaded] = useFonts({
        PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
        PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
        PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
        PoppinsBlack: require("../../assets/fonts/Poppins-Black.ttf"),
    });

    const [empleados, setEmpleados] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [professionFilter, setProfessionFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    // Asegúrate de que el usuario esté definido correctamente

    const { usuarioRegistrado } = route.params; // Obtener el primer elemento del array

useEffect(() => {
    console.log('Usuario registrado:', usuarioRegistrado); // Verifica el valor del usuario

    if (usuarioRegistrado && usuarioRegistrado._id) {
        fetchFavoritos();
    } else {
        console.error('Usuario no definido o sin ID', usuarioRegistrado);
    }
}, [usuarioRegistrado]);

useEffect(() => {
  async function prepare() {
      await SplashScreen.preventAutoHideAsync();
  }
  prepare();
}, []);

const onLayout = useCallback(async () => {
  if (fontsLoaded) {
      await SplashScreen.hideAsync();
  }
}, [fontsLoaded]);

const toggleFavorito = async (empleado) => {
    if (!usuarioRegistrado || !usuarioRegistrado._id) {
        console.error('Usuario no definido o sin ID');
        return;
    }

    if (!empleado || !empleado._id) {
        console.error('Empleado no definido o sin ID');
        return;
    }

    console.log('Empleado recibido:', empleado);

    try {
        const response = await fetch('http://192.168.100.14:8080/api/empleador/addFavorito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item_id: usuarioRegistrado._id,  // ID del empleador
                empleado_id: empleado._id,  // ID del empleado a agregar a favoritos
            }),
        });

        const result = await response.json();
        if (response.ok) {
            setFavoritos(result.empleadosFavoritos); // Actualiza el estado de favoritos
            Alert.alert("Añadido a favoritos", `Has agregado a ${empleado.nombre} a tus favoritos.`);
        } else {
            console.error('Error al agregar favorito:', result);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
};




if (!fontsLoaded) return null;


    useEffect(() => {
        async function fetchEmpleados() {
            try {
                const response = await axios.get("http://192.168.100.14:8080/api/empleado");
                console.log('Datos de empleados recibidos:', response.data); // Verifica la estructura de los datos
                setEmpleados(response.data);
            } catch (error) {
                console.log('Error al obtener empleados:', error);
            }
        }
        fetchEmpleados();
    }, []);

    useEffect(() => {
        // Llama a fetchFavoritos cuando se carga el componente
        fetchFavoritos();
    }, [usuarioRegistrado]); // Dependencia para obtener favoritos cuando cambia el usuario

    const fetchFavoritos = async () => {
        if (!usuarioRegistrado?._id) return; // Verifica que el usuario esté definido
        try {
            const response = await axios.get(`http://192.168.1.139:8080/api/empleador/${usuarioRegistrado._id}/favoritos`);
            console.log('Favoritos en fetch:', response.data.empleadosFavoritos);
            setFavoritos(response.data.empleadosFavoritos);
        } catch (error) {
            console.error('Error al obtener favoritos:', error.response ? error.response.data : error.message);
        }
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
                    color="#FFD700" // color dorado para las estrellas
                    style={{ marginRight: 2 }}
                />
            );
        }
    
        return estrellas;
    };
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    
    const filteredEmpleados = empleados.filter((empleado) => {
        const matchesName = empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            empleado.profesion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            empleado.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            empleado.apellidos.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesProfession = professionFilter ? empleado.profesion.toLowerCase() === professionFilter.toLowerCase() : true;
        const matchesLocation = locationFilter ? empleado.ubicacion.toLowerCase() === locationFilter.toLowerCase() : true;

        return matchesName && matchesProfession && matchesLocation;
    });

   



    if (!fontsLoaded) return null;

    console.log('Usuario registrado:', usuarioRegistrado);
    console.log('Favoritos en render:', favoritos);

    return (
        <SafeAreaView>
            <ScrollView>
            <View style={styles.navBar} onLayout={onLayout}>
                <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
                    <Text style={styles.secondTitleNav}>ScanVice</Text>
                </TouchableOpacity>
            </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Map")} style={styles.chatButton}>
                        <Entypo name="map" size={24} color={colors.lightGray} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("EmployerMain", { usuarioRegistrado })} style={styles.chatButton}>
                        <Entypo name="home" size={24} color={colors.lightGray} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("UserProfile", { usuarioRegistrado })} style={styles.chatButton}>
                        <Entypo name="user" size={24} color={colors.lightGray} />
                    </TouchableOpacity>
                </View>

                <View style={styles.container} onLayout={onLayout}>
                    <Text style={styles.mainTitle}>Tarjetas de Empleados</Text>
                </View>
                <View style={styles.filterContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Buscar empleados"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>

                <View style={styles.cardsContainer}>
                    {filteredEmpleados.map((empleado) => (
                        <View key={empleado._id} style={styles.card}>
                            <Text style={styles.cardTitle}>{empleado.nombre} {empleado.apellidos}</Text>
                            <Text style={styles.cardText}>{capitalizeFirstLetter(empleado.profesion)}</Text>
                            <Text style={styles.cardText}>Teléfono: {empleado.telefono}</Text>
                            <Text style={styles.cardText}>Tarifa: ₡{empleado.tarifa}</Text>
                            
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {renderStars(empleado.calificaciones)}
                            </View>


                           

                            <TouchableOpacity style={styles.profileButton} onPress={() => {
                                if (favoritos.some(fav => fav._id === empleado._id)) {
                                    handleRemoveFavorito(empleado._id);
                                } else {
                                    toggleFavorito(empleado);
                                }
                            }}>
                                <Text style={styles.profileButtonText}>
                                    {favoritos.some(fav => fav._id === empleado._id) ? 'Guardado en Favoritos' : 'Guardar en Favoritos'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <StatusBar style="auto" />
            </ScrollView>
        </SafeAreaView>
    );
}




const styles = StyleSheet.create({  
    favoriteButton: {
      fontSize: 14,
      color: "#03045E",
      marginTop: 10,
      textAlign: 'center'
    },
    filterContainer: {
      padding: 20,
  },
  input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
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