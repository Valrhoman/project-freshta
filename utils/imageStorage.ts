import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); // Initialize Firebase Storage instance

export async function saveImage(formData: any): Promise<string> {
  // Generate a unique filename or identifier for the image
  const fileName = generateUniqueFilename(formData.name);

  // Create a reference to the storage bucket and the file path
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, `products-images/`);
  const spaceRef = ref(imagesRef, fileName);

  // Upload the image to Firebase Storage
  const uploadTask = uploadBytesResumable(spaceRef, formData.image);

  // Listen for state changes, errors, and completion of the upload.
  try {
    const snapshot = await getUploadTaskSnapshot(uploadTask);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    console.log("Image saved successfully");
    return downloadUrl;
  } catch (error: any) {
    console.error("Error saving image to firebase storage", error);
    throw new Error(error.message);
  }
}

function generateUniqueFilename(name: string): string {
  const timestamp = Date.now(); // Get the current timestamp
  const sanitizedProductName = name.replace(/\s+/g, "_").toLowerCase(); // Sanitize the product name by replacing spaces with underscores and converting to lowercase
  const uniqueFilename = `${timestamp}_${sanitizedProductName}.jpg`; // Combine the timestamp and sanitized product name with an underscore
  console.log(uniqueFilename);

  return uniqueFilename;
}

async function getUploadTaskSnapshot(uploadTask: any): Promise<any> {
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error: any) => reject(error),
      () => resolve(uploadTask.snapshot)
    );
  });
}
