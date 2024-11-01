import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import iconmenu from '../../assets/images/iconmenu.png';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';



export default function EmployeeProfileEmployer({ route, navigation }) {
    const { empleado } = route.params; 
    const { usuarioRegistrado } = route.params;
    const [hoursWorked, setHoursWorked] = useState('');
    const [loading, setLoading] = useState(false); // Estado para el loading
    const [imageUri, setImageUri] = useState(null);
    

    console.log('Empleado ID:', empleado._id);
    console.log('Empleador ID:', usuarioRegistrado._id);

    const generarFactura = async () => {
        const tarifaPorHora = empleado.tarifa;
        const totalHoras = parseFloat(hoursWorked) || 0;
    
        // Validación de horas trabajadas
        if (totalHoras <= 0) {
            Alert.alert('Error', 'Por favor ingrese un número válido de horas trabajadas.');
            return;
        }
    
        const subtotal = tarifaPorHora * totalHoras;
        const impuesto = 0.05 * subtotal;
        const total = subtotal + impuesto;
    
        setLoading(true); // Activar el loading
    
        try {
            const response = await axios.post('http://192.168.100.14:8080/api/facturas', {
                empleadoId: empleado._id,
                empleadorId: usuarioRegistrado._id, // Asegúrate de que este valor esté definido
                horasTrabajadas: totalHoras,
                tarifaPorHora: tarifaPorHora,
                subtotal: subtotal,
                impuesto: impuesto,
                total: total,
                fecha: new Date() // No es necesario enviarlo si se genera en el backend
            });
            
            Alert.alert(
                'Factura Generada',
                `Horas trabajadas: ${totalHoras}\n` +
                `Tarifa por hora: ₡${tarifaPorHora}\n` +
                `Subtotal: ₡${subtotal.toFixed(2)}\n` +
                `Impuesto (5%): ₡${impuesto.toFixed(2)}\n` +
                `Total: ₡${total.toFixed(2)}`,
                [{ text: 'OK' }]
            );
            setHoursWorked(''); // Limpiar el campo de entrada
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo generar la factura.');
        } finally {
            setLoading(false); // Desactivar el loading
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
                    size={25}
                    color="#FFD700"
                    style={{ marginRight: 2 }}
                />
            );
        }
    
        return estrellas;
    };


    const handleImageUpload = async () => {
        if (!imageUri) {
            alert('Por favor selecciona una imagen primero.');
            return;
        }

        // Convertir la imagen a base64
        const base64 = await fetch(imageUri)
            .then(res => res.blob())
            .then(blob => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            });

        try {
            const response = await fetch(`http://192.168.100.14:8080/api/empleados/${usuarioRegistrado._id}/addFoto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imagen: base64 }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Imagen guardada correctamente.');
            } else {
                alert(data.message || 'Error al guardar la imagen.');
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            alert('Error al guardar la imagen.');
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Es necesario otorgar acceso a la galería para seleccionar una imagen.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.navBar}>
                <Text style={styles.secondTitleNav}>  ScanVice
                    
                </Text>
            </View>
            <View style={styles.secondContainer}>
                    {empleado.imagen && (
                        <Image source={{ uri: empleado.imagen }} style={styles.selectedImage2} />
                    )}
                    <Text style={styles.secondText2}>{empleado.nombre} {empleado.apellidos}</Text>
                    <Text style={styles.secondText3}>{capitalizeFirstLetter(empleado.profesion)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        {renderStars(empleado.calificaciones)}
                    </View>
                </View>

                <View style={styles.thirdContainer}>
                    <Text style={styles.secondText2}>{empleado.correo} </Text>
                    <Text style={styles.secondText2}>{empleado.telefono}</Text>
                </View>

                <View style={styles.thirdContainer}>
                <   Text style={styles.secondText2}>Tarifa: </Text>
                    <Text style={styles.secondText2}>₡{empleado.tarifa} </Text>
                   
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.secondText2}
                        keyboardType="numeric"
                        placeholder="Ingrese horas trabajadas"
                        placeholderTextColor="#D9D9D9" 
                        value={hoursWorked}
                        onChangeText={setHoursWorked}
                    />
                </View>

                <View style={styles.fourthContainer}>

                    <View>
                        <View style={styles.fourthContainer3}>
                        <TouchableOpacity 
                            style={[styles.exitButton, loading && styles.disabledButton]} 
                            onPress={generarFactura} 
                            disabled={loading} // Deshabilitar si está cargando
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFFFFF" /> // Indicador de carga
                            ) : (
                                <Text style={styles.secondText4}>Contratar y Generar Factura</Text>
                            )}
                        </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <View style={styles.fourthContainer4}>
                            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
                                <Text style={styles.secondText4}>Salir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>





    

            

           

           


            

           
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
    menu: {
        width: 30,
        height: 30
    },
    
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#03045E',
        textAlign: 'center',
    },
    profession: {
        fontSize: 18,
        color: '#03045E',
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#03045E',
        marginTop: 20,
    },
    info: {
        fontSize: 16,
        color: '#03045E',
        marginTop: 5,
    },
    inputContainer: {
        backgroundColor: "#03045E",
        height: 60,
        fontSize: 16,
        borderRadius: 15,
        margin: "auto",
        padding: 12,
        width: "80%",
        fontFamily:"PoppinsSemiBold",
      },

    chatButton: {
        backgroundColor: '#0077B6',
        padding: 15,
        borderRadius: 5,
        marginTop: 30,
        alignItems: 'center',
    },
    hireButton: {
        backgroundColor: '#00B4D8',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#A9A9A9' // Color para el botón deshabilitado
    },
    hireButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    exitButton: {
       
        padding: 15,
        
       
        alignItems: 'center',
    },
    exitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    fourthContainer: {
        width: '80%',
        height: 250,
        margin: "auto",
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    fourthContainer3: {
        width: 150,
        height: 100,
        backgroundColor: '#03045E',
        borderRadius: 25,
        marginHorizontal: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -20,
    },
    fourthContainer4: {
        width: 150,
        height: 100,
        backgroundColor: '#03045E',
        borderRadius: 25,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondContainer: {
        width: '80%',
        backgroundColor: "#03045E",
        height: 300,
        margin: "auto",
        borderRadius: 25,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    thirdContainer: {
        width: '80%',
        backgroundColor: "#03045E",
        height: 100,
        margin: "auto",
        borderRadius: 25,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondText2: {
        fontWeight: "400",
        fontSize: 20,
        color: "#D9D9D9",
        fontFamily: "PoppinsSemiBold",
        textAlign: "center",
    },
    secondText3: {
        fontWeight: "light",
        fontSize: 15,
        color: "#D9D9D9",
        fontFamily: "PoppinsSemiBold",
        textAlign: "center",
        
    },
    secondText4: {
        fontWeight: "400",
        fontSize: 15,
        color: "#D9D9D9",
        fontFamily: "PoppinsSemiBold",
        textAlign: "center",
    },
    selectedImage2: {
        width: 120,
        height: 120,
        borderRadius: "60%",
        margin: "auto",
        marginBottom: 15,
        marginTop: 30,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#03045E',
    },
    text: {
        fontSize: 18,
        color: '#03045E',
        marginVertical: 5,
    },
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        width: 115
    },
    button2: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#03045E',
        borderRadius: 10,
        width: 115
    },
    secondText5: {
        fontWeight: "light",
        fontSize: 15,
        color: "#D9D9D9",
        fontFamily: "PoppinsSemiBold",
        textAlign: "center",
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    uploadButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#28a745',
        borderRadius: 5,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    qrButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'red', // Cambiado a rojo para visibilidad temporal
        borderRadius: 5,
    },
    qrButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    qrContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    selectedImage: {
        width: 115,
        height: 100,
        borderRadius: 10,
        marginTop: 10,
    },
});
