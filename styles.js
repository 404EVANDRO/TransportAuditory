import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    color: '#E0E0E0',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#B0B0B0',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: '#FFF',
    backgroundColor: '#1E1E1E',
  },
  addButton: {
    backgroundColor: '#00ADB5',
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
    borderColor: '#ccc',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 10,
  },
  personName: {
    fontSize: 16,
    color: '#FFF',
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
    backgroundColor: '#00ADB5',
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
