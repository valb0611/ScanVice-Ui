import * as Location from "expo-location"; 
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../../colors';
import axios from 'axios';

export default function Map({ navigation }) {
    const [origin, setOrigin] = useState({
        latitude: 9.861989459024445,
        longitude: -84.08730330261827,
    });
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const usuarioRegistrado = { _id: "6721063c27c3772e58443733" }; // Simulación del usuario registrado.

    useEffect(() => {
        async function init() {
            await getLocationPermission();
            await fetchEmpleados();
            setLoading(false);
        }
        init();
    }, []);

    async function getLocationPermission() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permiso denegado');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setOrigin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    }

    async function fetchEmpleados() {
        try {
            const response = await axios.get("http://192.168.100.14:8080/api/empleado");
            setEmpleados(response.data);
        } catch (error) {
            console.log('Error al obtener empleados:', error);
        }
    }

    const toggleFavorito = async (empleado) => {
        if (!usuarioRegistrado || !usuarioRegistrado._id || !empleado || !empleado._id) return;

        try {
            const response = await fetch('http://192.168.100.14:8080/api/empleador/addFavorito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    item_id: usuarioRegistrado._id,  
                    empleado_id: empleado._id,  
                }),
            });

            if (response.ok) {
                Alert.alert("Añadido a favoritos", `Has agregado a ${empleado.nombre} a tus favoritos.`);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

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
                    size={25}
                    color="#FFD700"
                    style={{ marginRight: 2 }}
                />
            );
        }
    
        return estrellas;
    };

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.004
                }}
            >
                <Marker 
                    draggable
                    coordinate={origin}
                    onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
                />
                
                {empleados.map(empleado => (
                    empleado.latitud && empleado.longitud ? (
                        <Marker
                            key={empleado._id}
                            coordinate={{
                                latitude: empleado.latitud,
                                longitude: empleado.longitud
                            }}
                        >
                            <Callout>
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutName}>{empleado.nombre}</Text>
                                    <Text style={styles.calloutProfession}>{empleado.profesion}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center',textAlign: "center" }}>
                                        {renderStars(empleado.calificaciones)}
                                    </View>
                                    <TouchableOpacity 
                                        style={styles.favoritoButton} 
                                        onPress={() => toggleFavorito(empleado)}
                                    >
                                        <Text style={styles.favoritoButtonText}>Agregar a Favoritos</Text>
                                        
                                    </TouchableOpacity>
                                </View>
                            </Callout>
                        </Marker>
                    ) : null
                ))}
            </MapView>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Entypo name="chevron-left" size={24} color={colors.lightGray} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    calloutContainer: {
        width: 150,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.primary,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    calloutName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 5,
    },
    calloutProfession: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    favoritoButton: {
        backgroundColor: colors.primary,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    favoritoButtonText: {
        color: 'white',
        fontWeight: '600',
        textAlign:"center"
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
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
        shadowOpacity: 0.9,
        shadowRadius: 8,
    },
});
