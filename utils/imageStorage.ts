import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// env variables dont work weith firebase :/
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDOiWTdBYRCpbkp-8ErrBaQW-YZAgAQb08",
  authDomain: "freshta-af012.firebaseapp.com",
  projectId: "freshta-af012",
  storageBucket: "freshta-af012.appspot.com",
  messagingSenderId: "132587252587",
  appId: "1:132587252587:web:a402ab899d0cd90f32fa2e",
  measurementId: "G-RBS1QFF5B3",
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
