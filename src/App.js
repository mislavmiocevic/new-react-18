import {Migration, migrationTitle} from "./sections/Migration";
import {isSectionVisible} from "./utils";
import reactImage from './adult-react.jpeg';
import {DoubleRenderInStrictMode, doubleRenderInStrictModeTitle} from "./sections/DoubleRenderInStrictMode";
import {AdditionalMinorFeatures, additionalMinorFeaturesTitle} from "./sections/AdditionalMinorFeatures";
import {UseIdHook, useIdHookTitle} from "./sections/useIdHook";
import {StartTransitionAPI, startTransitionAPITitle} from "./sections/startTransitionAPI";
import {StartTransitionExample, startTransitionExampleTitle} from "./sections/examples/startTransitionExample";
import {UseDeferredValueHook, useDeferredValueHookTitle} from "./sections/useDeferredValueHook";

const App = () => {
    return (
        <>
            <h1>React 18</h1>
            {window.location.pathname === '/' ? (
                <>
                    <ul style={{ marginBottom: '128px' }}>
                        <li><a href={migrationTitle}>{migrationTitle}</a></li>
                        <li><a href={doubleRenderInStrictModeTitle}>{doubleRenderInStrictModeTitle}</a></li>
                        <li><a href={useIdHookTitle}>{useIdHookTitle}</a></li>
                        <li><a href={startTransitionAPITitle}>{startTransitionAPITitle}</a></li>
                        <li><a href={additionalMinorFeaturesTitle}>{additionalMinorFeaturesTitle}</a></li>
                    </ul>

                    <img width={300} height={300} src={reactImage} alt="React 18" />
                </>
            ): null}

            {isSectionVisible(migrationTitle) ? (
                <Migration/>
            ): null}

            {isSectionVisible(doubleRenderInStrictModeTitle) ? (
                <DoubleRenderInStrictMode/>
            ): null}

            {isSectionVisible(useIdHookTitle) ? (
                <UseIdHook/>
            ): null}

            {isSectionVisible(startTransitionAPITitle) ? (
                <StartTransitionAPI/>
            ): null}

            {isSectionVisible(startTransitionExampleTitle) ? (
                <StartTransitionExample/>
            ): null}

            {isSectionVisible(useDeferredValueHookTitle) ? (
                <UseDeferredValueHook/>
            ): null}

            {isSectionVisible(additionalMinorFeaturesTitle) ? (
                <AdditionalMinorFeatures/>
            ): null}
        </>
    );
}

export default App;
