
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

type PermissionType = "granted" | "denied" | "idle";

export default function useImagePicker() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [permission, setPermission] = useState<PermissionType>('idle');

  const updatePermissionState = (cameraGranted: boolean, libraryGranted: boolean) => {
    if (cameraGranted && libraryGranted) {
      setPermission("granted");
    } else if (!cameraGranted || !libraryGranted) {
      setPermission("denied");
    }
  };

  async function getImage() {
    try {
      // Check/request media library permission first
      const currentLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!currentLibrary.granted) {
        setPermission("denied");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'], // Use array syntax for SDK 50+
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0]);
        setPermission("granted");
      }
    } catch (error) {
      console.error("Failed to pick image:", error);
    }
  }

  async function launchCamera() {
    try {
      // Request both permissions concurrently
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      updatePermissionState(cameraStatus.granted, libraryStatus.granted);

      if (!cameraStatus.granted || !libraryStatus.granted) {
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0]);
      }
    } catch (error) {
      console.error("Failed to launch camera:", error);
    }
  }

  async function checkExistingPermissions() {
    try {
      const currentCamera = await ImagePicker.getCameraPermissionsAsync();
      const currentLibrary = await ImagePicker.getMediaLibraryPermissionsAsync();

      updatePermissionState(currentCamera.granted, currentLibrary.granted);
    } catch (error) {
      console.error("Failed checking permissions:", error);
    }
  }

  return {
    image,
    permission,
    getImage,
    launchCamera,
    checkExistingPermissions,
  };
}

