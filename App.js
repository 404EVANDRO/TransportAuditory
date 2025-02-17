import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import styles from './styles';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM'));

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const savedData = await AsyncStorage.getItem(currentMonth);
        setPeople(savedData ? JSON.parse(savedData) : []);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    loadPeople();
  }, [currentMonth]);

  const saveData = async (data) => {
    await AsyncStorage.setItem(currentMonth, JSON.stringify(data));
    setPeople(data);
  };

  const addPerson = () => {
    if (newPerson.trim()) {
      const updatedPeople = [...people, { name: newPerson, paid: false }];
      saveData(updatedPeople);
      setNewPerson('');
    }
  };

  const togglePayment = (index) => {
    const updatedPeople = [...people];
    updatedPeople[index].paid = !updatedPeople[index].paid;
    saveData(updatedPeople);
  };

  const deletePerson = (index) => {
    const updatedPeople = people.filter((_, i) => i !== index);
    saveData(updatedPeople);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auditoria de Pagamentos de Transporte</Text>
      <Text style={styles.subtitle}>Mês: {moment(currentMonth).format('MMMM YYYY')}</Text>

      <TextInput
        style={styles.input}
        placeholder="Adicionar pessoa"
        placeholderTextColor="#B0B0B0"
        value={newPerson}
        onChangeText={setNewPerson}
      />
      <TouchableOpacity style={styles.addButton} onPress={addPerson}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>

      <ScrollView style={styles.list}>
        {people.map((person, index) => (
          <View key={index} style={styles.personItem}>
            <Text style={styles.personName}>{person.name}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.paymentButton, person.paid ? styles.paidButton : styles.pendingButton]}
                onPress={() => togglePayment(index)}
              >
                <Text style={styles.paymentButtonText}>{person.paid ? 'Pago' : 'Pendente'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deletePerson(index)}>
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.monthSelector}>
        <TouchableOpacity
          style={styles.monthButton}
          onPress={() => setCurrentMonth(moment(currentMonth).subtract(1, 'month').format('YYYY-MM'))}
        >
          <Text style={styles.monthButtonText}>Mês Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.monthButton}
          onPress={() => setCurrentMonth(moment(currentMonth).add(1, 'month').format('YYYY-MM'))}
        >
          <Text style={styles.monthButtonText}>Próximo Mês</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
