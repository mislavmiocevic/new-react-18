export const Layout = ({ children, title, previousSectionTitle, nextSectionTitle }) => {
    return (
        <div>
            <h2>{title}</h2>

            <div>
                {children}
            </div>

            <div style={{ marginTop: '128px' }}>
                {previousSectionTitle ? (
                    <a style={{ marginRight: '48px' }} href={previousSectionTitle}> {'<'} {previousSectionTitle}</a>
                ) : null}
                {nextSectionTitle ? (
                    <a href={nextSectionTitle}>{nextSectionTitle} {'>'}</a>
                ) : null}

                <a style={{ marginLeft: '48px' }} href="/">Home</a>
            </div>
        </div>
    )
}