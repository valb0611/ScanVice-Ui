import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function EmployeeProfile({ route, navigation }) {
    const { usuarioRegistrado } = route.params;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.navBar}>
                    <Text style={styles.secondTitleNav}>  ScanVice</Text>
                </View>

                <View style={styles.profileContainer}>
                    <Text style={styles.profileName}>{usuarioRegistrado.nombre} {usuarioRegistrado.apellidos}</Text>
                    <Text style={styles.profileDetail}>Ubicación: {capitalizeFirstLetter(usuarioRegistrado.ubicacion)}</Text>
                    <Text style={styles.profileDetail}>Correo: {usuarioRegistrado.correo}</Text>
                    <Text style={styles.profileDetail}>Teléfono: {usuarioRegistrado.telefono}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Regresar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        alignItems: 'center',
        padding: 20,
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
    profileContainer: {
        width: '100%',
        backgroundColor: "#03045E",
        padding: 20,
        borderRadius: 15,
        marginTop: 20,
        alignItems: 'center',
        elevation: 5, // Agrega sombra
    },
    profileName: {
        fontWeight: "600",
        fontSize: 24,
        color: "#D9D9D9",
        fontFamily: "PoppinsSemiBold",
    },
    profileDetail: {
        fontWeight: "400",
        fontSize: 16,
        color: "#D9D9D9",
        fontFamily: "PoppinsRegular",
        marginVertical: 5,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: '#03045E',
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#D9D9D9',
        fontSize: 16,
        fontWeight: '500',
    },
});
