import {Layout} from "../../shared/Layout";
import {useDeferredValueHookTitle} from "../useDeferredValueHook";
import {Suspense, useDeferredValue, useState} from "react";
import useSWR from "swr";
import {Code} from "../../shared/Code";

export const useDeferredValueExampleTitle = 'useDeferredValue example';

// fake API filtering endpoints
// {"items": ["A", "B"]}
const bothAandBTodosUrl = 'https://run.mocky.io/v3/391b26ff-8432-4ddd-866f-c1a5288e44e9'
// {"items": ["A"]}
const onlyATodoUrl = 'https://run.mocky.io/v3/7c268812-4c98-458b-af82-23da7e861109';
// {"items": ["B"]}
const onlyBTodoUrl = 'https://run.mocky.io/v3/c1dc9ee7-ddc0-41e8-bc2e-bf8ff3743c3e';

const useItems = (searchTerm) => {
    return useSWR(
        `todos-${searchTerm}`,
        () => {
            // ignore this url logic, this is just to fake an API filtering
            // e.g. https://api.com/todos?query=${searchTerm}
            let url = bothAandBTodosUrl;

            if (searchTerm.toUpperCase() === 'A') {
                url = onlyATodoUrl;
            } else if (searchTerm.toUpperCase() === 'B') {
                url = onlyBTodoUrl;
            }

            return fetch(url)
                .then(response => response.json())
                .then(data => data);
        },
        {
            suspense: true // key property for all this to work
        }
    )
};

const Items = ({ searchTerm }) => {
    const { data } = useItems(searchTerm);

    if (!data.items) {
        return null;
    }

    return (
        <div style={{ marginTop: '8px' }}>
            {data.items.map(item => (
                <div style={{ backgroundColor: 'cyan', width: '100px', marginBottom: '4px' }} key={item}>{item}</div>
            ))}
        </div>
    )
}

export const UseDeferredValueExample = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const deferredSearchTerm = useDeferredValue(searchTerm);

    return (
        <Layout title={useDeferredValueExampleTitle} previousSectionTitle={useDeferredValueHookTitle}>
            <p>The example uses <code>Suspense</code> which has the <code>fallback</code> prop. For the <code>Suspense</code>
            children there is a dummy component showing the items from the fake API (the Mocky.io responses are used). To get the
                data, <a href="https://swr.vercel.app/docs/suspense">SWR</a> with the suspense (experimental) feature is used.
            When typing "a" (or "A") the search filter is changed, and then the specific fake endpoint for filtering "a/A" is used in SWR fetcher.
                When typing "b" (or "B") the search filter is changed, and then the specific fake endpoint for filtering "b/B" is used in SWR fetcher.
                When typing anything else the search filter is changed, and then the specific fake endpoint for filtering both "a/A" and "b/B" is used in SWR fetcher.</p>
            <p><code>searchTerm</code>prop is deferred and sent to SWR. By using the deferred value, the <code>Suspense fallback</code>
            prop is deferred and no <code>loading...</code> is visible.</p>
            <p>Try to change <code>{`<Items searchTerm={deferredSearchTerm} />`}</code> to <code>{`<Items searchTerm={searchTerm} />`}</code>. You
            will notice the loading in the UI.</p>
            <p>To improve this, you can memoize the items component.</p>

            <p className="example" style={{ marginTop: '64px' }}>Example - useDeferredValue</p>
            <input
                style={{ width: '400px' }}
                placeholder={`type "a" ("A"), or "b" ("B"), or other chars to see the filtering`}
                type="text"
                value={searchTerm}
                onChange={(event) => { setSearchTerm(event.target.value) }}
            />

            <Suspense fallback={<div>Loading...</div>}>
                <Items searchTerm={deferredSearchTerm} /> {/* change to searchTerm to see the effect */}
            </Suspense>

            <p style={{ marginTop: '64px' }} className="example-code">Example code - useDeferredValue</p>
            <Code code={`// fake API filtering endpoints
// {"items": ["A", "B"]}
const bothAandBTodosUrl = 'https://run.mocky.io/v3/391b26ff-8432-4ddd-866f-c1a5288e44e9'
// {"items": ["A"]}
const onlyATodoUrl = 'https://run.mocky.io/v3/7c268812-4c98-458b-af82-23da7e861109';
// {"items": ["B"]}
const onlyBTodoUrl = 'https://run.mocky.io/v3/c1dc9ee7-ddc0-41e8-bc2e-bf8ff3743c3e';

const useItems = (searchTerm) => {
    return useSWR(
        \`todos-$\{searchTerm}\`,
        () => {
            // ignore this url logic, this is just to fake an API filtering
            // e.g. https://api.com/todos?query=${searchTerm}
            let url = bothAandBTodosUrl;

            if (searchTerm.toUpperCase() === 'A') {
                url = onlyATodoUrl;
            } else if (searchTerm.toUpperCase() === 'B') {
                url = onlyBTodoUrl;
            }

            return fetch(url)
                .then(response => response.json())
                .then(data => data);
        },
        {
            suspense: true // key property for all this to work
        }
    )
};

const Items = ({ searchTerm }) => {
    const { data } = useItems(searchTerm);

    if (!data.items) {
        return null;
    }

    return (
        <div>
            {data.items.map(item => (
                <div key={item}>{item}</div>
            ))}
        </div>
    )
}

const Example = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const deferredSearchTerm = useDeferredValue(searchTerm);
    
    return (
        <>
            <input
                type="text"
                value={searchTerm}
                onChange={(event) => { setSearchTerm(event.target.value) }}
            />

            <Suspense fallback={<div>Loading...</div>}>
                <Items searchTerm={deferredSearchTerm} /> {/* change to searchTerm to see the effect */}
            </Suspense>
        </>
    );
}`} />
        </Layout>
    )
}