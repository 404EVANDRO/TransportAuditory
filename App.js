import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const App = () => {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM'));

  // Carregar dados ao mudar o mês
  useEffect(() => {
    const loadPeople = async () => {
      try {
        const savedData = await AsyncStorage.getItem(currentMonth);
        if (savedData) {
          setPeople(JSON.parse(savedData));
        } else {
          setPeople([]);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadPeople();
  }, [currentMonth]);

  // Adicionar uma nova pessoa
  const addPerson = async () => {
    if (newPerson.trim()) {
      const updatedPeople = [...people, { name: newPerson, paid: false }];
      setPeople(updatedPeople);
      await AsyncStorage.setItem(currentMonth, JSON.stringify(updatedPeople));
      setNewPerson('');
    }
  };

  // Alternar o status de pagamento
  const togglePayment = async (index) => {
    const updatedPeople = [...people];
    updatedPeople[index].paid = !updatedPeople[index].paid;
    setPeople(updatedPeople);
    await AsyncStorage.setItem(currentMonth, JSON.stringify(updatedPeople));
  };

  // Deletar uma pessoa
  const deletePerson = async (index) => {
    const updatedPeople = people.filter((_, i) => i !== index);
    setPeople(updatedPeople);
    await AsyncStorage.setItem(currentMonth, JSON.stringify(updatedPeople));
  };

  // Mudar o mês
  const changeMonth = (month) => {
    setCurrentMonth(month);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auditoria de Pagamentos de Transporte</Text>
      <Text style={styles.subtitle}>Mês: {moment(currentMonth).format('MMMM YYYY')}</Text>
      <TextInput
        style={styles.input}
        placeholder="Adicionar pessoa"
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
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletePerson(index)}
              >
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.monthSelector}>
        <TouchableOpacity
          style={styles.monthButton}
          onPress={() => changeMonth(moment(currentMonth).subtract(1, 'month').format('YYYY-MM'))}
        >
          <Text style={styles.monthButtonText}>Mês Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.monthButton}
          onPress={() => changeMonth(moment(currentMonth).add(1, 'month').format('YYYY-MM'))}
        >
          <Text style={styles.monthButtonText}>Próximo Mês</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#0A0A0A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#3DB727',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 10,
  },
  personItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  personName: {
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  paidButton: {
    backgroundColor: '#28a745',
  },
  pendingButton: {
    backgroundColor: '#dc3545',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  monthButton: {
    backgroundColor: '#17a2b8',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  monthButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;