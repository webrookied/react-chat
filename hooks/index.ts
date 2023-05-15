// function withLogin(WrappedComponent) {
//   return class extends React.Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         isLoggedIn: false,
//         login: this.login.bind(this),
//       }
//     }
//     login() {
//       this.setState({ isLoggedIn: true })
//     }
//     render() {
//       return <WrappedComponent {...this.props} {...this.state} />
//     }
//   }
// }
