<script setup>
import Link from '../../components/Link.vue'
import { useRouter } from 'vue-router'
import useImage from '../../composables/useImage'
import { reactive } from 'vue';
import { useProductsStore } from '../../stores/products'

const { url, isImageUploaded, onFileChange } = useImage()
const products = useProductsStore()
const router = useRouter()

const formData = reactive({
    name: '',
    category: '',
    price: '',
    availability: '',
    image: ''
})

const submitHandler = async data => {
    // console.log(data)
    const { image, ...values } = data
    try {
        await products.createProduct({
            ...values,
            image: url.value
        })
        router.push({name:'products'})
    } catch (error) {
        console.log(error);
    }
}

</script>
<template>
    <div>
        <Link to="products">
        Volver
        </Link>
        <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>
        <div class="flex justify-center bg-white shadow">
            <div class="mt-10 p-10 w-full 2xl:w-2/4">
                <FormKit type="form" submit-label="Agregar Producto"
                    incomplete-messagge="No se pudo enviar revisar mensajes" @submit="submitHandler">
                    <FormKit type="text" label="Nombre" name="name" placeholder="Nombre del Producto" validation="required"
                        :validation-messages="{ required: 'El nombre del producto es obligatorio' }"
                        v-model.trim="formData.name" />
                    <FormKit type="file" label="Imagen Producto" name="image" placeholder="Imagen del Producto"
                        validation="required" :validation-messages="{ required: 'La imagen del producto es obligatorio' }"
                        accept=".jpg" multiple="false" @change="onFileChange" v-model.trim="formData.image" />
                    <div v-if="isImageUploaded">
                        <p class="font-black"></p>
                        <img :src="isImageUploaded" alt="nueva imagen producto" class="w-32" />
                    </div>
                    <FormKit type="select" label="Categoría" name="category" placeholder="Categoría del Producto"
                        validation="required"
                        :validation-messages="{ required: 'La categoría del producto es obligatorio' }"
                        :options="products.categoryOptions" v-model.trim="formData.category" />
                    <FormKit type="number" label="Precio" name="price" placeholder="Precio del Producto"
                        validation="required" :validation-messages="{ required: 'El precio del producto es obligatorio' }"
                        min="0" step="10" v-model.number="formData.price" />
                    <FormKit type="number" label="Disponibles" name="availability" placeholder="Cantidad disponible"
                        validation="required" :validation-messages="{ required: 'La cantidad de productos es obligatorio' }"
                        min="1" v-model.number="formData.availability" />
                </FormKit>
            </div>
        </div>

    </div>
</template>

