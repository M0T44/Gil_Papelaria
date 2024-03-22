import {
    useEffect,
    useState
} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    View,
    Text,
    TextInput,

} from 'react-native'

import apiViaCep from '../../API/viaCep/apiViaCep'

export default function Cadastre_se() {

    const [buscaCep, setBuscaCep] = useState('')
    const [cep, setCep] = useState('')
    const [rua, setRua] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')

    async function handleBuscaCep() {
        if (cep.length > 8 || cep.length < 8) {
            alert('Cep inválido')
        }
        const response = await apiViaCep.get(`${cep}/json`);
        setBuscaCep(response.data)
    }

    useEffect(() => {
        function addBuscaCep() {
            setRua(buscaCep.logradouro || rua)
            setBairro(buscaCep.bairro || bairro);
            setCidade(buscaCep.localidade || cidade);
            setEstado(buscaCep.uf || estado);
        }
        addBuscaCep();
    }, [handleBuscaCep])

    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <View style={style.container}>
                    <Text>
                        Cadastre-se
                    </Text>
                    <View style={style.form}>
                        <TextInput
                            placeholder='Digite seu Nome Completo'
                            style={style.input}

                        />
                        <TextInput
                            placeholder='Digite seu Celular'
                            keyboardType="numeric"
                            style={style.input}
                        />
                        <TextInput
                            placeholder='Digite seu CPF'
                            keyboardType="numeric"
                            style={style.input}
                        />
                        <TextInput
                            placeholder='Digite seu CEP'
                            keyboardType="numeric"
                            style={style.input}
                            value={cep}
                            onEndEditing={handleBuscaCep}
                            onChange={setCep}
                        />
                        <TextInput
                            placeholder='Digite sua Rua'
                            style={style.input}
                            editable={false}
                            value={rua}
                            onChange={setRua}
                        />
                        <TextInput
                            placeholder='Digite seu Bairro'
                            style={style.input}
                            editable={false}
                            value={bairro}
                            onChange={setBairro}
                        />
                        <TextInput
                            placeholder='Digite sua Cidade'
                            style={style.input}
                            editable={false}
                            value={cidade}
                            onChange={setCidade}
                        />
                        <TextInput
                            placeholder='Digite seu Estado'
                            style={style.input}
                            editable={false}
                            value={estado}
                            onChange={setEstado}
                        />
                        <TextInput
                            placeholder='Digite seu Complemento'
                            style={style.input}
                        />
                        <TextInput
                            placeholder='Digite seu Email'
                            style={style.input}
                        />
                        <TextInput
                            placeholder='Digite sua Senha'
                            style={style.input}
                        />
                        <TextInput
                            placeholder='Confirmar Senha'
                            style={style.input}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
    },

    form: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        height: 665,
        backgroundColor: 'red'
    },

    input: {
        width: 300,
        height: 40,
        backgroundColor: '#bbb',
        borderRadius: 8,
        marginVertical: 6
    }
})