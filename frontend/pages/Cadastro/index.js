import { useEffect, useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'

import apiViaCep from '../../API/viaCep/apiViaCep'
import apiLocal from '../../API/apiLocal/apiLocal'

export default function Cadastre_se() {

    const [nome, setNome] = useState('')
    const [cpf_cnpj, setCpf_cnpj] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cep, setCep] = useState('')
    const [rua, setRua] = useState('')
    const [nCasa, setNCasa] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')

    const [buscaCep, setBuscaCep] = useState('')

    async function handleCadastro(e) {
        try {
            e.preventDefault
            const resposta = await apiLocal.post('/CriarClientes', {
                nome,
                telefone,
                cpf_cnpj,
                cep,
                bairro,
                nCasa,
                cidade,
                rua,
                estado,
                email,
                senha
            })
            return (resposta.data)
        } catch (error) {
            alert('error')
        }
    }

    async function handleBuscaCep() {
        if (cep.length > 8 || cep.length < 8) {
            alert('Cep inválido')
        } else {
            const response = await apiViaCep.get(`/${cep}/json/`);
            setBuscaCep(response.data)
        }
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
                            value={nome}
                            onChangeText={setNome}
                        />

                        <TextInput
                            placeholder='Digite seu Celular'
                            style={style.input}
                            keyboardType="numeric"
                            value={telefone}
                            onChangeText={setTelefone}
                        />

                        <TextInput
                            placeholder='Digite seu cpf_cnpj'
                            style={style.input}
                            keyboardType="numeric"
                            value={cpf_cnpj}
                            onChangeText={setCpf_cnpj}
                        />

                        <TextInput
                            placeholder='Digite Seu CEP'
                            style={style.input}
                            keyboardType="numeric"
                            value={cep}
                            onChangeText={setCep}
                            onBlur={handleBuscaCep}
                        />

                        <TextInput
                            placeholder='Digite sua Rua'
                            style={style.input}
                            editable={false}
                            value={rua}
                            onChangeText={setRua}
                        />

                        <TextInput
                            placeholder='Digite seu Bairro'
                            style={style.input}
                            editable={false}
                            value={bairro}
                            onChangeText={setBairro}
                        />

                        <TextInput
                            placeholder='Digite sua Cidade'
                            style={style.input}
                            editable={false}
                            value={cidade}
                            onChangeText={setCidade}
                        />

                        <TextInput
                            placeholder='Digite seu Estado'
                            style={style.input}
                            editable={false}
                            value={estado}
                            onChangeText={setEstado}
                        />

                        <TextInput
                            placeholder='Digite seu Complemento'
                            style={style.input}
                            value={nCasa}
                            onChangeText={setNCasa}
                        />

                        <TextInput
                            placeholder='Digite seu Email'
                            style={style.input}
                            value={email}
                            onChangeText={setEmail}
                        />

                        <TextInput
                            placeholder='Digite sua Senha'
                            style={style.input}
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry={true}
                        />

                        <TextInput
                            placeholder='Confirme a Senha'
                            style={style.input}
                            value={confSenha}
                            onChangeText={setConfSenha}
                            secureTextEntry={true}
                        />

                        <TouchableOpacity onPress={handleCadastro} style={style.buttonEnviar}>
                            <Text style={style.buttonEnviarText}>Enviar</Text>
                        </TouchableOpacity>

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
    },

    input: {
        width: 300,
        height: 40,
        backgroundColor: '#bbb',
        borderRadius: 8,
        marginVertical: 6
    },
    buttonEnviar: {
        marginTop: 30,
        backgroundColor: '#E64F07',
        height: 45,
        width: '95%',
        borderRadius: 8,
    },
    buttonEnviarText: {
        textAlign: 'center',
        padding: 5,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
})