"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _defaults = require("./defaults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var VindiciaFormWrapper =
/*#__PURE__*/
function (_Component) {
  _inherits(VindiciaFormWrapper, _Component);

  function VindiciaFormWrapper(props, context) {
    var _this;

    _classCallCheck(this, VindiciaFormWrapper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VindiciaFormWrapper).call(this, props, context));

    _this.checkFormValidity = function () {
      var isValid = _this.state.isValid;
      var vindicia = _this.props.vindicia;

      if (isValid !== vindicia.isValid()) {
        _this.setState({
          isValid: !isValid
        });
      }
    };

    _this.onVindiciaFieldChange = function (event) {
      var onVindiciaFieldEvent = _this.props.onVindiciaFieldEvent;

      _this.checkFormValidity();

      return onVindiciaFieldEvent(event);
    };

    _this.onSubmit = function () {
      var formFields = _this.state.formFields;
      var onSubmitEvent = _this.props.onSubmitEvent;

      _this.setState({
        submitInProgress: true
      });

      return onSubmitEvent(formFields);
    };

    _this.onSubmitFail = function (data) {
      var onSubmitCompleteFailedEvent = _this.props.onSubmitCompleteFailedEvent;

      _this.setState({
        submitInProgress: false
      });

      return onSubmitCompleteFailedEvent(data);
    };

    _this.onSubmitComplete = function (data) {
      var onSubmitCompleteEvent = _this.props.onSubmitCompleteEvent;

      _this.setState({
        submitInProgress: false
      });

      return onSubmitCompleteEvent(data);
    };

    _this.state = {
      sessionId: '',
      sessionHash: '',
      localOptions: _this.constructOptions(),
      isValid: false,
      submitInProgress: false,
      formFields: {},
      shouldLoad: _this.shouldLoad()
    };
    return _this;
  }

  _createClass(VindiciaFormWrapper, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.addFieldsToState();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var vindicia = this.props.vindicia;
      var _this$state = this.state,
          localOptions = _this$state.localOptions,
          shouldLoad = _this$state.shouldLoad;

      if (shouldLoad) {
        this.updateHiddenFields();

        if (vindicia) {
          vindicia.setup(localOptions);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var vindicia = this.props.vindicia;

      if (vindicia.destroy) {
        vindicia.destroy();
      }
    }
  }, {
    key: "onFieldChange",
    value: function onFieldChange(field, e) {
      var formFields = this.state.formFields;
      this.setState({
        formFields: _extends({}, formFields, _defineProperty({}, field.name, e.target.value))
      });
      this.checkFormValidity();
    }
  }, {
    key: "shouldLoad",
    value: function shouldLoad() {
      var options = this.props.options;
      return options.hmac && options.vindiciaAuthId;
    }
  }, {
    key: "constructOptions",
    value: function constructOptions() {
      var _this$props = this.props,
          options = _this$props.options,
          fields = _this$props.fields,
          styles = _this$props.styles;
      var hostedFields = {};
      var localFields = fields ? _toConsumableArray(fields) : [];

      if (fields) {
        fields.forEach(function (item) {
          for (var i = 0; i < _defaults.hostedFieldDefaults.length; i += 1) {
            if (item.type === _defaults.hostedFieldDefaults[i].name) {
              hostedFields[_defaults.hostedFieldDefaults[i].name] = {
                selector: item.selector || _defaults.hostedFieldDefaults[i].selector,
                placeholder: item.placeholder || _defaults.hostedFieldDefaults[i].placeholder || '',
                label: item.label || _defaults.hostedFieldDefaults[i].label,
                format: item.format || _defaults.hostedFieldDefaults[i].format,
                formatinput: item.formatinput || _defaults.hostedFieldDefaults[i].formatinput
              };
            }
          }
        });
      } else {
        // if no fields are passed, add the default fields to the form
        for (var i = 0; i < _defaults.hostedFieldDefaults.length; i += 1) {
          if (_defaults.hostedFieldDefaults[i].isDefault) {
            hostedFields[_defaults.hostedFieldDefaults[i].name] = {
              selector: _defaults.hostedFieldDefaults[i].selector,
              format: _defaults.hostedFieldDefaults[i].format,
              placeholder: '',
              type: _defaults.hostedFieldDefaults[i].name,
              formatinput: _defaults.hostedFieldDefaults[i].formatinput
            };
            localFields.push({
              selector: _defaults.hostedFieldDefaults[i].selector,
              label: _defaults.hostedFieldDefaults[i].label,
              format: _defaults.hostedFieldDefaults[i].format,
              placeholder: '',
              type: _defaults.hostedFieldDefaults[i].name,
              formatinput: _defaults.hostedFieldDefaults[i].formatinput
            });
          }
        }
      }

      hostedFields.styles = styles || _defaults.defaultStyles;
      var iframeHeightPadding = options.iframeHeightPadding || 0;
      options.formId = options.formId || 'mainForm';

      var localOptions = _extends({}, options, {
        hostedFields: hostedFields,
        fields: localFields,
        onSubmitEvent: this.onSubmit,
        onSubmitCompleteEvent: this.onSubmitComplete,
        onSubmitCompleteFailedEvent: this.onSubmitFail,
        onVindiciaFieldEvent: this.onVindiciaFieldChange,
        iframeHeightPadding: iframeHeightPadding
      });

      return localOptions;
    }
  }, {
    key: "resetVindicia",
    value: function resetVindicia() {
      var vindicia = this.props.vindicia;
      vindicia.clearData();
      vindicia.resetCompleteStatus();
      this.updateHiddenFields();
    }
  }, {
    key: "updateHiddenFields",
    value: function updateHiddenFields() {
      var options = this.props.options;

      if (options.hmac && typeof options.hmac === 'string') {
        var otlHmacKey = options.hmac;
        var sessionId = "SEAT_PMT_".concat(Math.random().toString(36).substr(2, 9));

        var sessionHash = _cryptoJs["default"].HmacSHA512("".concat(sessionId, "#POST#/payment_methods"), otlHmacKey);

        this.setState({
          sessionId: sessionId,
          sessionHash: sessionHash
        });
      }
    }
  }, {
    key: "addFieldsToState",
    value: function addFieldsToState() {
      var fields = this.props.fields;
      var formFields = {};

      if (fields) {
        fields.forEach(function (field) {
          if (field.name) {
            formFields[field.name] = field.value || '';
          }
        });
      }

      this.setState({
        formFields: formFields
      });
    }
  }, {
    key: "parseStyles",
    value: function parseStyles() {
      var styles = this.state.localOptions.hostedFields.styles;
      var styleOutput = '';
      Object.keys(styles).forEach(function (selector) {
        styleOutput += "".concat(selector, " {\n");
        Object.keys(styles[selector]).forEach(function (rule) {
          styleOutput += "  ".concat(rule, ": ").concat(styles[selector][rule], ";\n");
        });
        styleOutput += '}\n';
      });
      return styleOutput;
    }
  }, {
    key: "renderFields",
    value: function renderFields() {
      var _this2 = this;

      var _this$state2 = this.state,
          _this$state2$localOpt = _this$state2.localOptions,
          fields = _this$state2$localOpt.fields,
          hostedFields = _this$state2$localOpt.hostedFields,
          formFields = _this$state2.formFields;
      return hostedFields && fields.map(function (field, index) {
        var inputField;

        var validHostedFieldValues = _defaults.hostedFieldDefaults.reduce(function (acc, curr) {
          return acc.concat(curr.name);
        }, []);

        if (validHostedFieldValues.includes(field.type)) {
          var selector = hostedFields[field.type].selector;
          selector = selector.substring(1, selector.length);
          inputField = _react["default"].createElement("div", {
            id: selector
          });
        } else {
          inputField = _react["default"].createElement("input", {
            className: "field-group__input ".concat(field.className || ''),
            type: field.type || 'text',
            placeholder: field.placeholder || '',
            value: formFields[field.name],
            id: field.name,
            onChange: function onChange(e) {
              return _this2.onFieldChange(field, e);
            }
          });
        }

        return _react["default"].createElement("div", {
          className: "field-group",
          key: "vin-field-".concat(field.label || field.type || "jsx-".concat(field.name || index))
        }, field.label && _react["default"].createElement("label", {
          className: "field-group__label",
          htmlFor: field.name
        }, field.label), field.render || inputField);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          sessionId = _this$state3.sessionId,
          sessionHash = _this$state3.sessionHash,
          isValid = _this$state3.isValid,
          submitInProgress = _this$state3.submitInProgress,
          shouldLoad = _this$state3.shouldLoad;
      var _this$props2 = this.props,
          options = _this$props2.options,
          children = _this$props2.children,
          vindicia = _this$props2.vindicia,
          vinValidate = _this$props2.vinValidate,
          currency = _this$props2.currency,
          ignoreCvnPolicy = _this$props2.ignoreCvnPolicy,
          minChargebackProb = _this$props2.minChargebackProb,
          sourceIp = _this$props2.sourceIp,
          ignoreAvsPolicy = _this$props2.ignoreAvsPolicy;
      return vindicia && shouldLoad ? _react["default"].createElement("form", {
        id: options.formId || 'mainForm'
      }, _react["default"].createElement("input", {
        name: "vin_session_id",
        value: sessionId,
        type: "hidden"
      }), _react["default"].createElement("input", {
        name: "vin_session_hash",
        value: sessionHash,
        type: "hidden"
      }), vinValidate && _react["default"].createElement("input", {
        name: "vin_validate",
        value: vinValidate,
        type: "hidden"
      }), ignoreAvsPolicy && _react["default"].createElement("input", {
        name: "vin_ignore_avs_policy",
        value: "1",
        type: "hidden"
      }), ignoreCvnPolicy && _react["default"].createElement("input", {
        name: "vin_ignore_cvn_policy",
        value: "1",
        type: "hidden"
      }), minChargebackProb && _react["default"].createElement("input", {
        name: "vin_min_chargeback_probability",
        value: minChargebackProb,
        type: "hidden"
      }), sourceIp && _react["default"].createElement("input", {
        name: "vin_source_ip",
        value: sourceIp,
        type: "hidden"
      }), currency && _react["default"].createElement("input", {
        name: "vin_currency",
        value: "EUR",
        type: "hidden"
      }), _react["default"].createElement("style", {
        type: "text/css",
        dangerouslySetInnerHTML: {
          __html: this.parseStyles()
        }
      }), children || _react["default"].createElement("div", null, this.renderFields(), _react["default"].createElement("button", {
        type: "submit",
        id: "submitButton",
        disabled: !isValid || submitInProgress
      }, "Submit"))) : null;
    }
  }]);

  return VindiciaFormWrapper;
}(_react.Component);

VindiciaFormWrapper.propTypes = {
  options: _propTypes["default"].shape({
    vindiciaAuthId: _propTypes["default"].string,
    hmac: _propTypes["default"].string,
    iframeHeightPadding: _propTypes["default"].number,
    formId: _propTypes["default"].string
  }),
  fields: _propTypes["default"].arrayOf(_propTypes["default"].object),
  styles: _propTypes["default"].shape({}),
  vindicia: _propTypes["default"].shape({
    setup: _propTypes["default"].func,
    destroy: _propTypes["default"].func,
    isValid: _propTypes["default"].func,
    resetCompleteStatus: _propTypes["default"].func,
    clearData: _propTypes["default"].func
  }),
  children: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].node), _propTypes["default"].node]),
  onSubmitEvent: _propTypes["default"].func,
  onSubmitCompleteEvent: _propTypes["default"].func,
  onSubmitCompleteFailedEvent: _propTypes["default"].func,
  onVindiciaFieldEvent: _propTypes["default"].func,
  vinValidate: _propTypes["default"].string,
  currency: _propTypes["default"].bool,
  ignoreCvnPolicy: _propTypes["default"].bool,
  minChargebackProb: _propTypes["default"].string,
  sourceIp: _propTypes["default"].string,
  ignoreAvsPolicy: _propTypes["default"].bool
};
VindiciaFormWrapper.defaultProps = {
  options: {},
  fields: null,
  styles: null,
  vindicia: {},
  children: null,
  onSubmitEvent: function onSubmitEvent() {
    return true;
  },
  onSubmitCompleteEvent: function onSubmitCompleteEvent() {
    return true;
  },
  onSubmitCompleteFailedEvent: function onSubmitCompleteFailedEvent() {
    return true;
  },
  onVindiciaFieldEvent: function onVindiciaFieldEvent() {
    return true;
  },
  vinValidate: null,
  currency: null,
  ignoreCvnPolicy: null,
  minChargebackProb: null,
  sourceIp: null,
  ignoreAvsPolicy: null
};
var _default = VindiciaFormWrapper;
exports["default"] = _default;