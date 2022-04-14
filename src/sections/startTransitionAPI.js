import {Layout} from "../shared/Layout";
import {useState, useTransition} from "react";
import {startTransitionExampleTitle} from "./examples/startTransitionExample";
import {useDeferredValueHookTitle} from "./useDeferredValueHook";
import {Code} from "../shared/Code";
import {doubleRenderInStrictModeTitle} from "./DoubleRenderInStrictMode";

export const startTransitionAPITitle = 'startTransition API';

export const StartTransitionAPI = () => {
    const [isPending, startTransition] = useTransition();
    const [countOne, setCountOne] = useState(0);
    const [countTwo, setCountTwo] = useState(0);

    console.log('countOne ' + countOne);
    console.log('countTwo ' + countTwo);

    const onClick = () => {
        startTransition(() => {
            setCountOne(prevCount => prevCount + 1);
        });
        setCountTwo(prevCount => prevCount + 1);
    };

    return (
        <Layout title={startTransitionAPITitle} previousSectionTitle={doubleRenderInStrictModeTitle} nextSectionTitle={useDeferredValueHookTitle}>
            <p>Let's explain concurrency before diving into <code>startTransition</code> API:</p>
            <blockquote>
                <pre>
                    {`Concurrency means that tasks can overlap.
Let's use phone calls as an analogy.

No concurrency means that I can only have one phone conversation at a time. 
If I talk to Alice, and Bob calls me, 
I have to finish the call with Alice before I can talk to Bob.

Concurrency means that I can have more than one conversation at a time. 
For example, I can put Alice on hold, talk to Bob for a bit, 
and then switch back to talking to Alice.

Note that concurrency doesn't necessarily mean I talk to two people at once. 
It just means that at any moment, I may be in multiple calls, and I choose who to talk to. 
For example, based on which conversation is more urgent.

`}
- Dan Abramov in this <a target="_blank" href="https://github.com/reactwg/react-18/discussions/46#discussioncomment-846786">thread</a>
                </pre>
            </blockquote>

            <p><b>What does this mean in React?</b></p>
            <p>It means you can choose what state updates have more priority than the other, and use a new React API to (de)prioritize the updates.</p>
            <p>Typing, clicking, or pressing actions are some examples of the prioritized or the urgent actions which need the urgent updates.</p>
            <p>Deprioritized or the non-urgent actions can be transitions made after some urgent action and we can delay or even cancel their update.</p>
            <p>With the concurrency and the new API we can change the way some renders appear (or not appear by cancelling them during the render process).</p>
            <p>React also handles the stale renders by rendering the latest update if needed, e.g. when typing multiple characters it will throw out the previous rendering
            that is not finished and render the latest one.</p>

            <h3>API</h3>
            <Code language="markdown" code={`useTransition - A concurrent hook that lets you mark some state updates as not urgent. 
                Other state updates are considered urgent by default. 
                React will allow urgent state updates (for example, updating 
                a text input) to interrupt non-urgent state updates (for example, 
                rendering a list of search results).

startTransition - A function used when useTransition is not available. 
                  It does not have isPending value (mode details for isPending in 
                  useTransition section)`} />

            <h3>useTransition</h3>
            <Code code={`import { useTransition } from "react";
                
const [isPending, startTransition] = useTransition();`} />

            <p>Always use this one in your components.</p>

            <p className="example">Example - useTransition</p>
            <p>Try to comment out the <code>startTransition</code> function usage in <code>onClick</code> function handler and check the logs.
            You will see that the second state update gets executed before the first one.
            You will also notice a flashing and this is because of the conditional renderer based on <code>isPending</code> variable.
            </p>

            <div style={{ marginBottom: '40px' }}>
                {isPending ? <div>pending</div> : null}
                <button style={{ marginBottom: '16px' }} onClick={onClick}>Increment counts</button>
                <div>Count one {countOne}</div>
                <div>Count two {countTwo}</div>
            </div>

            <p className="example-code">Example code - useTransition</p>
            <Code code={`const [isPending, startTransition] = useTransition();
const [countOne, setCountOne] = useState(0);
const [countTwo, setCountTwo] = useState(0);

console.log('countOne ' + countOne);
console.log('countTwo ' + countTwo);

const onClick = () => {
    startTransition(() => {
        setCountOne(prevCount => prevCount + 1);
    });
    setCountTwo(prevCount => prevCount + 1);
};

return (
    <>
        <div>
            {isPending ? <div>pending</div> : null}
            <button onClick={onClick}>Increment counts</button>
            <div>Count one {countOne}</div>
            <div>Count two {countTwo}</div>
        </div>
    </>
);`} />

            <p style={{ margin: '64px 0' }}><b>More robust example can be seen <a href={startTransitionExampleTitle}>here</a></b>.</p>

            <h3>startTransition</h3>
            <p>Do not confuse <code>startTransition</code> function with <code>startTransition</code> variable
                name from <code>useTransition</code> since they are different.</p>

            <Code code={`import { startTransition } from "react";
                    
starTransition(scope);`} />
            <p>Use only if <code>useTransition</code> is not available.</p>

            <h3>Don't start replacing states immediately</h3>
            <p>We still do not know the patterns and best practices of how to use those hook and function, so do not go and replace all your state updates.
            These should be tried and used in the situations where the very complex calculations are happening and the UI feels a bit laggy.</p>

            <h3>Older documentation vs new documentation</h3>
            <p>In the src code at the moment it says:</p>
            <Code code={`// /node_modules/@types/react/next.d.ts
            
Allows components to avoid undesirable loading states 
by waiting for content to load before transitioning to the next screen. It also 
allows components to defer slower, data fetching updates until 
subsequent renders so that more crucial updates can be rendered immediately. 
...
If some state update causes a component to suspend, 
that state update should be wrapped in a transition. 
@param config An optional object with timeoutMs`} />
            <p>This code documentation is from the <a target="_blank" href="https://17.reactjs.org/docs/concurrent-mode-patterns.html#transitions">older documentation</a>.</p>
            <p>In the current documentation they are not describing <code>startTransition</code> API as in the older one, so some
                parts might be worth to read in the older as well.</p>
        </Layout>
    )
}