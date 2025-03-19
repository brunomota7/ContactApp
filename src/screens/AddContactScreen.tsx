import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../services/api";


const AddContactScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleAddContact = async () => {
        if (!name || !email || !phone) {
            Alert.alert('Error', 'Por favor, prencha todos os campos.')
            return;
        }

        try {
            await api.post('/add', { name, email, phone });
            Alert.alert('Sucesso', 'Contato adicionado com sucesso!');
            navigation.goBack(); // Volta para a tela anterior
        } catch (error) {
            Alert.alert('Error', 'Não foi possível adicionar o contato.');
            console.log(error);
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Contato</Text>

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddContactScreen;