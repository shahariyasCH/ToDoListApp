import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Task component now supports onSelect and selected props
const Task = ({ task, onComplete, onDelete, onSelect, selected }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selectedBackground,
      ]}
      onLongPress={onSelect}
      activeOpacity={0.8}
    >
      {/* Checkbox to toggle completion */}
      <TouchableOpacity
        style={[
          styles.checkbox,
          task.completed && styles.checkboxCompleted,
        ]}
        onPress={onComplete}
      />

      {/* Task details */}
      <View style={styles.details}>
        <Text style={[styles.title, task.completed && styles.titleCompleted]}>
          {task.title}
        </Text>
        <Text style={styles.meta}>Description: {task.description}</Text>
        <Text style={styles.meta}>Date-Time: {task.dateTime}</Text>
        <Text style={styles.meta}>Deadline: {task.deadline}</Text>
        <Text style={styles.meta}>Priority: {task.priority}</Text>
      </View>

      {/* Delete button */}
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
// styling of components
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedBackground: {
    backgroundColor: '#e0f7fa',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#00a2ff',
    borderRadius: 4,
    marginRight: 12,
  },
  checkboxCompleted: {
    backgroundColor: '#00a2ff',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  meta: {
    fontSize: 12,
    color: '#555',
  },
  deleteBtn: {
    marginLeft: 12,
    padding: 6,
    backgroundColor: '#ff4c4c',
    borderRadius: 4,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Task;
