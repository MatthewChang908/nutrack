import { 
    db,
    collection,
    addDoc,
 } from "../firebase"

export const createUserDoc = async (userUid, phone) => {
    try {
        console.log('HELLO');
        const docRef = await addDoc(collection(db, 'Users'), {
            id: userUid,
            phone: phone,
            trips: []
        });
        console.log('User added to firestore.');
    } catch (e) {
        console.log("Error adding document.");
    };
}