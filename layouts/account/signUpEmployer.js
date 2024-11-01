import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, Modal, ScrollView } from "react-native";
import { useFonts } from 'expo-font';
import axios from 'axios';
import * as SplashScreen from 'expo-splash-screen'
import backImage from '../../assets/images/backImage.png';
import iconmenu from '../../assets/images/iconmenu.png';


export default function SignupEmployer({ navigation }) {
  const [empleador, setEmpleador] = useState({
    cedula: "",
    correo: "",
    clave: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    ubicacion: ""
  });

  const [fontsLoaded] = useFonts({
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold:require("../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsExtraBold:require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsBlack:require("../../assets/fonts/Poppins-Black.ttf"),
});

useEffect(() => {
    async function prepare() {
        await SplashScreen.preventAutoHideAsync();
    }
    prepare();
}, [])

const onLayout = useCallback(async () => {
    if(fontsLoaded){
        await SplashScreen.hideAsync();
    }
},[fontsLoaded])

if(!fontsLoaded) return null; 

  const [empleadoresActuales, setEmpleadoresActuales] = useState([]);
  const [visible, setVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(true);
  const [msg, setMsg] = useState("Cargando");

  const [modalVisible, setModalVisible] = useState(false);


  const updateInputValue = (campo, valor) => {
    setEmpleador((prevEmpleador) => ({
      ...prevEmpleador,
      [campo]: valor,
    }));
  };

  const handleApiCall = async () => {
    setVisible(true);
    setBtnVisible(false);
    setMsg("Cargando");

    try {
      const response = await axios.put("http://192.168.100.14:8080/api/empleador", empleador);
      setEmpleadoresActuales(response.data);
      setVisible(true);
      setBtnVisible(true);
      setMsg("Empleador Guardado");

      // Clear form data
      setEmpleador({
        cedula: "",
        correo: "",
        clave: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        ubicacion: ""
      });

      // Show success notification
        setModalVisible(true);
      } catch (error) {
      console.log(error);
    }
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
          <TouchableOpacity onPress={() => navigation.navigate('SignUpMain')}><Text style={styles.mainTitle}>Crear Cuenta</Text></TouchableOpacity> 
          <TextInput
              style={styles.input}
              placeholder="Ingresa la cédula"
              autoCapitalize="words"
              keyboardType="number-pad"
              textContentType="cedula"
              autoFocus={true}
              value={empleador.cedula}
              onChangeText={(value) => updateInputValue("cedula", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingrese el correo"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={empleador.correo}
              onChangeText={(value) => updateInputValue("correo", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa el nombre"
              autoCapitalize="words"
              textContentType="nombre"
              value={empleador.nombre}
              onChangeText={(value) => updateInputValue("nombre", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa los apellidos"
              autoCapitalize="words"
              textContentType="apellidos"
              value={empleador.apellidos}
              onChangeText={(value) => updateInputValue("apellidos", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa el teléfono"
              keyboardType="number-pad"
              textContentType="telefono"
              value={empleador.telefono}
              onChangeText={(value) => updateInputValue("telefono", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa la ubicación"
              autoCapitalize="words"
              textContentType="ubicacion"
              value={empleador.ubicacion}
              onChangeText={(value) => updateInputValue("ubicacion", value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingresa la contraseña"
              autoCapitalize="none"
              secureTextEntry={true}
              textContentType="password"
              value={empleador.clave}
              onChangeText={(value) => updateInputValue("clave", value)}
            />
            <TouchableOpacity style={styles.button1} onPress={handleApiCall}>
              <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18, fontFamily:"PoppinsSemiBold", }}>Crear Cuenta</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center',marginBottom:40 }}>
              <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14, fontFamily:"PoppinsSemiBold", }}> Ya tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("LogInEmployer")}>
                <Text style={{ color: '#03045E', fontWeight: '600', fontSize: 14, fontFamily:"PoppinsSemiBold", }}>Iniciar Sesión</Text>
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
                <Text style={styles.modalSubText}> Se ha creado su cuenta</Text>
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
  mainTitle: {
    marginTop:0,
    fontWeight: "600",
    fontSize:60,
    color:"#03045E",
    fontFamily:"PoppinsBold",
    marginBottom:10,
  },
  menu:{
    width: 30,
    height:30
  },
  container: {
    flex: 1,
    marginTop:40
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#03045E",
    alignSelf: "center",
    paddingBottom: 24,
    fontFamily:"PoppinsBold",
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
    backgroundColor: '#03045E',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    fontFamily:"PoppinsSemiBold",
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button1: {
    backgroundColor: '#03045E',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03045E',
    marginBottom: 15,
  },
  modalSubText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 8,
  },
  buttonClose: {
    backgroundColor: '#03045E',
    padding: 10, 
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
