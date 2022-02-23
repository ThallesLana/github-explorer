import { useState } from "react";

// imutabilidade 

// formato normal no javascript
// usuarios = ['diego3g', 'dieegosf', 'danileao']
// usuarios.push('rafacamarda')

// conceito de imutabilidade
// novoUsuarios = [...usuarios, 'rafacamarda']

// melhor performance utilizando imutabilidade

export function Counter(){
    
    const [counter, setCounter] = useState(0);

    function increment()
    {
        setCounter(counter + 1);
        console.log('Incrementing');
    }

    return (
        <div>
            <h2>{counter}</h2>
            <button type="button" onClick={increment}>
                Increment
            </button>
        </div>
    );
}