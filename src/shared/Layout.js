export const Layout = ({ children, title, previousSectionTitle, nextSectionTitle }) => {
    return (
        <div>
            <h2>{title}</h2>

            <div style={{ margin: '48px 0' }}>
                {children}
            </div>

            <div>
                {previousSectionTitle ? (
                    <a style={{ marginRight: '48px' }} href={previousSectionTitle}> {'<'} {previousSectionTitle}</a>
                ) : null}
                {nextSectionTitle ? (
                    <a href={nextSectionTitle}>{nextSectionTitle} {'>'}</a>
                ) : null}
            </div>
        </div>
    )
}