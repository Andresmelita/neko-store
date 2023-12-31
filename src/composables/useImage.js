import { useFirebaseStorage } from 'vuefire'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { uid } from 'uid'
import { ref, computed } from 'vue'

export default function useImage() {
    const url = ref(null)
    const storage = useFirebaseStorage() 

    const onFileChange= e => {
        const file = e.target.files[0]
        const filename = uid() + '.jpg'
        const sRef = storageRef(storage, '/productos/' + filename)

        //subir el archivo
        const uploadTask = uploadBytesResumable(sRef, file)
        uploadTask.on('state_changed',
            () => {},
            (error) => console.log(error),
            () => {
                // Upload is complete
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL)=>{
                        url.value = downloadURL
                    })
            }

        )
    }
const isImageUploaded = computed(() => {
    return url.value ? url.value : null
})

    return {
        url,
        isImageUploaded,
        onFileChange
    }
}