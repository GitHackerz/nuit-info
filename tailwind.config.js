/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#014EAE',
                'secondary': '#002350',
                'danger': '#F44336',
                'dark': '#212121',
                'light': '#ECF1FE',
                'white': '#FFFFFF'
            }
        }
    },
    plugins: []
};