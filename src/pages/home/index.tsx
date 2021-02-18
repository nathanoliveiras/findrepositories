import React, { FormEvent, useState, useEffect } from 'react';

import {Link} from 'react-router-dom';

import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories, Error} from './style';

import { toast } from 'react-toastify';

import Logo from '../../img/logo-github.svg';

import api from '../../services/api';

interface Repository {
    full_name: string,
    description: string,
    owner: {
        login: string,
        avatar_url: string
    }
}
const Home: React.FC = () => {
    const [newRepo, setNewRepo] = useState('')
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem('@githubexplorer')

        if(storageRepositories ){
            return JSON.parse(storageRepositories)
        }else{
            return[]
        }
    })
    const [inputError, setInputError] = useState('')

    useEffect( () => {
        localStorage.setItem('@githubexplorer', JSON.stringify(repositories))
    }, [repositories])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!newRepo){
            setInputError('Digite o nome do repositório!')
            toast.error('Este repo está vazio')
        }
        try {
            //adiciona novos repositórios
            const response = await api.get(`repos/${newRepo}`)
            const repository = response.data
            setRepositories([...repositories, repository])
            setNewRepo('')
            setInputError('')
            toast.success('Diretório adicionado')
        } catch (e) {
            return toast.error('Erro!!')          
        }
    }
    return (
        <>
            <img src={Logo} alt="Logo app" />
            <Title>Encontre no Github</Title>
            <Form hasError={ !! inputError} onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                    type="text"
                    name=""
                    placeholder="Digite o nome do repositório" />
                <button type="submit">Pesquisar</button>
            </Form>
            { inputError && <Error>{inputError}</Error> }
            
            <Repositories>
                {repositories.map((repo, index) => (
                    <Link key={index} to={`repository/${repo.full_name}`}>
                        <img src={repo.owner.avatar_url} 
                             alt={repo.owner.login} />
                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description}</p>
                        </div>
                        <FiChevronRight size={40} />
                    </Link>
                ))}
            </Repositories>
        </>
    );
}
export default Home;

/*
*/