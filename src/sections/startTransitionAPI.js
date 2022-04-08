import {Layout} from "../shared/Layout";
import {useIdHookTitle} from "./useIdHook";
import {useState, useTransition} from "react";
import {startTransitionExampleTitle} from "./examples/startTransitionExample";

export const startTransitionAPITitle = 'startTransition API';

export const StartTransitionAPI = () => {
    const [isPending, startTransition] = useTransition();
    const [count, setCount] = useState(0);
    const [countTwo, setCountTwo] = useState(0);

    console.log('count ' + count);
    console.log('countTwo ' + countTwo);

    const onClick = () => {
        startTransition(() => {
            setCount(prevCount => prevCount + 1);
        });
        setCountTwo(prevCount => prevCount + 1);
    };

    return (
        <Layout title={startTransitionAPITitle} previousSectionTitle={useIdHookTitle} nextSectionTitle={'todo'}>
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
- Dan Abramov in this <a href="https://github.com/reactwg/react-18/discussions/46#discussioncomment-846786">thread</a>
                </pre>
            </blockquote>

            <p><b>What does this mean in React?</b></p>
            <p>It means you can choose what state updates have more priority than the other, and use a new React API to prioritize the updates.</p>

            <h3>API</h3>
            <code>
                <pre>
                    {`useTransition - A hook that lets you mark some state updates as not urgent. 
                Other state updates are considered urgent by default. 
                React will allow urgent state updates (for example, updating 
                a text input) to interrupt non-urgent state updates (for example, 
                rendering a list of search results).

startTransition - A function used when useTransition is not available. 
                  It also does not have isPending value (mode details in 
                  useTransition section)`}
                </pre>
            </code>

            <h4><code>useTransition</code></h4>

            <code><pre>const [isPending, startTransition] = useTransition();
</pre></code>

            <p>Always use this one in your components.</p>

            <p><b>An implementation example:</b></p>
            <p>Try to comment out the <code>startTransition</code> function usage from <code>useTransition</code> and check the logs.
            You will see that the second state update gets executed before the first one.
            You will also notice a flashing and this is because of the conditional renderer based on <code>isPending</code> variable.
            </p>

            <div style={{ marginBottom: '24px' }}>
                {isPending ? <div>pending</div> : undefined}
                <button onClick={onClick}>Count one {count}</button>

                <div>Count two {countTwo}</div>
            </div>

            <p><b>Code example (not related to the implementation example above)</b></p>
            <code>
                <pre>
                    {`const [isPending, startTransition] = useTransition();
const [count, setCount] = useState(0);

const onClick = () => {
    startTransition(() => {
        setCount(prevCount => prevCount + 1);
    });
};

return (
    <>
        {isPending ? <div>pending</div> : undefined}
        <button onClick={onClick}>{count}</button>
    </>
);`}
                </pre>
            </code>

            <p><b>More robust example can be seen <a href={startTransitionExampleTitle}>here</a></b>.</p>

            <h4><code>startTransition</code></h4>
            <p>Use only if <code>useTransition</code> is not available</p>

            <h3>Don't start replacing states immediately</h3>
            <p>We still do not know the patterns and best practices of how to use those hooks and function, so do not go and replace all your state updates.
            These should be tried and used in the situations where the very complex calculations are happening and the UI feels a bit laggy.</p>
        </Layout>
    )
}