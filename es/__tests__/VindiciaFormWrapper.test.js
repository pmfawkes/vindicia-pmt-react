"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireWildcard(require("enzyme"));

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

var _VindiciaFormWrapper = _interopRequireDefault(require("../components/VindiciaFormWrapper"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_enzyme["default"].configure({
  adapter: new _enzymeAdapterReact["default"]()
});

describe('VindiciaFormWrapper', function () {
  var vindiciaObj = {
    setup: jest.fn(),
    destroy: jest.fn(),
    isValid: jest.fn(),
    clearData: jest.fn(),
    resetCompleteStatus: jest.fn()
  };
  var fields = [{
    type: 'text',
    label: 'Name',
    name: 'cardholder-name'
  }, {
    type: 'cardNumber',
    label: 'Credit Card Number',
    placeholder: 'CC Number',
    autocomplete: 'cc-number',
    formatinput: true,
    maskinput: true
  }, {
    type: 'expirationDate',
    label: 'Expiration Date',
    placeholder: 'MM/YY',
    format: 'MM/YY',
    autocomplete: 'cc-exp',
    formatinput: true,
    maskinput: true
  }, {
    type: 'cvn',
    label: 'CVN',
    placeholder: 'CVN',
    autocomplete: 'cc-csc'
  }];
  var options = {
    hmac: '12345',
    vindiciaAuthId: '12345'
  };
  it('should render without throwing an error', function () {
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(_VindiciaFormWrapper["default"], {
      fields: fields,
      vindicia: vindiciaObj,
      options: options
    }));
    console.log(wrapper.debug());
    expect(wrapper.exists('#mainForm')).toBe(true);
  });
  it('should unmount and destroy itself', function () {
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(_VindiciaFormWrapper["default"], {
      fields: fields,
      vindicia: vindiciaObj,
      options: options
    }));
    expect(vindiciaObj.setup).toHaveBeenCalled();
    wrapper.unmount();
    expect(vindiciaObj.destroy).toHaveBeenCalled();
  });
  it('should generate default fields when no fields are passed in', function () {
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(_VindiciaFormWrapper["default"], {
      vindicia: vindiciaObj,
      options: options
    })); // default fields at this time: cardNumber, expirationDate, cvn

    expect(wrapper.state('localOptions')['hostedFields']['cardNumber']).toBeTruthy();
    expect(wrapper.state('localOptions')['hostedFields']['expirationDate']).toBeTruthy();
    expect(wrapper.state('localOptions')['hostedFields']['cvn']).toBeTruthy();
  });
  it('should load fields and change field value in state', function () {
    var nameValue = 'Hans Christian Anderson';
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(_VindiciaFormWrapper["default"], {
      fields: fields,
      vindicia: vindiciaObj,
      options: options
    }));
    expect(wrapper.state('formFields')).toEqual({
      'cardholder-name': ''
    });
    wrapper.find('#cardholder-name').simulate('change', {
      target: {
        value: nameValue
      }
    });
    expect(wrapper.state('formFields')).toEqual({
      'cardholder-name': nameValue
    });
  });
  it('should allow submit only when form is valid', function () {
    var mockSubmit = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(_VindiciaFormWrapper["default"], {
      fields: fields,
      vindicia: vindiciaObj,
      onSubmitEvent: mockSubmit,
      options: options
    }));
    expect(wrapper.find('button').prop('disabled')).toEqual(true);
    wrapper.setState({
      isValid: true
    });
    expect(wrapper.find('button').prop('disabled')).toEqual(false);
    expect(wrapper.state('submitInProgress')).toEqual(false); // simulate form submission

    wrapper.instance().onSubmit();
    expect(wrapper.state('submitInProgress')).toEqual(true);
    expect(mockSubmit.mock.calls.length).toEqual(1);
  });
  it('should call passed in props on prop events', function () {
    var mockFieldChange = jest.fn(),
        mockSubmitComplete = jest.fn(),
        mockSubmitFail = jest.fn(),
        mockSubmit = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(_VindiciaFormWrapper["default"], {
      fields: fields,
      vindicia: vindiciaObj,
      onSubmitEvent: mockSubmit,
      onSubmitCompleteEvent: mockSubmitComplete,
      onSubmitCompleteFailedEvent: mockSubmitFail,
      onVindiciaFieldEvent: mockFieldChange,
      options: options
    }));
    wrapper.instance().onVindiciaFieldChange();
    expect(mockFieldChange.mock.calls.length).toEqual(1);
    wrapper.instance().onSubmit();
    expect(mockSubmit.mock.calls.length).toEqual(1);
    wrapper.instance().onSubmitComplete();
    expect(mockSubmitComplete.mock.calls.length).toEqual(1);
    wrapper.instance().onSubmitFail();
    expect(mockSubmitFail.mock.calls.length).toEqual(1);
  });
  it('should make use of resetVindicia', function () {
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(_VindiciaFormWrapper["default"], {
      fields: fields,
      vindicia: vindiciaObj,
      options: options
    }));
    var startingHash = wrapper.state('sessionHash');
    wrapper.instance().resetVindicia();
    expect(wrapper.state('sessionHash')).not.toEqual(startingHash);
  });
});