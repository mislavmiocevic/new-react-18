import {Migration, migrationTitle} from "./sections/Migration";
import {isSectionVisible} from "./utils";
import reactImage from './adult-react.jpeg';
import {DoubleRenderInStrictMode, doubleRenderInStrictModeTitle} from "./sections/DoubleRenderInStrictMode";

const App = () => {
    return (
        <>
            <h1>React 18</h1>
            {window.location.pathname === '/' ? (
                <>
                    <ul style={{ marginBottom: '128px' }}>
                        <li><a href={migrationTitle}>{migrationTitle}</a></li>
                        <li><a href={doubleRenderInStrictModeTitle}>{doubleRenderInStrictModeTitle}</a></li>
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
        </>
    );
}

export default App;
