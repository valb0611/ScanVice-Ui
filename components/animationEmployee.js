
import React, {useCallback, useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, SafeAreaView, ScrollView, Button, TouchableOpacity} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'

//images
import unemployed from '../assets/images/desempleados2.png'
import thinking from '../assets/images/thinking.png'

export default function SharedValues() {

        const [fontsLoaded] = useFonts({
            PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
            PoppinsBold:require("../assets/fonts/Poppins-Bold.ttf"),
            PoppinsExtraBold:require("../assets/fonts/Poppins-ExtraBold.ttf"),
            PoppinsBlack:require("../assets/fonts/Poppins-Black.ttf"),
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
        
        const [isExpanded, setIsExpanded] = useState(false);

        
        const editHeight1 = useSharedValue(0);
        const editHeight2 = useSharedValue(0);
        const editHeight3 = useSharedValue(0);

        const config = {
            duration: 500,
        };

        const myStyle1 = useAnimatedStyle(() => {
            return {
                height: withTiming(editHeight1.value, config),
            };
        });
        const myStyle2 = useAnimatedStyle(() => {
            return {
                height: withTiming(editHeight2.value, config),
            };
        });
        const myStyle3 = useAnimatedStyle(() => {
            return {
                height: withTiming(editHeight3.value, config),
            };
        });

        const handlePress1 = () => {
            if (isExpanded) {
                editHeight1.value = 0;
            } else {
                editHeight1.value = 220;
                editHeight2.value = 0;
                editHeight3.value = 0;
            }
            setIsExpanded(!isExpanded);
        };
        const handlePress2 = () => {
            if (isExpanded) {
                editHeight2.value = 0;
            } else {
                editHeight2.value = 220;
                editHeight1.value = 0;
                editHeight3.value = 0;
            }
            setIsExpanded(!isExpanded);
        };

        
            return (
                <>

                <View style={styles.secondContainer5}>

                <TouchableOpacity onPress={handlePress1}> 
                <View style={styles.fourthContainer3}>
                <Image style={styles.icons3} source = {unemployed}/>
                    <Text style= {styles.secondText3}>¿Estas Desempleado o Inestable?</Text> 
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePress2}> 
                <View style={styles.fourthContainer4}>
                <Image style={styles.icons3} source = {thinking}/>
                    <Text style= {styles.secondText3}>¿Cómo  te podemos ayudar?</Text> 
                </View>
                </TouchableOpacity>
                </View>

                
                
                <Animated.View style={[{ width:'80%', backgroundColor: 'rgba(217, 217, 217, 0.5)', margin:"auto",borderRadius:25, marginTop:30}, myStyle1]}>
                    <Text style= {styles.secondTitle}>ScanVice</Text>
                    <Text style= {styles.secondMainText}>Te ofrecemos la oprtunidad de crear una cuenta en nuestra app donde vas a poder compartir tus datos para ser contactado por personas que necesiten de tus servicios.</Text>
                </Animated.View>

                <Animated.View style={[{ width:'80%', backgroundColor: 'rgba(217, 217, 217, 0.5)', margin:"auto", borderRadius:25}, myStyle2]}>
                    <Text style= {styles.secondTitle}>¿Qué ofrecemos?</Text>
                    <Text style= {styles.secondMainText}>ScanVice te ofrece la oprtunidad de ser más reconocido gracias a la publicación de una tarjeta de presentación virtual, con la cual las personas te pueden contactar.  </Text>
                </Animated.View>
                

                    
                    
                </>
            )
}


  const styles = StyleSheet.create({
    icons:{
        width:60,
        height:60,
        margin:"auto"
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
        backgroundColor: "rgba(217, 217, 217, 0.5)",
        height: 250,
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
        backgroundColor: "rgba(217, 217, 217, 0.5)",
        
    },
    button2:{
        width: 329,
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
        color:"rgba(217, 217, 217, 0.5)",
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
      fontSize:60,
      color:"#03045E",
      fontFamily:"PoppinsBold",
      marginBottom:10,
    },
    secondTitle:{
      fontWeight: "600",
      fontSize:30,
      color:"#03045E",
      textAlign:"center",
      marginTop:20,
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
      width:250,
      color:"#03045E",
      margin:"auto",
      marginTop:20,
      fontFamily:"PoppinsSemiBold",
      justifyContent:"center"
      },
      secondMainText2:{
        fontWeight: "400",
        fontSize:15,
        textAlign:"center",
        width:250,
        color:"#03045E",
        margin:"auto",
        marginTop:10,
        fontFamily:"PoppinsSemiBold",
        justifyContent:"center"
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