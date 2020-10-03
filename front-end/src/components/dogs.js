import React from 'react'

class Dogs extends React.Component {

  constructor() {
    super();
    this.state = {
      accounts: []
    }
  }

  componentDidMount() {
    fetch('dogs/details')
      .then(res => res.json())
      .then(accounts => this.setState({accounts}, () => console.log('dogs fetched..',
      accounts)))
  }

  render(){
    return(
      <div>
        <h2>Dog Details</h2>
        <ul>
          {this.state.accounts.map(accounts =>
            <li key={accounts}>{accounts.name} is a {accounts.colour} {accounts.breed}. {accounts.name} was born on {accounts.dob}. They currently have {accounts.votes} </li>
            )}
        </ul>
      </div>
    )
  }

}

export default Dogs