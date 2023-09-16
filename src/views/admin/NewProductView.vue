<script setup>
import Link from '../../components/Link.vue'
</script>
<template>
    <div>
        <Link to="products">
        Volver
        </Link>
        <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>
        <div class="flex justify-center bg-white shadow">
            <div class="mt-10 p-10 w-full 2xl:w-2/4">
                <FormKit type="form" submit-label="Agregar Producto">
                    <FormKit type="text" label="Nombre" name="name" placeholder="Nombre del Producto" validation="required"
                        :validation-messages="{ required: 'El nombre del producto es obligatorio' }" />
                    <FormKit type="file" label="Imagen Producto" name="image" placeholder="Imagen del Producto"
                        validation="required" :validation-messages="{ required: 'La imagen del producto es obligatorio' }"
                        accept=".jpg" multiple="false" />
                    <FormKit type="select" label="Categoría" name="category" placeholder="Categoría del Producto"
                        validation="required" :validation-messages="{ required: 'La categoría del producto es obligatorio' }"
                        :options="[1,2,3]" />
                        <FormKit type="number" label="Precio" name="price" placeholder="Precio del Producto"
                        validation="required" :validation-messages="{ required: 'El precio del producto es obligatorio' }"
                        min="0" step="10"/>
                        <FormKit type="number" label="Disponibles" name="availability" placeholder="Cantidad disponible"
                        validation="required" :validation-messages="{ required: 'La cantidad de productos es obligatorio' }"
                        min="1"/>
                </FormKit>
            </div>
        </div>

    </div>
</template>

