import {Layout} from "../shared/Layout";
import {useState} from "react";
import {doubleRenderInStrictModeTitle} from "./DoubleRenderInStrictMode";

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
            <p>More details about the migration can be found in the <a href="https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html">React 18 Upgrade Guide</a> documentation</p>

            <h3>Install React to the latest</h3>
            <h4>npm</h4>
            <p><code><pre>npm install react react-dom</pre></code></p>
            <h4>yarn</h4>
            <p><code><pre>yarn add react react-dom</pre></code></p>
            <p>Or if you are using <code>create-react-app</code>, after generating the app with <code>create-react-app</code> (<code>5.0.0</code>) the features from React 18 are not turned on by the default.
            <p>Follow below APIs updates in order to enable the concurrent mode, otherwise you will be running React 17.</p>
            </p>

            <h3>Update the client rendering APIs</h3>
            <p>Before:</p>
            <code>
                <pre>
                    {`import { render } from 'react-dom';
const container = document.getElementById('app');
render(<App tab="home" />, container);`}
                </pre>
            </code>
            <p>After:</p>
            <code>
                <pre>
                    {`import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);`}
                </pre>
            </code>
            <h4>server-side rendering with hydration</h4>
            <p>Before:</p>
            <code>
                <pre>
                    {`import { hydrate } from 'react-dom';
const container = document.getElementById('app');
hydrate(<App tab="home" />, container);`}
                </pre>
            </code>
            <p>After:</p>
            <code>
                <pre>
                    {`import { hydrateRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = hydrateRoot(container, <App tab="home" />);`}
                </pre>
            </code>

            <h3>Update the server rendering APIs</h3>
            <p>More details about the server rendering APIs changes are in <a href="https://github.com/reactwg/react-18/discussions/22">https://github.com/reactwg/react-18/discussions/22</a></p>
            <p>Deprecated</p>
            <code>
                <pre>
                    {`renderToNodeStream - use renderToPipeableStream`}
                </pre>
            </code>

            <p>Limited (still working but with limited support for Suspense)</p>
            <code>
                <pre>
                    {`renderToString
                    
renderToStaticMarkup`}
                </pre>
            </code>
            <p>New</p>
            <code>
                <pre>
                    {`renderToPipeableStream - replacement for renderToNodeStream
                    
renderToReadableStream - to support streaming SSR with Suspense for modern edge runtime environments, such as Deno and Cloudflare workers`}
                </pre>
            </code>

            <h3>Update the TypeScript definitions</h3>
            <p><code>@types/react</code> and <code>@types/react-dom</code> need to be updated to the latest versions.</p>
            <p>You can install <a href="https://github.com/eps1lon/types-react-codemod">codemod</a> to transform deprecated and
                breaking changes types.</p>
            <p>The most notable change is that now <code>children</code> prop needs to be listed explicitly when defining props.</p>

            <code>
                <pre>
                    {`React.ReactType => React.ElementType

React.SFC => React.FC

React.StatelessComponent => React.FunctionComponent

React.SFCElement => React.FunctionComponentElement

React.FunctionComponent<Props> => React.FunctionComponent<React.PropsWithChildren<Props>>

React.FunctionComponent => React.FunctionComponent<React.PropsWithChildren<unknown>>

React.FC => React.FC<React.PropsWithChildren<unknown>>

React.ComponentType => React.ComponentType<React.PropsWithChildren<unknown>>

React.useCallback((event) => {}) => React.useCallback((event: any) => {})

Props => No replacement

RefForwardingComponent => No replacement

SFCFactory => No replacement


`}
                </pre>
            </code>

            <h3>Other deprecations in APIs</h3>
            <code>
                <pre>
                    {`ReactDOM.unmountComponentAtNode - use root.unmount()
                    
ReactDOM.renderSubtreeIntoContainer - deprecated`}
                </pre>
            </code>

            <h3>Automatic batching was added - no need for <code>ReactDOM.unstable_batchedUpdates</code></h3>
            <p>Try this in React 17 and 18</p>
            <code>
                <pre>
                    {`const onDecrement = () => {
    setNumericValue(prevState => prevState - 1);
    setTextualValue('decremented');
};

const onIncrement = () => {
    setTimeout(() => {
        setNumericValue(prevState => prevState + 1);
        setTextualValue('incremented');
    }, 1000);
};`}
                </pre>
            </code>
            <p>- Open the console</p>
            <p>- Clicking on the decrement button will show 1 log in both versions</p>
            <p>- Clicking on the increment button will show 2 logs in React 17, and 1 log in React 18 - both `useState` functions are called in a timeout.</p>
            <p>Note: check <a href={doubleRenderInStrictModeTitle}>Double render in strict mode</a> section for more details why it stills show 2 logs</p>
            <div style={{ margin: '24px 0' }}>
                <button onClick={onDecrement} disabled={numericValue === 0}>-</button>
                <button onClick={onIncrement}>+</button>
            </div>
            <p>Numeric value: {numericValue}</p>
            <p>Textual value: {textualValue}</p>
            <p>To opt-out of automatic batching:</p>
            <code>
                <pre>
                    {`const onDecrement = () => {
    flushSync(() => {
        setNumericValue(prevState => prevState - 1);
    });
    flushSync(() => {
        setTextualValue('decremented');
    });
};`}
                </pre>
            </code>

            <h3>Configure a testing environment</h3>
            <p>You may see this message when updating to React 18:</p>
            <code>
                <pre>
                    The current testing environment is not configured to support act(…)
                </pre>
            </code>

            <p>To fix it:</p>
            <code>
                <pre>
                    {`// In your test setup file
globalThis.IS_REACT_ACT_ENVIRONMENT = true;`}
                </pre>
            </code>
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
        </Layout>
    );
}