import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import api from "../../services/api"; // seu arquivo api.ts

export default function SignUp() {
  const [nome, setNome] = useState(""); // ainda não usado no backend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
      });

      Alert.alert("Cadastro feito!", "Verifique seu e-mail com o código OTP.");
      // redirecionar para tela de verificação OTP, se desejar
    } catch (error: any) {
      const msg = error.response?.data?.message || "Erro ao cadastrar.";
      Alert.alert("Erro", msg);
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
        <Text style={styles.login}>Cadastro</Text>

        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#0037FF"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.inputLabel}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#0037FF"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>Senha:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#0037FF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
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
    marginTop: 10,
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
