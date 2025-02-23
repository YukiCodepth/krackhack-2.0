// Campus Marketplace App (React Native + Firebase)

import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [listings, setListings] = useState([]);
  const [newItem, setNewItem] = useState("");

  // User Authentication
  const register = () => createUserWithEmailAndPassword(auth, email, password).catch(alert);
  const login = () => signInWithEmailAndPassword(auth, email, password).catch(alert);

  // Add Listing
  const addListing = async () => {
    if (newItem) {
      await addDoc(collection(db, "listings"), { name: newItem });
      setNewItem("");
      fetchListings();
    }
  };

  // Fetch Listings
  const fetchListings = async () => {
    const querySnapshot = await getDocs(collection(db, "listings"));
    setListings(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Campus Marketplace</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="Register" onPress={register} />
      <Button title="Login" onPress={login} />
      
      <TextInput placeholder="Add Item" value={newItem} onChangeText={setNewItem} />
      <Button title="Post Listing" onPress={addListing} />
      
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
