import React, {useCallback, useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, SafeAreaView, ScrollView, Button, TouchableOpacity,Linking} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import SharedValues from '../../components/animationMVV';
import people from '../../assets/images/people.png'
import { Entypo } from '@expo/vector-icons';
import unemployed from '../../assets/images/desempleados2.png'
import thinking from '../../assets/images/thinking.png'



export default function AboutUs({ navigation }) {
    
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

    

    return (
      
      <SafeAreaView>
      <ScrollView>
        
        <View style= {styles.container} onLayout={onLayout} >
          <Text style= {styles.mainTitle}>ScanVice</Text>
          <Text style= {styles.mainText}>¡Únete y se parte del cambio!</Text>
          <Text style= {styles.secondText}>Somos una plataforma digital para la búsqueda de trabajo.</Text>
        </View>
        <View style= {styles.buttonContainer} onLayout={onLayout}>
            <SharedValues></SharedValues> 
        </View>
        <View style={styles.secondContainer}>
            <Image style={styles.icons2} source = {people}/>
            <TouchableOpacity style={styles.button2} mode="contained" onPress={() => navigation.navigate('SignUpMain')}><Text style={styles.buttonText}>Únete a la comunidad de ScanVice</Text></TouchableOpacity>         
        </View>

        <View style={styles.thirdContainer}>

          <ScrollView 
                  horizontal={true} 
                  showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento
                  contentContainerStyle={styles.scrollContainer}
              >
                  {/* Elementos dentro del scroll horizontal */}
                  <TouchableOpacity  mode="contained" onPress={() => navigation.navigate('SignUpMain')}>
                    <View style={styles.fourthContainer2}>
                      <Entypo name="squared-plus" size={30} color='#03045E' /> 
                      <Text style= {styles.secondText2}>Crea tu cuenta</Text> 
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity  mode="contained" onPress={() => navigation.navigate('LogInMain')}>
                    <View style={styles.fourthContainer2}>
                      <Entypo name="login" size={30} color='#03045E' /> 
                      <Text style= {styles.secondText2}>Inicia Sesión</Text> 
                    </View>
                  </TouchableOpacity>
          </ScrollView>
            
        </View>

        <View style={styles.secondContainer5}>

          <TouchableOpacity  mode="contained" onPress={() => Linking.openURL('https://inec.cr/noticias/desempleo-continua-estable-durante-primer-trimestre-2024-78')}>
            <View style={styles.fourthContainer3}>
             <Image style={styles.icons3} source = {unemployed}/>
              <Text style= {styles.secondText3}>Información sobre el Desempleo</Text> 
            </View>
          </TouchableOpacity>

          <TouchableOpacity  mode="contained" onPress={() => Linking.openURL('https://ethic.es/2020/06/soluciones-innovadoras-contra-el-desempleo/')}>
            <View style={styles.fourthContainer4}>
            <Image style={styles.icons3} source = {thinking}/>
              <Text style= {styles.secondText3}>¿Y qué soluciones tenemos?</Text> 
            </View>
          </TouchableOpacity>
        </View>
        
        
        

      </ScrollView>
      
    </SafeAreaView>

    
    
    );
  }


  const styles = StyleSheet.create({
    icons:{
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
  secondContainer5:{
    width:'80%',
    height: 250,
    margin:"auto",
    borderRadius: 25,
    marginTop:20,
    marginBottom:20,
    flexDirection: 'row', 
    paddingHorizontal:20
},
  fourthContainer3: {
    width: 150, // Ajusta el ancho de cada elemento
    height: 270, // Ajusta el alto de cada elemento
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 25,
    marginHorizontal: 3, // Espacio entre los elementos
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
  secondText3:{
    fontWeight: "400",
    fontSize:15,
    textAlign:"center",
    color:"#03045E",
    width:120,
    fontFamily:"PoppinsSemiBold",
    marginBottom:10
    
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
    icons2:{
        width:300,
        height:200,
        margin: "auto",
        marginTop:0
    },
    icons3:{
      width:120,
      height:180,
      margin: "auto",
      marginTop:10
  },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer:{
     display:"flex",
     marginTop:30
     
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