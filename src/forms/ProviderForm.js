import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../actions'
import styles from '../css/forms/ProviderForm.css'

class ProviderForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    score: null,
    message: 'enter player details:',
    title: 'add player',
    errors: {},
  }

  componentDidMount() {}

  processScoreInput = e => {
    const pattern = /^[0-9]*$/
    if (!pattern.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }
    this.setState({ score: +e.target.value })
  }

  validateForm = () => {
    this.setState({
      errors: {},
    })

    const { firstName, lastName, score } = this.state

    const errors = {}
    let isValid = true

    if (firstName.trim().length < 1) {
      isValid = false
      errors.firstName = 'enter a valid first name'
    }

    if (lastName.trim().length < 1) {
      isValid = false
      errors.lastName = 'enter a valid last name'
    }

    if (score < 1 || score > 100) {
      isValid = false
      errors.score = 'enter a whole number between 1 and 100'
    }
    this.setState({ errors })
    return isValid
  }

  submitForm = () => {
    const { firstName, lastName, score } = this.state
    const providerResponse = { firstName, lastName, score }
    const { sendProviderResponse } = this.props

    if (this.validateForm()) {
      sendProviderResponse(providerResponse)
      this.setState({
        firstName: '',
        lastName: '',
        score: '',
        title: 'player added',
        message: '',
      })
    }
  }

  render() {
    const { title, message, firstName, lastName, score, errors } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{message}</div>
        <div className={styles.formItemWithMessage}>
          <div className={styles.formItemLabel}>first name:</div>
          <input
            type="text"
            maxLength="30"
            className={styles.formItemInput}
            placeholder="enter first name"
            value={firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <div className={styles.errorMessage}>{errors.firstName}</div>
        </div>
        <div className={styles.formItemWithMessage}>
          <div className={styles.formItemLabel}>last name:</div>
          <input
            type="text"
            maxLength="30"
            className={styles.formItemInput}
            placeholder="enter last name"
            value={lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          <div className={styles.errorMessage}>{errors.lastName}</div>
        </div>
        <div className={styles.formItemWithMessage}>
          <div className={styles.formItemLabel}>score:</div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter score (1-100)"
            value={score}
            onChange={e => this.processScoreInput(e)}
          />
          <div className={styles.errorMessage}>{errors.score}</div>
        </div>

        <div className={styles.formControls}>
          <button className={styles.formSubmitButton} onClick={this.submitForm}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { ambiResponse } = state.app
  return ambiResponse || {}
}

ProviderForm.propTypes = {
  ambiResponse: PropTypes.string,
  sendProviderResponse: PropTypes.func,
}

ProviderForm.defaultProps = {
  ambiResponse: null,
  sendProviderResponse: undefined,
}

export default connect(
  mapStateToProps,
  actions
)(ProviderForm)
