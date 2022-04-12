import {Layout} from "../shared/Layout";
import {startTransitionAPITitle} from "./startTransitionAPI";
import {useDeferredValue, useState} from "react";
import {useInsertionEffectHookTitle} from "./useInsertionEffectHook";
import {Code} from "../shared/Code";

export const useDeferredValueHookTitle = 'useDeferredValue hook';

const items = [];

for (let i = 0; i < 100000; i++) {
    items.push({
        id: i,
        title: `Item ${i + 1}`
    });
}

export const UseDeferredValueHook = () => {
    const [text, setText] = useState('');
    const deferredText = useDeferredValue(text);

    const onChange = (event) => {
        setText(event.target.value);
    };

    console.log('text: ' + text);
    console.log('deferredText: ' + deferredText);

    return (
        <Layout title={useDeferredValueHookTitle} previousSectionTitle={startTransitionAPITitle} nextSectionTitle={useInsertionEffectHookTitle}>
            <Code code={`const deferredValue = useDeferredValue(value);`} />
            <p>Another concurrent-based hook</p>
            <p>Accepts a value and returns a new copy of the value that will defer to more urgent updates.</p>
            <p>If the current render is the result of an urgent update, like user input, React will return the previous
                value and then render the new value after the urgent render has completed.</p>
            <p>This hook is similar to user-space hooks which use debouncing or throttling to defer updates - <b>this is not
            the replacement or implementation for debounce or throttle</b>.</p>
            <p>The benefits to using useDeferredValue is that React will work on the update as soon as other work
                finishes (instead of waiting for an arbitrary amount of time), and like startTransition,
                deferred values can suspend without triggering an unexpected fallback for existing content.</p>

            <p className="example">Example - useDeferredValue</p>
            <input value={text} type="text" onChange={onChange} />
            <div>Text: {text}</div>
            <div>Deferred text: {deferredText}</div>

            <p className="example-code">Example code - useDeferredValue</p>
            <Code code={`const [text, setText] = useState('');
const deferredText = useDeferredValue(text);

const onChange = (event) => {
    setText(event.target.value);
};

console.log('text: ' + text);
console.log('deferredText: ' + deferredText);

return (
    <>
        <input value={text} type="text" onChange={onChange} />
        <div>Text: {text}</div>
        <div>Deferred text: {deferredText}</div>
    </>
);
`} />

            <p style={{ marginTop: '64px' }}>At the moment, no good examples can be found for how and where to use this hook. There were some examples
            of the hook used with experimental Suspense which allows data fetching (not in React 18), but compared with this
            hook implementation it changed a bit. You can read more <a href="https://github.com/reactwg/react-18/discussions/129">here</a> about how
            this hook was meant to be used in experimental version.</p>
            <p>Also, in the above link check these code
                examples: <a href="https://codesandbox.io/s/priceless-cannon-yhbqce?file=/src/App.js">problem</a> and <a href="https://codesandbox.io/s/romantic-tharp-wedx58?file=/src/App.js">solution</a>,
            but as already said these examples are using experimental Suspense and Fetch. Typing in the problem code will show the suspense fallback,
            while in the solution code it will be deferred and thus no UI issues.</p>
        </Layout>
    );
}