import { RepositoryItem } from "./RepositoryItem";
import { useState, useEffect } from "react";

import '../styles/repositories.scss';

// https://api.github.com/orgs/rocketseat/repos


export function RepositoryList() {

    const [repositories, setRepositories] = useState([]);

    // useEffect serve para disparar uma função após uma alteração
    // 1° parametro o que eu quero executar, quando eu quero executar
    // 2° parametro caso retornado [] ele só roda uma vez
    // cuidado para não esquecer do segundo parametro
    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/repos').then(response => response.json()).then(data => setRepositories(data));
    }, []);

    return (
        <section className="repository-list">
            <h1>Lista de repositórios</h1>
            <ul>
                {repositories.map(repository => {
                    return <RepositoryItem key={repository.name} repository={repository} />
                })}
            </ul>
        </section>
    )
}