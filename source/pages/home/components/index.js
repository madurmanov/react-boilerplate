import debug from 'debug'
import React, { Fragment, PureComponent } from 'react'

const log = debug('app:home:Index')

class Index extends PureComponent {
  constructor() {
    super()
    this.state = {
      value: '',
      seconds: 5,
    }
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      const seconds = this.state.seconds - 1
      if (seconds < 0) {
        clearInterval(this.timer)
      } else {
        this.setState({
          seconds,
        })
      }
    }, 1000)
    this.props.fetchAppName()
  }

  handleChangeName = event => {
    this.setState({
      value: event.target.value,
    })
  }

  handleTellName = () => {
    this.props.changeName(this.state.value)
    this.startTimer()
  }

  render() {
    log('render')

    const {
      name,
      appName,
    } = this.props

    const {
      value,
      seconds,
    } = this.state

    return (
      <Fragment>
        Tell me your name:&nbsp;
        <input
          type="text"
          value={value}
          onChange={this.handleChangeName}
        />
        <button onClick={this.handleTellName}>Tell</button>
        { name && (
          <Fragment>
            <p>Nice to meet you {name} ;)</p>
            <p>Now it is my turn to tell you my name!</p>
            { appName && !seconds ? (
              <p>Thank you for waiting!<br />My name is {appName} :))</p>
            ) : (
              <p>Please wait {seconds} seconds.</p>
            ) }
          </Fragment>
        ) }
      </Fragment>
    )
  }
}

export default Index
