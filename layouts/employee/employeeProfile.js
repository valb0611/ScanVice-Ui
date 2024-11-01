import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';



export default function EmployeeProfile({ route, navigation }) {
    const { usuarioRegistrado } = route.params;
    const [imageUri, setImageUri] = useState(null);
    const [showQRCode, setShowQRCode] = useState(false);
    const [buttonText, setButtonText] = useState("Compartir Perfil");


    const toggleQRCode = () => {
        setShowQRCode(!showQRCode);
        setButtonText(showQRCode ? "Compartir Perfil" : "Ocultar QR");
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
        <SafeAreaView>
            <ScrollView>

            <View style={styles.navBar} >
                    <Text style={styles.secondTitleNav}> ScanVice </Text>
                </View>
                
                <View style={styles.secondContainer}>
                    {usuarioRegistrado.imagen && (
                        <Image source={{ uri: usuarioRegistrado.imagen }} style={styles.selectedImage2} />
                    )}
                    <Text style={styles.secondText2}>{usuarioRegistrado.nombre} {usuarioRegistrado.apellidos}</Text>
                    <Text style={styles.secondText3}>{capitalizeFirstLetter(usuarioRegistrado.profesion)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        {renderStars(usuarioRegistrado.calificaciones)}
                    </View>
                </View>

                <View style={styles.thirdContainer}>
                    <Text style={styles.secondText2}>{usuarioRegistrado.correo} </Text>
                    <Text style={styles.secondText2}>{usuarioRegistrado.telefono}</Text>
                </View>

                <View style={styles.fourthContainer}>
                    <View>
                        <View style={styles.fourthContainer3}>
                            {/* Cambiar el texto del botón según si hay una imagen seleccionada */}
                            <TouchableOpacity style={styles.button} onPress={imageUri ? handleImageUpload : pickImage}>
                                <Text style={styles.secondText4}>
                                    {imageUri ? 'Subir Imagen' : 'Seleccionar Imagen'}
                                </Text>
                            </TouchableOpacity>

                            {imageUri && <Image source={{ uri: imageUri }} style={styles.selectedImage} />}
                        </View>
                    </View>

                    <View>
                        <View style={styles.fourthContainer4}>
                        <TouchableOpacity style={styles.button} onPress={toggleQRCode}>
                            <Text style={styles.secondText4}>{buttonText}</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    
               

                {/* Mostrar el QR si el botón ha sido presionado */}
                {showQRCode && (
                    <View style={styles.qrContainer}>
                        <QRCode 
                            value={JSON.stringify({
                                id: usuarioRegistrado._id,
                                nombre: usuarioRegistrado.nombre,
                                correo: usuarioRegistrado.correo
                            })}
                            size={200}
                        />
                    </View>
                )}

                    <TouchableOpacity style={styles.button2} onPress={() => navigation.goBack()}>
                        <Text style={styles.secondText5}>Regresar</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
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
    fourthContainer3: {
        width: 150,
        height: 230,
        backgroundColor: '#03045E',
        borderRadius: 25,
        marginHorizontal: 3,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -20,
    },
    fourthContainer4: {
        width: 150,
        height: 230,
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
    },
    secondText3: {
        fontWeight: "light",
        fontSize: 15,
        color: "#D9D9D9",
        fontFamily: "PoppinsSemiBold",
        textAlign: "center",
    },
    secondText4: {
        fontWeight: "light",
        fontSize: 15,
        color: "#03045E",
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
