
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'react-native-document-picker';
import * as FileSystem from 'react-native-fs';

const FileUploadSummary = () => {
  const [fileContent, setFileContent] = useState('');
  const [summary, setSummary] = useState('');

  // Function to summarize the file content (for now, truncating the text)
  const summarizeFileContent = (content) => {
    return content.length > 200 ? content.substring(0, 200) + '...' : content;
  };

  // Handles file selection and reading
  const handleFileUpload = async () => {
    try {
      // Open the file picker
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // Read the file's content
      const filePath = res.uri;
      const fileContent = await FileSystem.readFile(filePath, 'utf8');

      // Store file content and generate a summary
      setFileContent(fileContent);
      const fileSummary = summarizeFileContent(fileContent);
      setSummary(fileSummary);

    } catch (error) {
      console.error('Error reading file:', error);
      setSummary('Failed to read the file.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload a File</Text>

      {/* Button to trigger file upload */}
      <TouchableOpacity onPress={handleFileUpload} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Choose File</Text>
      </TouchableOpacity>

      {/* Display file summary */}
      {summary && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>File Summary:</Text>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    width: '100%',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#555',
  },
});

export default FileUploadSummary;
