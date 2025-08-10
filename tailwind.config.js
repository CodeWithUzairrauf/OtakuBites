module.exports = {
    theme: {
        extend: {
            animation: {
                fall: 'fall linear infinite',
            },
            keyframes: {
                fall: {
                    '0%': { transform: 'translateY(-50px)' },
                    '100%': { transform: 'translateY(110vh)' },
                },
            },
        },
    },
    plugins: [],
}