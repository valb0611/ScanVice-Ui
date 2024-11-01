import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
import SharedValues from '../../components/animationEmployee';
import Navigation from '../../routes';
import people from '../../assets/images/people.png';
import iconmenu from '../../assets/images/iconmenu.png';
import { Entypo } from '@expo/vector-icons';
import colors from '../../colors';
import unemployed from '../../assets/images/desempleados2.png'
import thinking from '../../assets/images/thinking.png'
import estudiando from "../../assets/images/cursos.png"



export default function EmployerMain({ route, navigation }) {


    const [fontsLoaded] = useFonts({
    PoppinsSemiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsBlack: require("../../assets/fonts/Poppins-Black.ttf"),
  });

  const [empleados, setEmpleados] = useState([]);
  
   

    // Asegúrate de que el usuario esté definido correctamente
    const usuarioRegistrado = route.params.usuarioRegistrado?.[0]; // Obtener el primer elemento del array, si existe

  

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

    
    console.log('Usuario registrado:', usuarioRegistrado);
    



    return (
        <SafeAreaView>
            <ScrollView>
            <View style={styles.navBar} onLayout={onLayout}>
              <Text style={styles.secondTitleNav}>  ScanVice</Text>
            </View>

           

            <View style={styles.thirdContainer}>

          <ScrollView 
                  horizontal={true} 
                  showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento
                  contentContainerStyle={styles.scrollContainer}
              >
                  {/* Elementos dentro del scroll horizontal */}
                  <TouchableOpacity  onPress={() => navigation.navigate("UserEmployeeProfile", { usuarioRegistrado })}>
                    <View style={styles.fourthContainer2}>
                      <Entypo name="user" size={30} color='#03045E' /> 
                      <Text style= {styles.secondText2}>Ir a tu perfil</Text> 
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity  mode="contained" onPress={() => navigation.navigate('LogInMain')}>
                    <View style={styles.fourthContainer2}>
                      <Entypo name="login" size={30} color='#03045E' /> 
                      <Text style= {styles.secondText2}>Cierra Sesión</Text> 
                    </View>
                  </TouchableOpacity>

                 
          </ScrollView>
            
        </View>

        <SharedValues></SharedValues> 

          <View style={styles.secondContainer5}>
            
            <View style={styles.fourthContainer3}>
           
                <Text style= {styles.secondText24}>¿Cómo funcionamos?</Text> 
            </View>
            
          </View>

          <View style={styles.secondContainer5}>
            
            <View style={styles.fourthContainer5}>
           
                <Text style= {styles.secondText25}>Creas tu tarjeta.</Text> 
            </View>
            <View style={styles.fourthContainer5}>
           
                <Text style= {styles.secondText25}>Los usuarios la agregan a favoritos.</Text> 
            </View>
            <View style={styles.fourthContainer5}>
           
                <Text style= {styles.secondText25}>Se contactan contigo.</Text> 
            </View>
            
          </View>

          <View style={styles.secondContainer5}>
            
            <View style={styles.fourthContainer3}>
           
                <Text style= {styles.secondText24}>Métodos de Pago</Text> 
            </View>
            
          </View>

          <View style={styles.secondContainer5}>
            
            <View style={styles.fourthContainer7}>
           
                <Text style= {styles.secondText25}>Te pueden pagar por SINPEmóvil.</Text> 
            </View>
            
            <View style={styles.fourthContainer7}>
           
                <Text style= {styles.secondText25}>Te pueden pagar en efectivo.</Text> 
            </View>
            
          </View>

          <View style={styles.secondContainer5}>
            
            <View style={styles.fourthContainer3}>
           
                <Text style= {styles.secondText24}>Compartir tu tarjeta</Text> 
            </View>
            
          </View>

          <View style={styles.secondContainer5}>
            
            <View style={styles.fourthContainer5}>
           
                <Text style= {styles.secondText25}>Apareces en un mapa.</Text> 
            </View>
            <View style={styles.fourthContainer5}>
           
                <Text style= {styles.secondText25}>Apareces en una lista.</Text> 
            </View>
            <View style={styles.fourthContainer5}>
           
                <Text style= {styles.secondText25}>Puedes compartir tu QR.</Text> 
            </View>
            
          </View>


          <View style={styles.secondContainer}>
            <Image style={styles.icons2} source = {estudiando}/>
            <TouchableOpacity style={styles.button2} mode="contained" onPress={() => Linking.openURL('https://www.ina.ac.cr/BusquedaCursos/SitePages/Inicio.aspx')}>
              <Text style={styles.buttonText}>¡Desarrolla tus habilidades con cursos!</Text>
            </TouchableOpacity>         
        </View>


          




            </ScrollView>
        </SafeAreaView>
    );

}


const styles = StyleSheet.create({  
  secondContainer5:{
    width:'80%',
    height: 250,
    margin:"auto",
    borderRadius: 25,
    marginTop:-7,
    marginBottom:-140,
    flexDirection: 'row', 
    paddingHorizontal:20
  },
  fourthContainer3: {
    width: "115%", // Ajusta el ancho de cada elemento
    height: 80, // Ajusta el alto de cada elemento
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 25,
    marginHorizontal: 3, // Espacio entre los elementos
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:-20
    
  },
  fourthContainer5: {
    width: 97, // Ajusta el ancho de cada elemento
    height: 80, // Ajusta el alto de cada elemento
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 25,
    marginHorizontal: 30, // Espacio entre los elementos
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:-20
    
  },
  fourthContainer7: {
    width: 150, // Ajusta el ancho de cada elemento
    height: 80, // Ajusta el alto de cada elemento
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 25,
    marginHorizontal: 30, // Espacio entre los elementos
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:-20
    
  },
  fourthContainer4: {
    width: 150, // Ajusta el ancho de cada elemento
    height: 270, // Ajusta el alto de cada elemento
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 25,
    marginHorizontal: 10, // Espacio entre los elementos
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons3:{
    width:120,
    height:180,
    margin: "auto",
    marginTop:10
}, 
secondText3:{
  fontWeight: "400",
  fontSize:15,
  textAlign:"center",
  color:"#03045E",
  width:120,
  fontFamily:"PoppinsSemiBold",
  marginBottom:10
  
},
    
   
    buttonContainer: {
      display:"flex",
      height: 60,
      flexDirection:"row",
      margin:"auto"
    },
    chatButton: {
     margin:"auto"
    },icons:{
      width:60,
      height:60,
      margin:"auto"
  },
  third: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F7FB',
},
scrollContainer: {
    paddingHorizontal: 20, // Espaciado alrededor de los elementos
},
fourthContainer: {
    width: 200, // Ajusta el ancho de cada elemento
    height: 70, // Ajusta el alto de cada elemento
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 25,
    marginHorizontal: 10, // Espacio entre los elementos
    justifyContent: 'center',
    alignItems: 'center',
},
fourthContainer2: {
  width: 200, // Ajusta el ancho de cada elemento
  height: 70, // Ajusta el alto de cada elemento
  backgroundColor: 'rgba(217, 217, 217, 0.5)',
  borderRadius: 25,
  marginHorizontal: 10, // Espacio entre los elementos
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row', 
  paddingHorizontal:20
},



secondText2:{
  fontWeight: "400",
  fontSize:15,
  textAlign:"center",
  color:"#03045E",
  margin:"auto",
  fontFamily:"PoppinsSemiBold",
  marginLeft:15
},
secondText25:{
  fontWeight: "200",
  fontSize:13,
  textAlign:"center",
  color:"#03045E",
  margin:"auto",
  fontFamily:"PoppinsSemiBold",
  
},
secondText24:{
  fontWeight: "400",
  fontSize:25,
  textAlign:"center",
  color:"#03045E",
  margin:"auto",
  fontFamily:"PoppinsBold",
  
},
  icons2:{
      width:200,
      height:200,
      margin: "auto",
      marginTop:0
  },


  secondContainer:{
      width:'80%',
      backgroundColor: "rgba(217, 217, 217, 0.5)",
      height: 250,
      margin:"auto",
      borderRadius: 25,
      marginTop:20,
      marginBottom:20
  },
  
  button1:{
      width: 100,
      height:100,
      borderRadius:50,
      justifyContent:"center",
      margin:"auto",
      display: "flex",
      backgroundColor: "rgba(217, 217, 217, 0.5)",
      
  },
  button2:{
      width: 312,
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
    marginTop:60,
    fontWeight: "600",
    fontSize:70,
    color:"#03045E",
    fontFamily:"PoppinsBold",
    marginBottom:-15,
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
    fontSize:21,
    color:"#03045E",
    
     fontFamily:"PoppinsSemiBold"
  },
  secondText:{
    fontWeight: "400",
    fontSize:15,
    textAlign:"center",
    width:220,
    color:"#03045E",
    margin:"auto",
    marginTop:8,
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
    
    }
  
});