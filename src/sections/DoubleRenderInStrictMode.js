import {Layout} from "../shared/Layout";
import {migrationTitle} from "./Migration";
import {useEffect, useState} from "react";
import doubleRenderImage from '../React-double-render-prod-and-dev.jpg';

export const doubleRenderInStrictModeTitle = 'Double render in strict mode';

export const DoubleRenderInStrictMode = () => {
    const [renderCount, setRenderCount] = useState(0);
    const [todos, setTodos] = useState(['original todo']);
    const [buggyTodos, setBuggyTodos] = useState(['original buggy todo']);

    console.log('render')

    useEffect(() => {
        setRenderCount(prevValue => prevValue + 1);

        fetch('https://run.mocky.io/v3/13c885e1-2785-455b-8279-2766ca983157')
            .then(response => response.json())
            .then(data => console.log(data));
    }, [])

    useEffect(() => {
        // {"todos": ["learn React 18", "turn off strict mode???"]}
        fetch('https://run.mocky.io/v3/650f137f-b187-48a3-8896-3b80780e8a5e')
            .then(response => response.json())
            .then(data => {
                setTodos(prevState => [...new Set([...prevState, ...data.todos])]);
                setBuggyTodos(prevState => [...prevState, ...data.todos]);
            });
    }, [])

    return (
        <Layout title={doubleRenderInStrictModeTitle} previousSectionTitle={migrationTitle} nextSectionTitle={'todo'}>
            <p>More details about the double render in the strict more can be found in the
                <a href="https://github.com/reactwg/react-18/discussions/96">GH discussion thread</a> and in the <a href="https://github.com/facebook/react/issues/15074#issuecomment-611998431">
                    GH issue thread</a>.</p>
            <p>[I am initially 0, and I only have <code>useEffect</code> with no arguments which sets a state to 0 + 1:]</p>
            <p><b>Render count: {renderCount}</b></p>

            <p>In short, the idea is to catch bugs before they are even created by having double renderers. If after double render
            your state is not correct, this might be an indicator for an issue in the code.</p>
            <p>In React 18 it is turned on for all the components (including the effects or not). In the production environment it is turned off.</p>

            <p>On the left on the image below we can see the production app, and on the right the development app.
                You can see how there are double renders (including double fetch calls) when using strict mode in the development environment.</p>
            <img style={{ width: '100%', border: '10px solid black', boxSizing: 'border-box' }} alt="Double render in strict mode for production and local environment" src={doubleRenderImage} />

            <p>Todos:</p>
            {todos.map(todo => (
                <div key={todo}>{todo}</div>
            ))}

            <p>Buggy todos:</p>
            {buggyTodos.map((todo, index) => (
                <div key={todo + index}>{todo}</div>
            ))}
        </Layout>
    )
}