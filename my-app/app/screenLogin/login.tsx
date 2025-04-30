import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import api from "../../services/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const response = await api.post("/auth/login", { email, password });
      Alert.alert("Bem-vindo", response.data.user.email);
      // salvar user em contexto ou AsyncStorage
    } catch (error: any) {
      Alert.alert("Erro no login", error.response?.data?.message || "Erro inesperado");
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/Mind Sync (2) 1.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.container2}>
        <Text style={styles.login}>Login</Text>

        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#0037FF"
            keyboardType="email-address"
            value={email} onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#0037FF"
            value={password} 
            secureTextEntry onChangeText={setPassword} 
            
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Ainda não possui Cadastro? 
          </Text>
          <TouchableOpacity onPress={() => router.push('/screenSignUp/signUp')}>
            <Text style={styles.registerLink}> Registre-se</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A0D4FF", 
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    marginTop: 60,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  container2: {
    backgroundColor: "#41BECE", 
    width: "100%",
    flex: 1,
    borderTopLeftRadius: 100,
    paddingTop: 40, 
    alignItems: "center", 
    paddingHorizontal: 30, 
  },
  login: {
    fontSize: 32,
    color: "#ffff",
    fontFamily: "Verdana",
    marginBottom: 40, 
    marginTop: 20, 
  },
  formContainer: {
    width: "100%", 
    alignItems: "flex-start", 
  },
  input: {
    backgroundColor: "#A0D4FF",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: "#ffff",
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    color: "#ffff",
    marginBottom: 5,
    fontFamily: "Verdana",
    alignSelf: "flex-start", 
    marginLeft: 10, 
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 70, 
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
  registerContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Verdana",
  },
  registerLink: {
    color: "#0037FF",
    fontSize: 14,
    fontFamily: "Verdana",
    fontWeight: "bold",
  },
});
