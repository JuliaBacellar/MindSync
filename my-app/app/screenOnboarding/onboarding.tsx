import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Onboarding(){
  const router = useRouter();
    return(
        <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Seja Bem-vindo</Text>
          <Image
          source={require("../../assets/Mind Sync (2) 1.png")}
          style={styles.image}/>
          <Text style={styles.phrase}>
            Conectando você ao seu {"\n"} bem-estar mental
          </Text>
          <TouchableOpacity style={styles.button} onPress={()=> router.push("/screenLogin/login")}>
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 34,
        backgroundColor: "#A0D4FF",
        alignItems: "center", 
        justifyContent: "center",
      },
      content: {
        width: "100%", 
        alignItems: "center", 
        justifyContent: "space-between", 
        flex: 1, 
        paddingBottom: 30, 
      },
      title: {
        fontSize: 18,
        fontFamily: "Verdana",
        color: "#0037FF",
        marginTop:30,
        marginBottom: 10, 
      },
      image: {
        width: 200,
        height: 200,
        marginBottom: 20, 
      },
      phrase: {
        fontSize: 18, 
        fontFamily: "Verdana",
        color: "#FFFF", 
        textAlign: "center", 
        marginBottom: 20, 
      },
      button: {
        backgroundColor: "#0037FF", 
        paddingVertical: 15, 
        paddingHorizontal: 40, 
        borderRadius: 10, 
        alignItems: "center", 
      },
      buttonText: {
        fontSize: 18, 
        color: "#FFFFFF", 
        fontFamily: "Verdana",
      },
    });