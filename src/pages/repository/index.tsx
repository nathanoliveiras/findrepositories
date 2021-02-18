import React, { useEffect, useState } from 'react';

import Logo from '../../img/logo-github.svg';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Link, useRouteMatch } from 'react-router-dom';

import { Header, RepositoryInfo, Issues } from './style';

import api from '../../services/api'
interface RepositoryParam{
    repository: string
}

interface Repositories {
    full_name: string,
    description: string,
    forks_count: number,
    stargazers_count: number,
    open_issues_count: number,
    owner: {
        login: string,
        avatar_url: string
    }
}

interface Issue{
    id: number,
    title: string,
    html_url: string,
    user:{
        login: string
    }
}
const Repository: React.FC = () => {

    const [repository, setRepository] = useState<Repositories | null >(null)
    const [issues, setIssues] = useState<Issue[]>([])
    const { params } = useRouteMatch<RepositoryParam>()

    useEffect(() =>{
        
        api.get(`repos/${params.repository}`).then(
            response =>{
                console.log(response.data)
                setRepository(response.data)
            }
        )

        api.get(`repos/${params.repository}/issues`).then(
            response =>{
                console.log(response.data)
                setIssues(response.data)
            }
        )
        /*
        async function loadData(): Promise<void>{
            const [ repository, issues] = await Promise.all([
                 api.get(`repos/${params.repository}`),
                 api.get(`repos/${params.repository}/issues`)
            ])
            console.log('repository', repository)
            console.log('Issues', issues.data)

        }
        loadData()*/

    }, [params.repository])
   
    return (
        <>
            <Header>
                <img src={Logo} alt="Logo app" />
                <Link to="/">
                    <FiChevronLeft size={20} />Voltar
            </Link>
            </Header>
            { repository && (
                <RepositoryInfo>
                <header>
                    <img src={repository.owner.avatar_url}
                         alt={repository.full_name} />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>{repository.stargazers_count}</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>{repository.forks_count}</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>{repository.open_issues_count}</strong>
                        <span>Issues</span>
                    </li>
                </ul>
            </RepositoryInfo>
            )}
            
            <Issues>
                {issues.map( issue => (
                    <a key={issue.id}  target="_blank" rel="noreferrer" href={issue.html_url}>
                    <div>
                        <strong>{issue.title}</strong>
                        <p>{issue.user.login}</p>
                    </div>
                    <FiChevronRight size={40}/>
                </a>
                ))}
            </Issues>
        </>
    );
}

export default Repository;