import axios from "axios";
import { RepositoryModel } from "../models/repository.model";
import React, { useState } from "react";
import styled from "styled-components";

const defaultUrl = 'https://api.github.com/users/';

const   Section = styled.section`
            margin: 40px;
        `,
        H1 = styled.h1`
            margin-bottom: 16px;
        `,
        UL = styled.ul`
            list-style: none;
            max-width: 100%;
            @media (max-width: 768px) {
                padding-left: 0;
            }
        `,
        LI = styled.li`
            text-align: left;
            & + li {
                margin-top: 20px;
            }

            @media (max-width: 768px) {
                text-align: center;
            }
        `,
        SectionInput = styled.section`
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 16px;
        `,
        Input = styled.input`
            height: 28px;
            width: 100%;
            font-size: 18px;
            padding: 6px;
            max-width: 506px;
        `,
        Strong = styled.strong`
            font-size: 32px;
        `,
        P = styled.p`
            font-size: 16px;
            color: #999;
            margin: 8px 0;
        `,
        A = styled.a`
            display: inline-block;
            margin-top: 6px;
            text-decoration: none;
        `, 
        Button = styled.button`
            background-color: #8257E6;

            &:hover {
                border-color: #FFF;
                opacity: 0.9;
            }
        `,
        ButtonSearch = styled.button`
            width: 100%;
            max-width: 516px;
        `;

export function RepositoryList () {

    const   [userName, setUserName] = useState(''),
            [repositories, setRepositories] = useState<RepositoryModel[]>([]),
            [loading, setLoading] = useState(false),
            handleInputNameChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
                setUserName(event.target.value);
            },
            handleSearch = () => {
                if (!userName.trim()) {
                    setRepositories([]);
                    return;
                }
                setLoading(true);
                axios.get(defaultUrl + userName + '/repos')
                .then(
                    response =>  {
                        if (response.data.length === 0) {
                            alert("Nenhum repositório encontrado para este usuário.");
                            setRepositories([]);
                        } else {
                            setRepositories(response.data);
                        }
                    }
                )
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        alert("Usuário não encontrado.");
                        setRepositories([]);
                    } else {
                        alert("Ocorreu um erro ao buscar os repositórios.");
                        console.error(error);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
            };

    return (
        <Section>
            <H1>Lista de repositórios</H1>
            <SectionInput>
                <Input id="userName" value={userName} onChange={handleInputNameChange}/>
                <ButtonSearch onClick={handleSearch}>{loading ? "Pesquisando..." : "Pesquisar"}</ButtonSearch>
            </SectionInput>

            <UL>
                {repositories.map(repository => (
                  <LI key={repository.name}>
                    <Strong>{repository.name}</Strong>
                    <P>{repository.description ?? 'Sem descrição'}</P>

                    <A href={repository.html_url} target="_blank">
                        <Button>Acessar repositório</Button>
                    </A>
                  </LI>
                ))}
            </UL>
        </Section>
    );
}