import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, 
    backgroundColor: '#121212',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: width * 0.025,
    marginTop: width * 0.05,
    textAlign: 'center',
    color: '#E0E0E0',
  },
  subtitle: {
    fontSize: width * 0.045,
    marginBottom: width * 0.05,
    textAlign: 'center',
    color: '#B0B0B0',
  },
  changeButton: {
    backgroundColor: '#00ADB5',
    padding: width * 0.04,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: width * 0.05,
    width: width * 0.8, 
    alignSelf: 'center',
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
    backgroundColor: '#7DDA58',
    padding: width * 0.04,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: width * 0.05,
    width: width * 0.8,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  list: {
    marginTop: width * 0.025,
  },
  personItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.04,
    borderColor: '#ccc',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: width * 0.025,
  },
  personName: {
    fontSize: width * 0.045,
    color: '#FFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentButton: {
    padding: width * 0.03,
    borderRadius: 5,
    marginRight: width * 0.025,
  },
  paidButton: {
    backgroundColor: '#28a745',
  },
  pendingButton: {
    backgroundColor: '#dc3545',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ffc107',
    padding: width * 0.03,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: width * 0.05,
  },
  monthButton: {
    backgroundColor: '#00ADB5',
    padding: width * 0.04,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: width * 0.01,
    alignItems: 'center',
  },
  monthButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});
