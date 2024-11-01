import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';

const Star = ({ filled, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.star, filled && styles.filledStar]}>★</Text>
        </TouchableOpacity>
    );
};

export default function FacturasScreen({ route }) {
    const { usuarioRegistrado } = route.params;
    const [facturas, setFacturas] = useState([]);
    const [calificaciones, setCalificaciones] = useState({});
    const [calificado, setCalificado] = useState({}); // Nuevo estado

    useEffect(() => {
        const obtenerFacturas = async () => {
            try {
                const response = await axios.get('http://192.168.100.14:8080/api/facturas');
                const facturasFiltradas = response.data.filter(factura => factura.empleadorId === usuarioRegistrado._id);
                setFacturas(facturasFiltradas);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', error.response?.data?.message || 'No se pudieron obtener las facturas.');
            }
        };

        obtenerFacturas();
    }, [usuarioRegistrado]);

    const handleCalificar = async (facturaId, empleadoId) => {
        if (!empleadoId) {
            return Alert.alert('Error', 'El ID del empleado no es válido.');
        }

        const calificacion = calificaciones[facturaId];
        if (calificacion === undefined) {
            return Alert.alert('Error', 'Por favor, selecciona una calificación.');
        }

        try {
            await axios.post(`http://192.168.100.14:8080/api/empleados/${empleadoId}/calificaciones`, { calificacion });
            Alert.alert('Éxito', 'Calificación guardada correctamente.');

            // Actualiza el estado de calificado
            setCalificado(prevState => ({
                ...prevState,
                [facturaId]: true // Marca esta factura como calificada
            }));
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            Alert.alert('Error', 'No se pudo guardar la calificación.');
        }
    };

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
                <Text style={styles.secondTitleNav}>  ScanVice</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Facturas</Text>
                {facturas.length > 0 ? (
                    facturas.map(factura => (
                        <View key={factura._id} style={styles.factura}>
                            <Text style={styles.label}>Empleado: {factura.empleadoId?.nombre || 'No disponible'}</Text>
                            <Text style={styles.label}>Horas Trabajadas: {factura.horasTrabajadas}</Text>
                            <Text style={styles.label}>Tarifa por Hora: ₡{factura.tarifaPorHora}</Text>
                            <Text style={styles.label}>Subtotal: ₡{factura.subtotal}</Text>
                            <Text style={styles.label}>Impuesto: ₡{factura.impuesto}</Text>
                            <Text style={styles.label}>Total: ₡{factura.total}</Text>
                            <Text style={styles.label}>Fecha: {new Date(factura.fecha).toLocaleDateString()}</Text>

                            {/* Sección para calificación */}
                            <View style={styles.starsContainer}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star
                                        key={star}
                                        filled={calificaciones[factura._id] >= star}
                                        onPress={() =>
                                            setCalificaciones({
                                                ...calificaciones,
                                                [factura._id]: star
                                            })
                                        }
                                    />
                                ))}
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    handleCalificar(factura._id, factura.empleadoId?._id);
                                }}
                                disabled={calificado[factura._id]} // Deshabilita si ya fue calificada
                            >
                                <Text style={styles.buttonText}>{calificado[factura._id] ? 'Calificación Guardada' : 'Guardar Calificación'}</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noFacturas}>No hay facturas disponibles.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        
    },
    
    navBar: {
        justifyContent: "center",
        display: "flex",
        height: 60,
        marginTop: 30,
        fontFamily: "PoppinsSemiBold",
    },
    secondTitleNav: {
        fontWeight: "600",
        fontSize: 30,
        color: "#03045E",
        fontFamily: "PoppinsSemiBold",
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#03045E',
        textAlign: 'center',
        marginBottom: 20,
    },
    factura: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderColor: '#03045E',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3, // Para Android
    },
    label: {
        fontSize: 16,
        color: '#03045E',
        marginBottom: 5,
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    star: {
        fontSize: 35,
        color: '#D3D3D3', // Color para las estrellas vacías
    },
    filledStar: {
        color: '#FFD700', // Color para las estrellas llenas
    },
    button: {
        backgroundColor: '#0077cc',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#005fa3',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noFacturas: {
        fontSize: 16,
        color: '#03045E',
        textAlign: 'center',
        marginTop: 20,
    },
});
