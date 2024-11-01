import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Modal, ScrollView, Image } from "react-native";
import { useFonts } from 'expo-font';
import axios from 'axios';
import * as SplashScreen from 'expo-splash-screen';
import iconmenu from '../../assets/images/iconmenu.png';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function SignupEmployee({ navigation }) {
  const [empleado, setEmpleado] = useState({
    cedula: "",
    correo: "",
    clave: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    horario: "",
    ubicacion: "",
    profesion: "",
    tarifa: 0.0,
    latitud: null,
    longitud: null,
  });

  const [fontsLoaded] = useFonts({
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsBlack: require("../../assets/fonts/Poppins-Black.ttf"),
  });

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

  if (!fontsLoaded) return null;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const updateInputValue = (campo, valor) => {
    setEmpleado((prevEmpleado) => ({
      ...prevEmpleado,
      [campo]: valor,
    }));
  };

  const handleApiCall = async () => {
    try {
      // Definir una ubicación basada en las coordenadas seleccionadas
      const ubicacionTexto = `Lat: ${selectedLocation.latitude}, Lon: ${selectedLocation.longitude}`;
  
      const response = await axios.put("http://192.168.100.14:8080/api/empleado", {
        ...empleado,
        ubicacion: ubicacionTexto, // Añadir el campo 'ubicacion'
        latitud: selectedLocation.latitude,
        longitud: selectedLocation.longitude,
      });
  
      console.log("Empleado Guardado", response.data);
      setModalVisible(true);
      // Limpiar el formulario
      setEmpleado({
        cedula: "",
        correo: "",
        clave: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        horario: "",
        ubicacion: "",
        profesion: "",
        tarifa: 0.0,
        latitud: "",
        longitud: ""
      });
    } catch (error) {
      console.log("Error al guardar el empleado:", error);
      alert("Error al guardar el empleado. Intente de nuevo.");
    }
  };
  

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
    updateInputValue("latitud", coordinate.latitude);
    updateInputValue("longitud", coordinate.longitude);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView>
        <View style={styles.navBar} onLayout={onLayout}>
          <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
            <Text style={styles.secondTitleNav}>  ScanVice</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          
          <SafeAreaView style={styles.form}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpMain')}>
              <Text style={styles.mainTitle}>Crear Cuenta</Text>
            </TouchableOpacity>
            {/* Campos de entrada */}
            <TextInput
              style={styles.input}
              placeholder="Ingresa la cédula"
              keyboardType="number-pad"
              value={empleado.cedula}
              onChangeText={(value) => updateInputValue("cedula", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingrese el correo"
              autoCapitalize="none"
              keyboardType="email-address"
              value={empleado.correo}
              onChangeText={(value) => updateInputValue("correo", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa la contraseña"
              secureTextEntry={true}
              value={empleado.clave}
              onChangeText={(value) => updateInputValue("clave", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa el nombre"
              value={empleado.nombre}
              onChangeText={(value) => updateInputValue("nombre", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa los apellidos"
              value={empleado.apellidos}
              onChangeText={(value) => updateInputValue("apellidos", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa el teléfono"
              keyboardType="number-pad"
              value={empleado.telefono}
              onChangeText={(value) => updateInputValue("telefono", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa el horario"
              value={empleado.horario}
              onChangeText={(value) => updateInputValue("horario", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa la profesión"
              value={empleado.profesion}
              onChangeText={(value) => updateInputValue("profesion", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa la tarifa"
              keyboardType="decimal-pad"
              value={empleado.tarifa.toString()}
              onChangeText={(value) => updateInputValue("tarifa", parseFloat(value))}
            />

            {/* Mapa para seleccionar la ubicación */}
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 9.9337, // Latitud inicial
                longitude: -84.0866, // Longitud inicial
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={handleMapPress}
            >
              {selectedLocation && (
                <Marker
                  coordinate={selectedLocation}
                  title="Ubicación seleccionada"
                />
              )}
            </MapView>

            <TouchableOpacity style={styles.button1} onPress={handleApiCall}>
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Crear Cuenta</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 40 }}>
              <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14, fontFamily: "PoppinsBold", }}>Ya tienes una cuenta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("LogInEmployee")}>
                <Text style={{ color: '#03045E', fontWeight: '600', fontSize: 14, fontFamily: "PoppinsBold", }}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <StatusBar barStyle="light-content" />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Registrado</Text>
                <Text style={styles.modalSubText}>Se ha creado su cuenta</Text>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  mainTitle: {
    marginTop:0,
    fontWeight: "600",
    fontSize:60,
    color:"#03045E",
    fontFamily:"PoppinsBold",
    marginBottom:10,
    
  },
  menu: {
    width: 30,
    height: 30
  },
  container: {
    flex: 1,
    marginTop:40
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    fontFamily:"PoppinsSemiBold",
  },
  button1: {
    backgroundColor: "#0077B6",
    borderRadius: 15,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalSubText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 14,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

