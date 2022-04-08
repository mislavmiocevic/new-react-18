import {Layout} from "../shared/Layout";
import {additionalMinorFeaturesTitle} from "./AdditionalMinorFeatures";
import {useInsertionEffectHookTitle} from "./useInsertionEffectHook";

export const useSyncExternalStoreTitle = 'useSyncExternalStore hook'

export const UseSyncExternalStore = () => {
    return (
        <Layout title={useSyncExternalStoreTitle} previousSectionTitle={useInsertionEffectHookTitle} nextSectionTitle={additionalMinorFeaturesTitle}>
            <p><b>The main purpose is for external store libraries</b></p>
            <p>The hook is created to integrate external store libraries with the concurrent feature.</p>
            <p>It removes the need for useEffect when implementing subscriptions to external data sources, and is recommended for any library that integrates with state external to React.</p>

            <code>
                <pre>
                    {`const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);`}
                </pre>
            </code>
            <p>This method returns the value of the store and accepts three arguments:</p>
            <code>
                <pre>
                    {`subscribe - function to register a callback that is called whenever the store changes.
                    
getSnapshot - function that returns the current value of the store.

getServerSnapshot - function that returns the snapshot used during server rendering.`}
                </pre>
            </code>

            <p>A good example can be found <a href="https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api">here</a>.</p>
        </Layout>
    )
}