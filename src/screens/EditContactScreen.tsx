import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import api from "../services/api";
import Contact from "../models/Contact";

const EditContactScreen = ({ route, navigation }: any) => {
    const { contact } = route.params; // Pega os dados do contato enviado via navigation
    const [name, setName] = useState(contact.name);
    const [email, setEmail] = useState(contact.email);
    const [phone, setPhone] = useState(contact.phone);

    const updateContact = async () => {
        try {
            const updatedContact = { name, email, phone };
            await api.put(`/atualizar/${contact.id}`, updatedContact);
            Alert.alert('Sucesso', 'Contato atualizado com sucesso!');
            
            // Atualiza os contatos antes de voltar
            navigation.goBack({ shouldRefresh: true });
        } catch (error) {
            console.error('Erro ao atualizar contato:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o contato.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* <Text style={styles.title}>Editar Contato</Text> */}

                <TextInput 
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput 
                    style={styles.input}
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <TextInput 
                    style={styles.input}
                    placeholder="Telefone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />

                <TouchableOpacity style={styles.saveButton} onPress={updateContact}>
                    <Text style={styles.saveButtonText}>Salvar</Text>
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
    saveButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditContactScreen;
