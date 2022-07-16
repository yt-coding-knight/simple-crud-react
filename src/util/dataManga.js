import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../config/firebase";

export async function addManga(data, imgUrl) {
  try {
    return await addDoc(collection(db, "manga"), {
      createdAt: serverTimestamp(),
      imgUrl,
      ...data,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getManga(setManga) {
  try {
    let data = [];
    const querySnapshot = await getDocs(collection(db, "manga"));
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return setManga(data);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteManga(id) {
  try {
    return await deleteDoc(doc(db, "manga", id));
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleManga(id) {
  try {
    const docRef = doc(db, "manga", id);
    const docSnap = await getDoc(docRef);
    let data = {};

    if (!docSnap.exists) return data;
    data = { id: docSnap.id, ...docSnap.data() };
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateManga(id, data) {
  try {
    const mangaRef = doc(db, "manga", id);
    return await updateDoc(mangaRef, {
      updatedAt: serverTimestamp(),
      ...data,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file) {
  try {
    const uniqueName = +new Date() + file.name;
    const storageRef = ref(storage, `images/${uniqueName}`);
    const uploadTask = await uploadBytes(storageRef, file);
    const imgUrl = await getDownloadURL(uploadTask.ref);

    return imgUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(imgUrl) {
  try {
    const imgRef = ref(storage, imgUrl);

    return await deleteObject(imgRef);
  } catch (error) {
    console.log(error);
  }
}
