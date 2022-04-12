import {Layout} from "../shared/Layout";
import {doubleRenderInStrictModeTitle} from "./DoubleRenderInStrictMode";
import {useId, useState} from "react";
import {startTransitionAPITitle} from "./startTransitionAPI";
import {Code} from "../shared/Code";

export const useIdHookTitle = 'useId hook';

export const UseIdHook = () => {
    const idOne = useId();
    const idTwo = useId();
    const [justForRerender, setJustForRerender] = useState(0)

    console.log(idOne)
    console.log(idTwo)

    return (
        <Layout title={useIdHookTitle} previousSectionTitle={doubleRenderInStrictModeTitle} nextSectionTitle={startTransitionAPITitle}>
            <p>A new hook for generating unique IDs on both the client and server, while avoiding hydration mismatches.
                It is primarily useful for component libraries integrating with accessibility APIs that require unique IDs (such as the form elements).</p>

            <Code code={`import { useId } from 'react';
                    
const MyComponent = () => {
    const idOne = useId(); // e.g. :r0:
    const idTwo = useId(); // e.g. :r1:
    ...
}`} />

            <p style={{ margin: '64px 0', fontWeight: 'bold' }}>THIS IS NOT FOR GENERATING KEYS IN A LIST!</p>

            <p>The example of the usage:</p>
            <Code code={`<div>
    <label htmlFor={id}>Do you like React?</label>
    <input id={id} type="checkbox" name="react"/>
</div>`} />

            <p>If you have more fields, reuse the id and just concatenate other unique string with it:</p>
            <Code code={`htmlFor={\`$\{id}-name\`}
htmlFor={\`$\{id}-age\`}`} />

            <p>The token includes <code>:</code> which is intentional to not be able to use it in CSS selectors or APIs
                like <code>querySelectorAll</code></p>
            <p className="example">Example - useId</p>
            <p>You can also open console to see the logs</p>
            <p>Id one: {idOne}</p>
            <p>Id two: {idTwo}</p>
            <p>Rerender: {justForRerender}</p>
            <div><button onClick={() => setJustForRerender(prevState => prevState + 1)}>Click to rerender</button></div>

            <p className="example-code">Example code - useId</p>
            <Code code={`const idOne = useId();
const idTwo = useId();
const [justForRerender, setJustForRerender] = useState(0);

return (
    <>
        <p>Id one: {idOne}</p>
        <p>Id two: {idTwo}</p>
        <p>Rerender: {justForRerender}</p>
        <div>
            <button onClick={() => setJustForRerender(prevState => prevState + 1)}>Click to rerender</button>
        </div>
    </>
);
`} />
        </Layout>
    )
}