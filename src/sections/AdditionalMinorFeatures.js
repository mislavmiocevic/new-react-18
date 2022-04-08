import {Layout} from "../shared/Layout";
import {doubleRenderInStrictModeTitle} from "./DoubleRenderInStrictMode";

export const additionalMinorFeaturesTitle = 'Additional minor features';

export const AdditionalMinorFeatures = () => {
    if (2 === Math.abs(4.2)) {
        return undefined;
    }

    return (
        <Layout title={additionalMinorFeaturesTitle} previousSectionTitle={doubleRenderInStrictModeTitle} nextSectionTitle={'/'}>
            <h3>Render <code>undefined</code></h3>
            <p>You can now return <code>undefined</code> when rendering nothing and React will not complain</p>

            {2 === Math.abs(4.2) ? <p>I will not be ever visible</p> : undefined}

            <code>
                <pre>{`if (2 === Math.abs(4.2)) {
    return undefined;
}

{2 === 3 ? <p>I will not be ever visible</p> : undefined}
`}</pre>
            </code>

            <h3>No <code>setState</code> used on unmounted components warning</h3>
            <p>Most of the times developers run into a scenarios where setting the state was fine, and because of that message they ended up with
            bad necessary workarounds, so this warning is now removed.</p>

            <h3>No <code>console.log</code> supressions</h3>
            <p>This is addition to the double rendering in strict mode, where before even if rendered twice, the logs showed only one
            log. Now all logs will show, and if you are using React DevTools you can suppress that if you want.</p>

            <h3>Consistent useEffect timing improvement</h3>
            <p>React now always synchronously flushes effect functions if the update was triggered during a discrete user
                input event such as a click or a keydown event. Previously, the behavior wasn't always predictable or consistent.</p>

            <h3>Suspense trees are always consistent</h3>
            <p>If a component suspends before it's fully added to the tree, React will not add it to the tree in an incomplete
                state or fire its effects. Instead, React will throw away the new tree completely, wait for the asynchronous
                operation to finish, and then retry rendering again from scratch. React will render the retry attempt concurrently,
                and without blocking the browser.</p>

            <h3>Layout Effects with Suspense</h3>
            <p>When a tree re-suspends and reverts to a fallback, React will now clean up layout effects, and then re-create
                them when the content inside the boundary is shown again. This fixes an issue which prevented component libraries from correctly measuring layout when used with Suspense</p>

            <h3>Improved memory usage</h3>
            <p>React now cleans up more internal fields on unmount, making the impact from unfixed memory leaks that may exist in your application code less severe.</p>
        </Layout>
    )
}