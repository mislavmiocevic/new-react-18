import {Layout} from "../shared/Layout";

export const migrationTitle = 'Migration from 17 to 18';

export const Migration = () => {
    return (
        <Layout title={migrationTitle} previousSectionTitle={'/'} nextSectionTitle={'todo'}>
            todo
        </Layout>
    )
}