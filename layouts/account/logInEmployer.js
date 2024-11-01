import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Alert, Modal, ScrollView, Image } from "react-native";
import { useFonts } from 'expo-font';
import axios from 'axios';
import * as SplashScreen from 'expo-splash-screen';
import iconmenu from '../../assets/images/iconmenu.png';


export default function LogInEmployer({ navigation }) {
  const [empleador, setEmpleador] = useState({
    correo: "",
    clave: "",
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

  const updateInputValue = (campo, valor) => {
    setEmpleador((prevEmpleador) => ({
      ...prevEmpleador,
      [campo]: valor,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.100.14:8080/loginEmpleador", empleador);
      
      console.log("Respuesta del servidor:", response.data); // Añadido para depuración
      
      // Verifica si el servidor devuelve un código de estado 200 y si los datos son válidos
      if (response.status === 200 && response.data) {
        const usuarioData = response.data; // Asegúrate de que response.data contiene la información correcta
        Alert.alert("Login Exitoso", "Has iniciado sesión correctamente.");
        navigation.navigate("EmployerMain", { usuarioRegistrado: usuarioData });
      } else {
        // Si la respuesta no es 200 o no hay datos de usuario válidos
        Alert.alert("Error", "Correo o contraseña incorrectos.");
      }
    } catch (error) {
      console.log("Error en login:", error);
      Alert.alert("Error", "Hubo un problema al intentar iniciar sesión.");
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
            <Text style= {styles.mainTitle}>Iniciar Sesión</Text>
            
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
              placeholder="Ingresa la contraseña"
              autoCapitalize="none"
              secureTextEntry={true}
              textContentType="password"
              value={empleador.clave}
              onChangeText={(value) => updateInputValue("clave", value)}
            />
            
            <TouchableOpacity style={styles.button1} onPress={handleLogin}>
            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Iniciar Sesión</Text>
            </TouchableOpacity>
            
            <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14, fontFamily:"PoppinsSemiBold", }}> No tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUpMain")}>
                <Text style={{ color: '#03045E', fontWeight: '600', fontSize: 14, fontFamily:"PoppinsSemiBold", }}>Crear Cuenta</Text>
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
                <Text style={styles.modalText}>Login Exitoso</Text>
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
  afearea: {
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    marginTop:40
  },
  mainTitle: {
    marginTop:60,
    fontWeight: "600",
    fontSize:60,
    color:"#03045E",
    fontFamily:"PoppinsBold",
    marginBottom:10,
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
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#03045E",
    alignSelf: "center",
    paddingBottom: 24,
    fontFamily: "PoppinsBold",
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
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
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