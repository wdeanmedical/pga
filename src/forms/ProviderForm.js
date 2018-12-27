import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Images from '@local/assets'
import * as actions from '../actions'
import * as Constants from '../constants/constants'
import styles from '../css/forms/ProviderForm.css'

class ProviderForm extends Component {
  state = {
    name: '',
    company: '',
    website: '',
    email: '',
    specialty: '',
    price: '',
    message: 'enter your suggestion details:',
    title: 'suggestion submission form:',
    submitted: false,
    errors: {},
  }

  componentDidMount() {}

  validateForm = () => {
    this.setState({
      errors: {},
    })

    const { email, website } = this.state

    const errors = {}
    let isValid = true

    const urlPattern = new RegExp(
      /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi
    )
    if (!urlPattern.test(website)) {
      isValid = false
      errors.website = 'enter a valid website url...'
    }

    const emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    )
    if (!emailPattern.test(email)) {
      isValid = false
      errors.email = 'enter a valid email address...'
    }
    this.setState({ errors })
    return isValid
  }

  submitForm = () => {
    const { name, company, website, email, specialty, price } = this.state
    const providerResponse = { name, company, website, email, specialty, price }
    const { sendProviderResponse } = this.props

    if (this.validateForm()) {
      sendProviderResponse(providerResponse)
      this.setState({
        submitted: true,
        title: 'submitted suggestion form',
        message:
          'a rep will respond to your suggestion soon! here is what you submitted:',
      })
    }
  }

  render() {
    const { ambiResponse } = this.props
    const {
      title,
      message,
      name,
      company,
      website,
      email,
      specialty,
      price,
      submitted,
      errors,
    } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{message}</div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>name:</div>
          <input
            type="text"
            disabled={submitted === true}
            className={styles.formItemInput}
            placeholder="enter your name..."
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>company:</div>
          <input
            type="text"
            disabled={submitted === true}
            className={styles.formItemInput}
            placeholder="enter your company name..."
            value={company}
            onChange={e => this.setState({ company: e.target.value })}
          />
        </div>
        <div className={styles.formItemWithMessage}>
          <div className={styles.formItemLabel}>website:</div>
          <input
            type="text"
            disabled={submitted === true}
            className={styles.formItemInput}
            placeholder="enter your company website..."
            value={website}
            onChange={e => this.setState({ website: e.target.value })}
          />
          <div className={styles.errorMessage}>{errors.website}</div>
        </div>
        <div className={styles.formItemWithMessage}>
          <div className={styles.formItemLabel}>email address:</div>
          <input
            type="text"
            disabled={submitted === true}
            className={styles.formItemInput}
            placeholder="enter your email address..."
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <div className={styles.errorMessage}>{errors.email}</div>
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>
            top candy specialty (enter only one):
          </div>
          <input
            type="text"
            disabled={submitted === true}
            className={styles.formItemInput}
            placeholder="enter a candy name..."
            value={specialty}
            onChange={e => this.setState({ specialty: e.target.value })}
          />
        </div>
        <div className={styles.formItem}>
          <div className={styles.formItemLabel}>price per unit:</div>
          <input
            type="text"
            disabled={submitted === true}
            className={styles.formItemInput}
            placeholder="enter a suggested price..."
            value={price}
            onChange={e => this.setState({ price: e.target.value })}
          />
        </div>
        {submitted === false && (
          <div className={styles.formControls}>
            <button
              className={styles.formSubmitButton}
              onClick={this.submitForm}
            >
              Submit
            </button>
          </div>
        )}

        {submitted && (
          <div className={styles.ambiResponse}>
            <div className={styles.ambiResponseTitle}>
              candy store rep response:
            </div>
            <div className={styles.ambiResponseIcons}>
              <img
                width="20"
                height="20"
                src={
                  ambiResponse === Constants.REJECT
                    ? Images.thumbsDownSubmitted
                    : Images.thumbsDown
                }
                alt=""
              />
              <img
                width="20"
                height="20"
                src={
                  ambiResponse === Constants.ACCEPT
                    ? Images.thumbsUpSubmitted
                    : Images.thumbsUp
                }
                alt=""
              />
            </div>
          </div>
        )}
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
