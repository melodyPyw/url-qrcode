<template>
    <img v-if="dataUrl" :src="dataUrl">
</template>
<script>
import { ref, watchEffect } from 'vue'
import QRCode from 'qrcode'

const MASK_PATTERNS = [0, 1, 2, 3, 4, 5, 6, 7]
const MAX_QR_VERSION = 40
const TYPES = ['image/png', 'image/jpeg', 'image/webp']
const LEVELS = [
    'low',
    'medium',
    'quartile',
    'high',
    'L',
    'M',
    'Q',
    'H',
];

export default {
    props: {
        toSJISFunc: Function,
        margin: Number,
        scale: Number,
        width: Number,
        height: Number,
        version: {
            type: Number,
            validator: (version) => version === parseInt(String(version), 10) &&
                version > 1 &&
                version <= MAX_QR_VERSION,
        },
        errorCorrectionLevel: {
            type: String,
            validator: (level) => LEVELS.includes(level),
        },
        maskPattern: {
            type: Number,
            validator: (maskPattern) => MASK_PATTERNS.includes(maskPattern),
        },
        quality: {
            type: Number,
            validator: (quality) => quality === parseFloat(String(quality)) && quality >= 0 && quality <= 1,
        },
        type: {
            type: String,
            validator: (type) => TYPES.includes(type),
        },
        color: {
            type: Object,
            default: () => ({ 
                dark: '#000000',
                light: '#FFFFFF' 
            }),
            validator(color){
                return ['dark', 'light'].every(c => ['string', 'undefined'].includes(typeof color[c]))
            }
        },
        value: {
            type: String,
            required: true,
            validator(value) {
                if (typeof value === 'string') {
                    return true
                }
            }
        }
    },
    setup(props) {
        const dataUrl = ref('');
        watchEffect(() => {
            const options = Object.assign(
                    props, 
                    props.quality == null || { 
                        renderOptions: { 
                            quality: props.quality 
                        }
                    }
                )
                QRCode.toDataURL(
                    props.value,
                    options
                ).then((newUrl) => {
                    dataUrl.value = newUrl
                }).catch((error) => {
                    console.log('error', error)
                })
        })
        return {
            dataUrl
        }
    }
}
</script>