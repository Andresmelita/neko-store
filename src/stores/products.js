import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useFirestore, useCollection } from 'vuefire'
import { collection, addDoc, where, query, limit, orderBy } from 'firebase/firestore'

export const useProductsStore = defineStore('products', () => {

    const db = useFirestore()

    const categories = [
        { id: 1, name: 'Sudaderas' },
        { id: 2, name: 'Tenis' },
        { id: 3, name: 'Lentes' },
    ]

    const q = query(
        collection(db, 'products'),
        //where('category', '==', 3)
        //limit(10)
        orderBy('name', 'asc')
    )
    const productsCollection = useCollection(q)

    async function createProduct(product) {
        await addDoc(collection(db, 'products'), product)
    }

    async function updateProduct(docRef, product) {
        console.log(product)
    }

    const categoryOptions = computed(()=>{
        const options = [
            {label: 'Seleccione', value: '', attrs: {disabled: true}},
            ...categories.map(category => (
                {label: category.name, value: category.id}
            ))
        ]
        return options
    })

    const noResults = computed(()=> productsCollection.value.length === 0)

    return {
        createProduct,
        updateProduct,
        productsCollection,
        categoryOptions,
        noResults
    }
})

