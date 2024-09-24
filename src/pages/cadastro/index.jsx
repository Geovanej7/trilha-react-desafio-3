import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md';
import { BsFillPersonFill } from "react-icons/bs";
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, CriarText, Row, Wrapper } from './styles';

const Cadastro = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias e entrar <br/> mais rápido nas <br/> empresas mais <br/> desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome Completo" leftIcon={<BsFillPersonFill color="#8647AD"/>} name="Nome"  control={control} />
                    {errors.name && <span>O nome é obrigatório</span>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail color="#8647AD" />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock color="#8647AD" />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Column>
                    <politicasText>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</politicasText>
                    <Row>
                    <span>Já tenho conta. </span>
                    <CriarText>Fazer login</CriarText>
                    </Row>
                </Column>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }