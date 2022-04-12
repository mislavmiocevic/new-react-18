import {Layout} from "../shared/Layout";
import {useDeferredValueHookTitle} from "./useDeferredValueHook";
import {useIdHookTitle} from "./useIdHook";

export const useInsertionEffectHookTitle = 'useInsertionEffect hook'

export const UseInsertionEffectHook = () => {
    return (
        <Layout title={useInsertionEffectHookTitle} previousSectionTitle={useDeferredValueHookTitle} nextSectionTitle={useIdHookTitle}>
            <p><b>The main purpose is for CSS-in-JS libraries</b></p>
            <p>The flow is to generate new rules on the fly and insert them with <code>{`<style>`}</code> tags in the document.</p>
            <p>You noticed that sometimes, <code>{`<style>`}</code> tags are generated on the client, also after the page is loaded.
            This has an impact on the performance issues because adding or removing CSS rules means that the browser needs to check
            all styles and see if the rules needs to be applied. - CSS rules have to be recalculated against all DOM nodes
                for every frame while React is rendering</p>
        </Layout>
    )
}