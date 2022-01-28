import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import {React, useState} from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function HomePage() {
  const [username, setUsername] = useState('leo3965');
  const [internalUsername, setInternalUsername] = useState('leo3965');
  const [follower1, setFollower1] = useState('')
  const [follower2, setFollower2] = useState('')
  const [follower3, setFollower3] = useState('')
  const router = useRouter();

  function getFollowers(user) {
    let followers = [];
      fetch(`https://api.github.com/users/${user}/followers`, {
        method: 'GET'
      })
      .then((response) => {
        if (response.status == 200) return response.json();
      })
      .then((response) => {
        setFollower1(response[0].login);
        setFollower2(response[1].login);
        setFollower3(response[2].login);
      })
      .catch((err) => {
        console.error(err);
      })
    
      
  }

  return (
    <>
    {getFollowers(username)}
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          //backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          //backgroundImage: 'url(../imgs/billy-huynh-W8KTS-mhFUE-unsplash.jpg)',
          backgroundImage: 'url(https://raw.githubusercontent.com/Leo3965/aluracord-matrix/main/imgs/billy-huynh-W8KTS-mhFUE-unsplash.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box styleSheet= {{
          display: 'box'
        }}>
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (event) {
                event.preventDefault();
                //console.log('Alguém submeteu o form');
                router.push(`/chat?username=${username}`);
                // window.location.href = '/chat';
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Boas vindas de volta!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>

              {/* <input
                              type="text"
                              value={username}
                              onChange={function (event) {
                                  console.log('usuario digitou', event.target.value);
                                  // Onde ta o valor?
                                  const valor = event.target.value;
                                  // Trocar o valor da variavel
                                  // através do React e avise quem precisa
                                  setUsername(valor);
                              }}
                          /> */}
              <TextField
                value={internalUsername}
                onChange={function (event) {
                  // Onde ta o valor?
                  let input = event.target.value;
                  setInternalUsername(input);
                  //console.log('usuario digitou', a);
                  //console.log('internal', username);

                  if (input.length >= 3) {
                    // Trocar o valor da variavel
                    // através do React e avise quem precisa
                    getFollowers(input);
                    setUsername(input);
                  }
                }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[900],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}


            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>

          {/* Followers Area */}
          <Box styleSheet= {{
            display: 'flex',
            alignItems: 'center',
            flexDirection: {
              xs: 'column',
              sm: 'column',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '12px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            gap: '12px'
          }}>
          <Titulo tag="h2">GitHub Friends!</Titulo>
            <Box styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
                width: '100%', maxWidth: '700px'
              }}>
              
              
              <Box
                styleSheet={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: '70px',
                  padding: '4px',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  border: '1px solid',
                  borderColor: appConfig.theme.colors.neutrals[999],
                  borderRadius: '10px',
                  flex: 1,
                  minHeight: '80px',
                }}
              >
                <Image
                  styleSheet={{
                    borderRadius: '50%',
                    marginBottom: '16px',
                  }}
                  src={`https://github.com/${follower1 || 'github'}.png`}
                />
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '3px 10px',
                    borderRadius: '1000px'
                  }}
                >
                  {follower1 || 'github'}
                </Text>
              </Box>
              {/* Follower 1*/}

              <Box
                styleSheet={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: '70px',
                  padding: '4px',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  border: '1px solid',
                  borderColor: appConfig.theme.colors.neutrals[999],
                  borderRadius: '10px',
                  flex: 1,
                  minHeight: '80px',
                }}
              >
                <Image
                  styleSheet={{
                    borderRadius: '50%',
                    marginBottom: '16px',
                  }}
                  src={`https://github.com/${follower2 || 'github'}.png`}
                />
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '3px 10px',
                    borderRadius: '1000px'
                  }}
                >
                  {follower2 || 'github'}
                </Text>
              </Box>
              {/* Follower 2*/}

              <Box
                styleSheet={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: '70px',
                  padding: '4px',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  border: '1px solid',
                  borderColor: appConfig.theme.colors.neutrals[999],
                  borderRadius: '10px',
                  flex: 1,
                  minHeight: '80px',
                }}
              >
                <Image
                  styleSheet={{
                    borderRadius: '50%',
                    marginBottom: '16px',
                  }}
                  src={`https://github.com/${follower3 || 'github'}.png`}
                />
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: '3px 10px',
                    borderRadius: '1000px'
                  }}
                >
                  {follower3 || 'github'}
                </Text>
              </Box>
              {/* Follower 3*/}

            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}