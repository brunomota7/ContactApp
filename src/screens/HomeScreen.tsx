import { useEffect, useState } from "react";
import api from "../services/api";
import { ActivityIndicator, Text, View, FlatList, StyleSheet } from "react-native";

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const HomeScreen = () => {
    const [contacts, setContact] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await api.get('/listar');
                setContact(response.data);
            } catch (error) {
                console.error('Erro ao buscar contatos: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Contatos</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <FlatList 
                    data={contacts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.contactCard}>
                            <Text style={styles.contactName}>{item.name}</Text>
                            <Text>{item.email}</Text>
                            <Text>{item.phone}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    contactCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
