import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

type SyntaxWrapperProps = {
    children: string;
}

const SyntaxWrapper: React.FC<SyntaxWrapperProps> = ({ 
  children 
}) => {
    return (
        <SyntaxHighlighter 
            language="html" 
            style={solarizedlight} 
            showLineNumbers={true}
            lineNumberStyle={{ 
                color: "rgb(36, 36, 40)", 
                minWidth: "0px"
            }}
            customStyle={{
                fontSize: "10px",
                backgroundColor: "transparent",
                paddingInlineStart: "0px",
                marginInlineStart: "0px",
                borderStyle: "none",
                width: "fit-content",
                overflowX: "hidden"
            }}
        >
            { children }
        </SyntaxHighlighter> 
    );
}

export default SyntaxWrapper;