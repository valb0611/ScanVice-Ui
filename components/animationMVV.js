
import React, {useCallback, useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, SafeAreaView, ScrollView, Button, TouchableOpacity} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'

//images
import pyramid from '../assets/images/pyramid.png'
import vision from '../assets/images/vision.png'
import value from '../assets/images/value-proposition.png'

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
        const handlePress3 = () => {
            if (isExpanded) {
                editHeight3.value = 0;
            } else {
                editHeight3.value = 450;
                editHeight1.value = 0;
                editHeight2.value = 0;
            }
            setIsExpanded(!isExpanded);
        };
        
            return (
                <>
                <View style={styles.displayText}>
                    <TouchableOpacity  
                        style={styles.button1}  
                        onPress={handlePress1}>
                            
                        
                            <Image style={styles.icons} source = {pyramid} />
                    </TouchableOpacity>
                    <TouchableOpacity  
                        style={styles.button1}  
                        onPress={handlePress2}>
                            
                        
                            <Image style={styles.icons} source = {vision} />

                    </TouchableOpacity>
                    <TouchableOpacity  
                        style={styles.button1}  
                        onPress={handlePress3}>
                            
                        
                            <Image style={styles.icons} source = {value} />
                    </TouchableOpacity>
                </View>
                
                <Animated.View style={[{ width:'80%', backgroundColor: 'rgba(217, 217, 217, 0.5)', margin:"auto",borderRadius:25, marginTop:30}, myStyle1]}>
                    <Text style= {styles.secondTitle}>Misión</Text>
                    <Text style= {styles.secondMainText}>Nuestra misión es ser el mejor apoyo para todas esas personas que tienen un trabajo temporal y quieren ampliar su emprendimiento</Text>
                </Animated.View>

                <Animated.View style={[{ width:'80%', backgroundColor: 'rgba(217, 217, 217, 0.5)', margin:"auto", borderRadius:25}, myStyle2]}>
                    <Text style= {styles.secondTitle}>Visión</Text>
                    <Text style= {styles.secondMainText}>ScanVice tiene como visión convertirse en el mejor servicio global de los servicios express como una nueva plataforma de economía compartida.  </Text>
                </Animated.View>
                
                <Animated.View style={[{ width:'80%', backgroundColor: 'rgba(217, 217, 217, 0.5)', margin:"auto",borderRadius:25}, myStyle3,]}>
                    <Text style= {styles.secondTitle}>Valores</Text>
                    <Text style= {styles.secondMainText}>Confiabilidad: Ofrecer una plataforma segura con profesionales y servicios de calidad.</Text>
                    <Text style= {styles.secondMainText2}>Innovación: Adaptarse a las tendencias tecnológicas y necesidades para mejorar la experiencia del usuario.</Text>
                    <Text style= {styles.secondMainText2}>Comunidad: Fomentar un sentido de apoyo mutuo, conectando a los usuarios con servicios locales y profesionales.</Text>
                    
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