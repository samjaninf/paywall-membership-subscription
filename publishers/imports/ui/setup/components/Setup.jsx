import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';

import CopyButton from '../../common/copyButton/components/CopyButton.jsx';
import Toggle from 'react-toggle';

import WordpressSetup from '../containers/WordpressSetup';


export default class Setup extends Component {
  constructor(props) {
    super(props);

    const { usingWordpress } = props.product;

    this.state = {
      usingWordpress: usingWordpress === undefined ? true : usingWordpress,
    };

    this.toggleSetup = this.toggleSetup.bind(this);
  }

  toggleSetup(event) {
    const checked = event.target.checked;
    this.setState({ usingWordpress: checked });
    Meteor.call('products.usingWordpress', this.props.product._id, checked);
  }

  renderSetup() {
    const { product, drizzleScript } = this.props;

    if (!drizzleScript) {
      return (
        <div>
          <h2 className="text-center pad20">
            Setup for <b>non-Wordpress</b> website
          </h2>
          <div className="margin-t-20">
            <h4>
              Setup is not complete. Generate private/widget.js file.
            </h4>
          </div>
        </div>
      );
    }

    const embedCode = `<script>
        (function() {
          ${drizzleScript}
        })();
      </script>`;

    return (
      <div>
        <h2 className="text-center pad20">
          Setup for <b>non-Wordpress</b> website
        </h2>
        <div className="margin-t-20">
          <div id="script" className="text-center">
          </div>

          <h4>
            To start using Drizzle on your website, copy the below code and add it
            to your website {product.url}, just before <code>&lt;/body&gt;</code> tag.
          </h4>

          <textarea rows="9" id="payg-embed-code" value={embedCode} readOnly />

          <div className="text-center pad10">
            <CopyButton
              target="#payg-embed-code"
              text="Copy code"
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { product } = this.props;
    const { usingWordpress } = this.state;

    if (!product) {
      return <span></span>;
    }

    return (
      <div className="tab-content package1">
        <div style={{ backgroundColor: '#f9f9f9' }}>
          <h2 className="col-xs-12 text-center gray-title">
            Are you using Wordpress or Drupal for your website?
          </h2>
          <table className="margin-auto">
            <tbody>
              <tr>
                <td>No</td>
                <td className="text-center">
                  <Toggle
                    id="usingWordpress-switch"
                    name="usingWordpress-switch"
                    checked={usingWordpress}
                    onChange={this.toggleSetup}
                  />
                </td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>

        {usingWordpress ? <WordpressSetup /> : this.renderSetup()}
      </div>
    );
  }
}

Setup.propTypes = {
  product: PropTypes.object.isRequired,
  drizzleScript: PropTypes.string,
};
