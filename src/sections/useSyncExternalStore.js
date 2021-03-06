import {Layout} from "../shared/Layout";
import {additionalFeaturesTitle} from "./AdditionalFeatures";
import {Code} from "../shared/Code";
import {useIdHookTitle} from "./useIdHook";

export const useSyncExternalStoreTitle = 'useSyncExternalStore hook'

export const UseSyncExternalStore = () => {
    return (
        <Layout title={useSyncExternalStoreTitle} previousSectionTitle={useIdHookTitle} nextSectionTitle={additionalFeaturesTitle}>
            <p><b>The main purpose is for external store libraries</b></p>
            <p>The hook is created to integrate external store libraries with the concurrent feature.</p>
            <p>It removes the need for useEffect when implementing subscriptions to external data sources, and is recommended for any library that integrates with state external to React.</p>

            <Code code={`const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);`} />
            <p>This method returns the value of the store and accepts three arguments:</p>
            <Code language="markdown" code={`subscribe - function to register a callback that is called whenever the store changes.
                    
getSnapshot - function that returns the current value of the store.

getServerSnapshot - function that returns the snapshot used during server rendering.`} />

            <p>A good example can be found <a target="_blank" href="https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api">here</a>.</p>

            <p>The idea about this hook is to fix <a target="_blank" href="https://github.com/reactwg/react-18/discussions/69">tearing</a>.
                Before React 18, this issue did not come up. But in React 18, concurrent rendering makes
                this issue possible because React pauses during rendering. Between these pauses,
                updates can pull in the changes related to the data being used to render.
                It causes the UI to show two different values for the same data.
                To hook into the concurrent system, the libraries need this hook.
        </p>
        </Layout>
    )
}