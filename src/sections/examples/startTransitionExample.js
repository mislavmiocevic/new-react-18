import {Layout} from "../../shared/Layout";
import {startTransitionAPITitle} from "../startTransitionAPI";
import {useState, useTransition} from "react";

export const startTransitionExampleTitle = 'startTransition example';

const items = [];

for (let i = 0; i < 100000; i++) {
    items.push({
        id: i,
        title: `Item ${i + 1}`
    });
}

export const StartTransitionExample = () => {
    const [isPending, startTransition] = useTransition();
    const [filter, setFilter] = useState('');

    const onChange = (event) => {
        startTransition(() => {
            setFilter(event.target.value);
        });
    }

    const filteredItems = Boolean(filter) ?
        items.filter(item => item.title.toLowerCase()
            .includes(filter.toLowerCase()))
        : items;

    return (
        <Layout title={startTransitionExampleTitle} previousSectionTitle={startTransitionAPITitle}>
            <p>Try to comment in and out <code>startTransition</code> and see how it feels for the input type. Lower the number of items if this number is too big for your device.</p>
            <p>You can see that with <code>startTransition</code> we are making (our) state updates for the input field changes less prioritized.
            Because of that you see faster user inputs, but slower <code>setFilter</code> execution - we speed up the UI for input (handled internally by React), but slowed down the list rerender. Because of this, the list
            feels less prioritized since it depends on the filter change - which was delayed. <code>startTransition</code> here
                does not fix the issue with the large lists, and this code is just to demonstrate how prioritization can impact
            both positive and negative so use it wisely.</p>
            <code>
                <pre style={{ marginBottom: '40px' }}>
                    {`const items = [];

for (let i = 0; i < 100000; i++) {
    items.push({
        id: i,
        title: \`Item \${i + 1}\`
    });
}

export const StartTransitionExample = () => {
    const [isPending, startTransition] = useTransition();
    const [filter, setFilter] = useState('');

    const onChange = (event) => {
        startTransition(() => {
            setFilter(event.target.value);
        });
    };

    const filteredItems = Boolean(filter) ?
        items.filter(item => item.title.toLowerCase()
            .includes(filter.toLowerCase()))
        : items;

    return (
        <>
            <input type="text" onChange={onChange} />
            <div>Keystroke update status: {isPending ? 'Pending' : 'Done'}</div>
            <ul>
                {filteredItems.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </>
    );
}`}
                </pre>
            </code>

            <input type="text" onChange={onChange} />
            <div style={{ margin: '24px 0' }}>Keystroke update status: {isPending ? 'Pending' : 'Done'}</div>
            <ul style={{ height: '210px', overflow: 'auto', border: '1px solid blue' }}>
                {filteredItems.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </Layout>
    )
}