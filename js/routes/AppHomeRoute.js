import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    customers: () => Relay.QL` query { customers } `,
  };
  static routeName = 'AppHomeRoute';
}
