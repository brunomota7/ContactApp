import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import api from "../services/api";

const AddContactScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleAddContact = async () => {
        if (!name || !email || !phone) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            await api.post('/add', { name, email, phone });
            Alert.alert('Sucesso', 'Contato adicionado com sucesso!');
            navigation.goBack(); // Volta para a tela anterior
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível adicionar o contato.');
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* <Text style={styles.title}>Adicionar Contato</Text> */}

                <TextInput 
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput 
                    style={styles.input}
                    placeholder="E-mail"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput 
                    style={styles.input}
                    placeholder="Telefone"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />

                <TouchableOpacity style={styles.button} onPress={handleAddContact}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#343a40',
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        color: '#495057',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddContactScreen;
