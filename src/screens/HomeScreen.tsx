import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const HomeScreen = ({ navigation }: any) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Função para buscar contatos
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/listar');
      setContacts(response.data);
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza os contatos sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      fetchContacts();
    }, [])
  );

  // Função para puxar a lista ao arrastar para baixo
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchContacts();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Contatos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <View style={styles.contactCard}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.phone}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddContact')}>
        <Text style={styles.addButtonText}>+ Adicionar Contato</Text>
      </TouchableOpacity>
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
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
