import { StyleSheet } from 'react-native'

const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    contenido: {
        marginHorizontal: '2.5%',
        flex: 1
    },
    btn: {
        backgroundColor: '#FFDA00'
    },
    btnText: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#000'
    },
    title: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 30
    },
    cantidad: {
        marginVertical: 20,
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default globalStyles;