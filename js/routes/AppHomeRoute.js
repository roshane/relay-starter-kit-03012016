import Relay from 'react-relay';

export default class extends Relay.Route {
    static queries = {
        asset: (Component) => Relay.QL`
            query {
                asset{
                    ${Component.getFragment('asset')}
                }
            }
        `,
    };
    static routeName = 'AppHomeRoute';
}
