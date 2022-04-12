import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

export const Code = ({ code, language = 'jsx' }) => {
    return (
        <Highlight {...defaultProps} language={language} theme={theme} code={code}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ ...style, padding: '8px'}}>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
              </pre>
            )}
        </Highlight>
    )
}