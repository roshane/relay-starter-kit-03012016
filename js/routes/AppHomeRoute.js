import Relay from 'react-relay';

export default class extends Relay.Route {
    static queries = {
        asset: () => Relay.QL`
            query {
                asset
            }
        `,
    };
    static routeName = 'AppHomeRoute';
}
