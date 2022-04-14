import {Layout} from "../shared/Layout";
import {useState} from "react";
import {doubleRenderInStrictModeTitle} from "./DoubleRenderInStrictMode";
import {Code} from "../shared/Code";

export const migrationTitle = 'Migration from 17 to 18';

export const Migration = () => {
    const [numericValue, setNumericValue] = useState(0);
    const [textualValue, setTextualValue] = useState('');

    console.log('render')

    const onDecrement = () => {
        setNumericValue(prevState => prevState - 1);
        setTextualValue('decremented');
    };

    const onIncrement = () => {
        setTimeout(() => {
            setNumericValue(prevState => prevState + 1);
            setTextualValue('incremented');
        }, 1000);
    };

    return (
        <Layout title={migrationTitle} previousSectionTitle={'/'} nextSectionTitle={doubleRenderInStrictModeTitle}>
            <p>More details about the migration can be found in the <a target="_blank" href="https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html">React 18 Upgrade Guide</a> documentation</p>

            <h3>Install React to the latest</h3>
            <h4>npm</h4>
            <Code code={`npm install react react-dom`} language="bash" />
            <h4>yarn</h4>
            <Code code={`yarn add react react-dom`} language="bash" />
            <p style={{ marginTop: '40px' }}>If you are creating the app with <code>create-react-app</code> (<code>5.0.0</code>) the features from React 18 are not turned on by the default,
            so you still need to follow the below sections (mostly APIs updates) in order to enable the concurrent mode, otherwise you will be running React 17.</p>

            <h3>Update the client rendering APIs</h3>
            <p>Before:</p>
            <Code code={`import { render } from 'react-dom';
const container = document.getElementById('app');
render(<App tab="home" />, container);`} />
            <p>After:</p>
            <Code code={`import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);`} />
            <h4>server-side rendering with hydration</h4>
            <p>Before:</p>
            <Code code={`import { hydrate } from 'react-dom';
const container = document.getElementById('app');
hydrate(<App tab="home" />, container);`} />
            <p>After:</p>
            <Code code={`import { hydrateRoot } from 'react-dom/client';
const container = document.getElementById('app');
hydrateRoot(container, <App tab="home" />);
// Unlike with createRoot, you don't need a separate root.render() call here.`} />
            <p style={{ marginTop: '40px' }}>Note: in the community there were quite of few issues when
                upgrading so be caution (<a target="_blank" href="https://github.com/vercel/next.js/discussions/35773">https://github.com/vercel/next.js/discussions/35773</a>,
                <a target="_blank" href="https://stackoverflow.com/questions/71706064/react-18-hydration-failed-because-the-initial-ui-does-not-match-what-was-render">https://stackoverflow.com/questions/71706064/react-18-hydration-failed-because-the-initial-ui-does-not-match-what-was-render</a>).</p>

            <h3>Update the server rendering APIs</h3>
            <p>More details about the server rendering APIs changes are in <a target="_blank" href="https://github.com/reactwg/react-18/discussions/22">https://github.com/reactwg/react-18/discussions/22</a></p>
            <p>Deprecated</p>
            <Code code={`renderToNodeStream - use renderToPipeableStream`} />

            <p>Limited (still working but with limited support for Suspense)</p>
            <Code code={`renderToString
                    
renderToStaticMarkup`}/>

            <p>New</p>
            <Code code={`renderToPipeableStream - replacement for renderToNodeStream
                    
renderToReadableStream - to support streaming SSR with Suspense for modern edge 
                         runtime environments, such as Deno and Cloudflare workers`} />

            <h3>Update the TypeScript definitions</h3>
            <p><code>@types/react</code> and <code>@types/react-dom</code> need to be updated to the latest versions.</p>
            <p>You can install <a target="_blank" href="https://github.com/eps1lon/types-react-codemod">codemod</a> to transform deprecated and
                breaking changes types.</p>
            <p>The most notable change is that now <code>children</code> prop needs to be listed explicitly when defining props.
            This is an example of how you should use interfaces:</p>
            <Code code={`// you can have your Props with the children prop and not use React.PropsWithChildren
React.FunctionComponent<Props> => React.FunctionComponent<React.PropsWithChildren<Props>>

React.FunctionComponent => React.FunctionComponent<React.PropsWithChildren<unknown>>

React.FC => React.FC<React.PropsWithChildren<unknown>>

React.ComponentType => React.ComponentType<React.PropsWithChildren<unknown>>`} />

            <p>Changes in the interfaces:</p>
            <Code code={`React.ReactType => React.ElementType

React.SFC => React.FC

React.StatelessComponent => React.FunctionComponent

React.SFCElement => React.FunctionComponentElement

// no implicit any in useCallback
React.useCallback((event) => {}) => React.useCallback((event: any) => {})

Props => No replacement

RefForwardingComponent => No replacement

SFCFactory => No replacement`} />

            <h3>Other deprecations in APIs</h3>
            <Code code={`ReactDOM.unmountComponentAtNode - use root.unmount()
                    
ReactDOM.renderSubtreeIntoContainer - deprecated`} />

            <h3>Automatic batching was added - no need for <code>ReactDOM.unstable_batchedUpdates</code></h3>
            <p>Copy the code below and try it in React 17 by reverting the client rendering APIs changes</p>
            <p className="example">Example - double render</p>
            <p>- Open the console</p>
            <p>- Clicking on the decrement button will show 1 log in both versions</p>
            <p>- Clicking on the increment button will show 2 logs in React 17, and 1 log in React 18 - both `useState` functions are called in a timeout (could have been e.g. fetch or any async call).</p>
            <p>Note: disable the strict mode in <code>index.js</code> and check <a href={doubleRenderInStrictModeTitle}>Double render in strict mode</a> section for more details why it stills shows 2 logs</p>
            <div style={{ margin: '24px 0' }}>
                <button onClick={onDecrement}>-</button>
                <button onClick={onIncrement}>+</button>
            </div>
            <p>Numeric value: {numericValue}</p>
            <p>Textual value: {textualValue}</p>

            <p className="example-code">Example code - double render</p>
            <Code code={`const [numericValue, setNumericValue] = useState(0);
const [textualValue, setTextualValue] = useState('');

console.log('render')

const onDecrement = () => {
    setNumericValue(prevState => prevState - 1);
    setTextualValue('decremented');
};

const onIncrement = () => {
    setTimeout(() => {
        setNumericValue(prevState => prevState + 1);
        setTextualValue('incremented');
    }, 1000);
};
            
return (
    <>
        <div>
            <button onClick={onDecrement}>-</button>
            <button onClick={onIncrement}>+</button>
        </div>
        <p>Numeric value: {numericValue}</p>
        <p>Textual value: {textualValue}</p>
    </>
);
`} />

            <p style={{ marginTop: '64px' }}>To opt-out of automatic batching (this is for some edge case, usually you do not need to opt-out):</p>
            <Code code={`const onDecrement = () => {
    flushSync(() => {
        setNumericValue(prevState => prevState - 1);
    });
    flushSync(() => {
        setTextualValue('decremented');
    });
};`} />

            <h3>Configure a testing environment</h3>
            <p>You may see this message when updating to React 18:</p>
            <Code code={`The current testing environment is not configured to support act(…)`} />

            <p>To fix it:</p>
            <Code code={`// In your test setup file
globalThis.IS_REACT_ACT_ENVIRONMENT = true;`} />
            <p>This will tell React that it's running in a unit test-like environment. React will log helpful warnings if you forget to wrap an update with act.</p>
            <p>You can also set the flag to false to tell React that act isn't needed. This can be useful for end-to-end tests that simulate a full browser environment.</p>
            <p>In the future, the testing libraries will handle this (React Testing Library handles it already).</p>

            <h3>Other breaking changes</h3>
            <h4>Stricter hydration errors</h4>
            <p>Hydration mismatches now treated as errors. The error will go up to the closest Suspense boundary.</p>
            <h4>The browsers and the support</h4>
            <p>React 18 does not work with Internet Explorer, so your app can not be updated to version 18 if you need to
                support IE. Polyfills also can not be implemented for the features such as microtasks which are core for the new
                features.</p>

            <div style={{ width: '70px', backgroundColor: 'grey', textAlign: 'center', color: 'white', height: '100px', lineHeight: '100px',
                borderTopRightRadius: '20px', borderTopLeftRadius: '20px', fontSize: '30px'}}>RIP
                <div style={{ backgroundColor: 'green', height: '20px', width: '90px', position: "relative", left: '-10px' }}></div></div>
            <p>IE is deprecated and not supported for sure, but more browsers might have lack of the support for <code>Promise</code>, <code>Symbol</code>,
            <code>Object.assign</code> or other modern features so you might need some polyfills for other.</p>

            <h3>If things are not working</h3>
            <p>Check if turning off the strict mode temporarily fixes the issues, and turn it on when all is fixed.</p>
            <p>You can also update your app to React 18, but leave concurrency features off by not updating the latest APIs.</p>
            <p>Check your libraries, some of them are not updated yet (<code>Fresnel.js</code>), or might not even be updated.</p>
        </Layout>
    );
}