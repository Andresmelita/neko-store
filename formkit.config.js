import { generateClasses } from '@formkit/themes'

const config = {
    config: {
        classes: generateClasses({
            global:{
                label: 'block mb-1 font-bold text-lg',
                message:'text-red-500',
                wrapper:'space-y-2 mb-3'
            },
            text: {
                message:'$reset text-red-400'
            },
            file: {
            },
            select: {
            },
            number: {
            }
        })
    }
}

export default config