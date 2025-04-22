import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Task from '../components/Task';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTimeText, setDateTimeText] = useState('');
  const [deadlineText, setDeadlineText] = useState('');
  const [priority, setPriority] = useState('Low');

  // Bottom sheet animation
  const sheetHeight = useRef(new Animated.Value(60)).current;
  const [formOpen, setFormOpen] = useState(false);
  const EXPANDED_HEIGHT = 350;
  const COLLAPSED_HEIGHT = 60;

  const toggleForm = () => {
    Animated.timing(sheetHeight, {
      toValue: formOpen ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start(() => setFormOpen(!formOpen));
  };

  // Add a new task
  const addTask = () => {
    if (title && description && dateTimeText && deadlineText) {
      const newTask = {
        title,
        description,
        dateTime: dateTimeText,
        deadline: deadlineText,
        priority,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
      setDateTimeText('');
      setDeadlineText('');
      setPriority('Low');
      Keyboard.dismiss();
      toggleForm();
    } else alert('Fill all fields');
  };

  // Toggle single task completion
  const completeTask = (index) => {
    const copy = [...tasks];
    copy[index].completed = !copy[index].completed;
    setTasks(copy);
  };

  // Delete a task
  const deleteTask = (index) => {
    const copy = [...tasks];
    copy.splice(index, 1);
    setTasks(copy);
  };

  // Mark all tasks as completed
  const completeAllTasks = () => {
    setTasks(tasks.map(t => ({ ...t, completed: true })));
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch {
      alert('Logout failed');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with All Done & Logout */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Today's Tasks</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={completeAllTasks} style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>All Done</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Task list */}
      <ScrollView contentContainerStyle={styles.list}>
        {tasks.map((task, idx) => (
          <Task
            key={idx}
            task={task}
            onComplete={() => completeTask(idx)}
            onDelete={() => deleteTask(idx)}
          />
        ))}
      </ScrollView>

      {/* Bottom Sheet Form */}
      <Animated.View style={[styles.sheet, { height: sheetHeight }]}>        
        <TouchableOpacity style={styles.handle} onPress={toggleForm} activeOpacity={0.7}>
          <Text style={styles.handleText}>{formOpen ? 'Close ⌄' : 'Add Task ⌃'}</Text>
        </TouchableOpacity>
        {formOpen && (
          <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
            <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
            <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
            <TextInput style={styles.input} placeholder="Date‑Time (e.g. 2025-04-23 10:00)" value={dateTimeText} onChangeText={setDateTimeText} />
            <TextInput style={styles.input} placeholder="Deadline (e.g. 2025-04-24)" value={deadlineText} onChangeText={setDeadlineText} />
            <View style={styles.pickerContainer}>
              <Picker selectedValue={priority} onValueChange={setPriority} mode="dropdown">
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="High" value="High" />
              </Picker>
            </View>
            <TouchableOpacity style={styles.submitBtn} onPress={addTask}>
              <Text style={styles.submitText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
}
{/* Style fn*/}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8EAED' },
  headerBar: {
    paddingTop: 40, paddingHorizontal: 20, paddingBottom: 10,
    backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  headerButtons: { flexDirection: 'row' },
  headerBtn: { marginLeft: 10 },
  headerBtnText: { color: '#007AFF', fontSize: 14, fontWeight: '600' },
  list: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 },
  sheet: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 10,
  },
  handle: {
    height: 60, justifyContent: 'center', alignItems: 'center',
    borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: '#f0f0f0',
  },
  handleText: { fontSize: 16, fontWeight: '600' },
  form: { padding: 20, paddingBottom: 40 },
  input: {
    backgroundColor: '#f9f9f9', borderRadius: 30,
    paddingHorizontal: 15, paddingVertical: Platform.OS === 'android' ? 8 : 12,
    marginBottom: 12,
  },
  pickerContainer: { backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 12 },
  submitBtn: { backgroundColor: '#007AFF', borderRadius: 30, paddingVertical: 12, alignItems: 'center', marginTop: 10 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
