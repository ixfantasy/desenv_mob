import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View, ImagePickerIOS } from 'react-native';
import logo from './assets/photoIcon.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {

  const [selectedImage, setSelectedImage] = React.useState(null);

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 5000);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permissão necessária para acessar a galeria da câmera!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Oops, não é possível compartilhar na sua plataforma!`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  }; 

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Compartilhe esta foto!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      {/* <Image source={{uri: "link"}} style={styles.logo} */}

      <Text style={styles.instructions}>Para compartilhar uma foto, clique no botão abaixo </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Escolher uma foto</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDEDEC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo:{
    width: 200,
    height: 200,
    marginBottom: 10,
  },

  instructions:{
    color: '#641E16',
    textAlign: 'center',
    fontSize: 18,
    padding: 15,
    marginHorizontal: 15,
  },

  button:{
    backgroundColor:"#FFA07A",
    padding: 20,
    borderRadius: 5,
  },

  buttonText:{
    fontSize: 20,
    color: '#641E16',
  },

  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    padding: 30,
  },
});
