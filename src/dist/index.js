"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step = exports.Steps = void 0;

var react_1 = __importStar(require("react"));

var StepsContext = react_1.default.createContext({
  // Dummy values for satisfying the type checker
  // Gets updated before being passed down
  size: 0,
  current: 1,
  progress: 0,
  allSteps: [],
  state: {},
  rate: {},
  handleChange: function handleChange(event) {},
  setState: function setState(key, value) {},
  getState: function getState(key, defaultValue) {
    return "";
  },
  setRate: function setRate(key, value) {},
  getRate: function getRate(key, defaultValue) {
    return "";
  },
  next: function next() {},
  prev: function prev() {},
  jump: function jump(id) {}
});
var StepContext = react_1.default.createContext({
  order: 0
});
/**
 * Wrapper component for `Step` components.
 */

function Steps(_a) {
  var _b, _c;

  var children = _a.children,
      config = _a.config;
  var childSteps = react_1.default.Children.toArray(children);

  var NavigationComponent = function NavigationComponent(context) {
    var _a, _b;

    if ((_a = config === null || config === void 0 ? void 0 : config.navigation) === null || _a === void 0 ? void 0 : _a.component) {
      var NavComponent = (_b = config === null || config === void 0 ? void 0 : config.navigation) === null || _b === void 0 ? void 0 : _b.component;
      return react_1.default.createElement(NavComponent, __assign({}, context));
    }
  };

  var BeforeComponent = function BeforeComponent(context) {
    if (config === null || config === void 0 ? void 0 : config.before) {
      var Before = config.before;
      return react_1.default.createElement(Before, __assign({}, context));
    }
  };

  var AfterComponent = function AfterComponent(context) {
    if (config === null || config === void 0 ? void 0 : config.after) {
      var After = config.after;
      return react_1.default.createElement(After, __assign({}, context));
    }
  };

  var allSteps = childSteps.map(function (child, order) {
    return {
      title: child.props.title || "Step " + (order + 1),
      order: order + 1
    };
  });
  var size = childSteps.length;

  var _current = react_1.useState(1);

  var current = _current[0];
  var setCurrent = _current[1];

  var _stepState = react_1.useState({});

  var stepState = _stepState[0];
  var setStepState = _stepState[1];

  var _stepRate = react_1.useState({});

  var stepRate = _stepRate[0];
  var setStepRate = _stepRate[1];

  var _progress = react_1.useState(0);

  var progress = _progress[0];
  var setProgress = _progress[1];
  react_1.useEffect(function () {
    if (current === 1) setProgress(0);else if (current === size) setProgress(1);else setProgress(Number(((current - 1) / (size - 1)).toFixed(2)));
  }, [current, setProgress, size]);

  var next = function next() {
    if (current < size) {
      setCurrent(current + 1);
    }
  };

  var prev = function prev() {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  var jump = function jump(step) {
    if (step >= 1 && step <= size) {
      setCurrent(step);
    }
  };

  var getState = function getState(key, defaultValue) {
    if (key in stepState) {
      return stepState[key];
    }

    return defaultValue;
  };

  var getRate = function getRate(key, defaultValue) {
    if (key in stepRate) {
      return stepRate[key];
    }

    return defaultValue;
  };

  var setState = function setState(key, value) {
    var newState = Object.assign({}, stepState);
    newState[key] = value;
    setStepState(newState);
  };

  var setRate = function setRate(key, value) {
    var newRate = Object.assign({}, stepRate);
    newRate[key] = value;
    setStepRate(newRate);
  };

  var handleChange = function handleChange(event) {
    var key = event.currentTarget.name;
    var inputType = event.currentTarget.type;
    var value = inputType === "checkbox" ? event.currentTarget.checked : event.currentTarget.value;
    var newState = Object.assign({}, stepState);
    newState[key] = value;
    setStepState(newState);

    var newRate = Object.assign({}, stepRate);
    newRate[key] = value;
    setStepRate(newRate);
  };

  var context = {
    size: size,
    current: current,
    progress: progress,
    allSteps: allSteps,
    state: stepState,
    rate: stepRate,
    handleChange: handleChange,
    setState: setState,
    getState: getState,
    setRate: setRate,
    getRate: getRate,
    next: next,
    prev: prev,
    jump: jump
  };
  return react_1.default.createElement(StepsContext.Provider, {
    value: context
  }, (config === null || config === void 0 ? void 0 : config.before) && BeforeComponent(context), ((_b = config === null || config === void 0 ? void 0 : config.navigation) === null || _b === void 0 ? void 0 : _b.location) === "before" && NavigationComponent(context), react_1.default.Children.map(children, function (child, order) {
    return react_1.default.createElement(StepContext.Provider, {
      value: {
        order: order + 1
      }
    }, child);
  }), ((_c = config === null || config === void 0 ? void 0 : config.navigation) === null || _c === void 0 ? void 0 : _c.location) === "after" && NavigationComponent(context), (config === null || config === void 0 ? void 0 : config.after) && AfterComponent(context));
}

exports.Steps = Steps;
/**
 * Wrapper component for each individual step.
 */

function Step(props) {
  var order = react_1.useContext(StepContext).order;
  var title = props.title,
      Component = props.component,
      beforeStepChange = props.beforeStepChange;
  var stepsContextValue = react_1.useContext(StepsContext);
  var size = stepsContextValue.size,
      current = stepsContextValue.current;

  var isFirst = function isFirst() {
    return order === 1;
  };

  var isLast = function isLast() {
    return order === size;
  };

  var hasNext = function hasNext() {
    return order < size;
  };

  var hasPrev = function hasPrev() {
    return order > 1;
  };

  react_1.useEffect(function () {
    return function () {
      if (current === order && beforeStepChange) beforeStepChange();
    };
  }, [current, order, beforeStepChange]);

  if (order === current) {
    var newProps = Object.assign({}, props);
    delete newProps.component;
    var defaultTitle = "Step " + order;
    return react_1.default.createElement(Component, __assign({}, newProps, stepsContextValue, {
      title: title || defaultTitle,
      order: order,
      hasPrev: hasPrev,
      hasNext: hasNext,
      isFirst: isFirst,
      isLast: isLast
    }));
  }

  return null;
}

exports.Step = Step;