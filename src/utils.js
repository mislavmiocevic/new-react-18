export const isSectionVisible = (sectionTitle) => {
    return window.location.pathname === `/${encodeURIComponent(sectionTitle)}`;
}