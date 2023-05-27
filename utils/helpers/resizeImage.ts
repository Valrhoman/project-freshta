import Resizer from "react-image-file-resizer";

const resizeImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      300, // Set the desired width
      300, // Set the desired height
      "JPEG", // Set the output format (e.g., JPEG, PNG)
      70, // Set the image quality (0-100)
      0, // Set the rotation angle (in degrees)
      (response: string | Blob | File | ProgressEvent<FileReader>) => {
        const resizedBlob = response as Blob; // Cast the response to Blob type
        resolve(resizedBlob); // Resolve the Promise with the resized image Blob
      },
      "blob" // Output type: 'blob' or 'base64'
    );
  });
};

export default resizeImage;
