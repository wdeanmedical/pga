import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../actions'
import * as Constants from '../constants/constants'
import styles from '../css/forms/ProviderForm.css'

class ProviderForm extends Component {
  state = {
    errors: {},
  }

  componentDidMount() {}

  processScoreInput = e => {
    const pattern = /^[0-9]*$/
    if (!pattern.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }
    this.score.value = +e.target.value
  }

  validateForm = () => {
    this.setState({
      errors: {},
    })

    const errors = {}
    let isValid = true

    if (this.firstName.value.trim().length < 1) {
      isValid = false
      errors.firstName = 'enter a valid first name'
    }

    if (this.lastName.value.trim().length < 1) {
      isValid = false
      errors.lastName = 'enter a valid last name'
    }

    if (this.score.value < 1 || this.score.value > 100) {
      isValid = false
      errors.score = 'enter a whole number between 1 and 100'
    }
    this.setState({ errors })
    return isValid
  }

  submitForm = () => {
    const providerResponse = {
      firstName: this.firstName.value.trim(),
      lastName: this.lastName.value.trim(),
      score: +this.score.value,
    }
    const { sendProviderResponse } = this.props

    if (this.validateForm()) {
      sendProviderResponse(providerResponse)

      this.firstName.value = ''
      this.lastName.value = ''
      this.score.value = ''
    }
  }

  render() {
    const { ambiResponse, formMode } = this.props
    const { errors } = this.state

    if (Object.keys(ambiResponse).length > 0) {
      this.firstName.value = ambiResponse.firstName
      this.lastName.value = ambiResponse.lastName
      this.score.value = +ambiResponse.score
    }

    console.log(`render() - this.props: ${JSON.stringify(this.props)}`)
    console.log(`render() - ambiResponse: ${JSON.stringify(ambiResponse)}`)

    return (
      <div className={styles.root}>
        <div className={styles.title}>{formMode} player</div>
        <div className={styles.formItemWithMessage}>
          <div className={styles.formItemLabel}>first name:</div>
          <input
            type="text"
            maxLength="30"
            className={styles.formItemInput}
            placeholder="enter first name"
            ref={input => (this.firstName = input)}
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
            ref={input => (this.lastName = input)}
          />
          <div className={styles.errorMessage}>{errors.lastName}</div>
        </div>
        <div className={styles.formItemWithMessage}>
          <div className={styles.formItemLabel}>score:</div>
          <input
            type="text"
            className={styles.formItemInput}
            placeholder="enter score (1-100)"
            ref={input => (this.score = input)}
            onChange={e => this.processScoreInput(e)}
          />
          <div className={styles.errorMessage}>{errors.score}</div>
        </div>

        <div className={styles.formControls}>
          {formMode === Constants.EDIT && (
            <button
              className={styles.formDeleteButton}
              onClick={this.deletePlayer}
            >
              Delete
            </button>
          )}
          <button className={styles.formSubmitButton} onClick={this.submitForm}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { ambiResponse, formMode } = state.app
  console.log('mapStateToProps formMode', formMode)
  return { ambiResponse, formMode }
}

ProviderForm.propTypes = {
  formMode: PropTypes.string,
  ambiResponse: PropTypes.object,
  sendProviderResponse: PropTypes.func,
}

ProviderForm.defaultProps = {
  formMode: Constants.ADD,
  ambiResponse: {},
  sendProviderResponse: undefined,
}

export default connect(
  mapStateToProps,
  actions
)(ProviderForm)
