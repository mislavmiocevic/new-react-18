import {Layout} from "../shared/Layout";
import {additionalFeaturesTitle} from "./AdditionalFeatures";
import {useInsertionEffectHookTitle} from "./useInsertionEffectHook";
import {Code} from "../shared/Code";

export const useSyncExternalStoreTitle = 'useSyncExternalStore hook'

export const UseSyncExternalStore = () => {
    return (
        <Layout title={useSyncExternalStoreTitle} previousSectionTitle={useInsertionEffectHookTitle} nextSectionTitle={additionalFeaturesTitle}>
            <p><b>The main purpose is for external store libraries</b></p>
            <p>The hook is created to integrate external store libraries with the concurrent feature.</p>
            <p>It removes the need for useEffect when implementing subscriptions to external data sources, and is recommended for any library that integrates with state external to React.</p>

            <Code code={`const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);`} />
            <p>This method returns the value of the store and accepts three arguments:</p>
            <Code language="markdown" code={`subscribe - function to register a callback that is called whenever the store changes.
                    
getSnapshot - function that returns the current value of the store.

getServerSnapshot - function that returns the snapshot used during server rendering.`} />

            <p>A good example can be found <a href="https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api">here</a>.</p>
        </Layout>
    )
}