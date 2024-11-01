
import React, {useCallback, useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, SafeAreaView, ScrollView, Button, TouchableOpacity} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import SharedValues from '../../components/animationMVV';
import Navigation from '../../routes'
import people from '../../assets/images/people.png'
import iconmenu from '../../assets/images/iconmenu.png';

export default function SignUpMain({ navigation }) {
    
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
        <View style={styles.navBar} onLayout={onLayout}>
          <Text style={styles.secondTitleNav}>  ScanVice</Text>
        </View>
        <View style= {styles.container} onLayout={onLayout} >
          <Text style= {styles.mainTitle}>Registrate</Text>
          <Text style= {styles.mainText}>¡Únete y se parte del cambio!</Text>
        </View>
        
        <View style={styles.secondContainer}>
            
            <TouchableOpacity style={styles.button2} mode="contained" onPress={() => navigation.navigate('SignUpEmployer')}><Text style={styles.buttonText}>Inicia como Empleador</Text></TouchableOpacity>       
              
        </View>
        <View style={styles.secondContainer}>
            
            <TouchableOpacity style={styles.button2} mode="contained" onPress={() => navigation.navigate('SignUpEmployee')}><Text style={styles.buttonText}>Inicia como Trabajador</Text></TouchableOpacity>         
        </View>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14,fontFamily:"PoppinsSemiBold", }}> Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LogInMain")}>
            <Text style={{ color: '#03045E', fontWeight: '600', fontSize: 14,fontFamily:"PoppinsSemiBold", }}>Iniciar Sesión</Text>
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
    icons2:{
        width:300,
        height:200,
        margin: "auto",
        marginTop:0
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
        backgroundColor: "#D9D9D9",
        height: 60,
        margin:"auto",
        borderRadius: 25,
        marginTop:20,
    },
    button1:{
        width: 100,
        height:100,
        borderRadius:50,
        justifyContent:"center",
        margin:"auto",
        display: "flex",
        backgroundColor: "#D9D9D9",
        
    },
    button2:{
        width: 329,
        height:60,
        borderRadius:25,
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
      marginTop:220,
      fontWeight: "600",
      fontSize:50,
      color:"#03045E",
      fontFamily:"PoppinsBold",
      marginBottom:0,
    },
    secondTitle:{
      fontWeight: "600",
      fontSize:30,
      color:"#03045E",
      textAlign:"center",
      marginTop:10,
      fontFamily:"PoppinsSemiBold",
      
    },
    secondTitleNav:{
        fontWeight: "600",
        fontSize:30,
        color:"#03045E",
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
      fontSize:18,
      color:"#03045E",
      
       fontFamily:"PoppinsSemiBold"
    },
    secondText:{
      fontWeight: "400",
      fontSize:13,
      textAlign:"center",
      width:220,
      color:"#03045E",
      margin:"auto",
      marginTop:0,
      fontFamily:"PoppinsSemiBold"
    },
    navBar:{
      justifyContent: "center",
      display: "flex",
      height:60,
      marginTop: 30,
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