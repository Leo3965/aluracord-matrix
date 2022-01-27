import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import CircularInfinitProgress from './components/utils/circularProgressWithLabel';

const  SUPABASE_ANNON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4Njc3MiwiZXhwIjoxOTU4ODYyNzcyfQ.RxO648ZMrDjqohQ_ofDGk7BPj_ZXmCpCDNsAK_W0aRc';
const SUPA_BASE_URL = 'https://ypvberegmryararzjuas.supabase.co';

// Create a single supabase client for interacting with your database
const SUPABASE = createClient(SUPA_BASE_URL, SUPABASE_ANNON_KEY);

//fetch(`${SUPA_BASE_URL}/rest/v1/mensagens?select=*`, {
//    headers: {
//        'Content-Type': 'application/json',
//        'apiKey': 'Bearer' + SUPABASE_ANNON_KEY
//    }
//})
//.then((res) => {
//    return res.json();
//})
//.then((res) => {
//    console.log(res);
//});

export default function ChatPage() {
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const [spinner, setSpinner] = React.useState(false);

    React.useEffect(() => {
        setSpinner(true);
        SUPABASE.from('mensagens')
        .select('*')
        .order('id', {ascending: false})
        .then(({ data }) => {
            console.log('Dados da consulta: ', data);
            setListaDeMensagens(data);
            setSpinner(false);
        });
    }, []);

    /*
    // Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
    // Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */
    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            //id: listaDeMensagens.length + 1,
            de: 'vanessametonini',
            texto: novaMensagem,
        };

        SUPABASE
        .from('mensagens')
        .insert([
            mensagem
        ])
        .then(({ data }) => {
            setListaDeMensagens([
                data[0],
                ...listaDeMensagens,
            ]);
            setMensagem('');
        });

    }

    function deletarMensagem(idMensagem) {
        let novaListaDeMensagens = listaDeMensagens.filter((msg, index) => {
            return msg.id !== idMensagem;
        });
        
        //console.log(novaListaDeMensagens)
        setListaDeMensagens([
            ...novaListaDeMensagens
        ]);
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://raw.githubusercontent.com/Leo3965/aluracord-matrix/main/imgs/billy-huynh-W8KTS-mhFUE-unsplash.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} spinner={spinner} deletarMensagem={deletarMensagem} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box styleSheet={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }} > 
                        <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%'
                        }}
                        >
                            <TextField
                                value={mensagem}
                                onChange={(event) => {
                                    const valor = event.target.value;
                                    setMensagem(valor);
                                }}
                                onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        handleNovaMensagem(mensagem);
                                    }
                                }}
                                placeholder="Insira sua mensagem aqui..."
                                type="textarea"
                                styleSheet={{
                                    width: '100%',
                                    border: '0',
                                    resize: 'none',
                                    borderRadius: '5px',
                                    padding: '6px 8px',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    marginRight: '12px',
                                    color: appConfig.theme.colors.neutrals[200],
                                }}
                            />
                            <Button
                                type='submit'
                                label='Entrar'
                                width='20%'
                                buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["050"],
                                mainColor: appConfig.theme.colors.primary[900],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                                }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }}
                            />
                        </Box>
                    </Box>
                    
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    //console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.spinner ? <CircularInfinitProgress 
                styleSheet={{
                    height: '10px',
                    width: '10px'
                }}
             ></CircularInfinitProgress> : <></>
            }
            
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            margin: '0 12px 12px 0',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }} 
                        >
                            <Box>
                                <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                }}
                                >
                                    <Image
                                        styleSheet={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            marginRight: '8px'
                                        }}
                                        src={`https://github.com/${mensagem.de}.png`}
                                    />
                                    <Text tag="strong">
                                        {mensagem.de}
                                    </Text>
                                    <Text
                                        styleSheet={{
                                            fontSize: '10px',
                                            marginLeft: '8px',
                                            color: appConfig.theme.colors.neutrals[300],
                                        }}
                                        tag="span"
                                    >
                                        {(new Date().toLocaleDateString())}
                                    </Text>
                                </Box>
                                {mensagem.texto}
                            </Box>

                            <Box>
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    /*filter: 'invert(100%) sepia(0%) saturate(23%) hue-rotate(37deg) brightness(109%) contrast(105%)',*/
                                        hover: {
                                            cursor: 'pointer',
                                            backgroundColor: appConfig.theme.colors.primary[900]
                                        }
                                    }}
                                    onClick={() => {
                                        props.deletarMensagem(mensagem.id);
                                    }}
                                  src={`https://raw.githubusercontent.com/Leo3965/aluracord-matrix/a4f6b60b40ad5491788fb384d0b158e9f5d94572/imgs/trash-simple.svg`}  
                                />                          
                            </Box>
                        </Box>
                    </Text>
                );
            })}
        </Box>
    )
}