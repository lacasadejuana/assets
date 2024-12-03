// node_modules/alpinejs/dist/module.esm.js
var flushPending = false;
var flushing = false;
var queue = [];
var lastFlushedIndex = -1;
function scheduler(callback) {
  queueJob(callback);
}
function queueJob(job) {
  if (!queue.includes(job))
    queue.push(job);
  queueFlush();
}
function dequeueJob(job) {
  let index = queue.indexOf(job);
  if (index !== -1 && index > lastFlushedIndex)
    queue.splice(index, 1);
}
function queueFlush() {
  if (!flushing && !flushPending) {
    flushPending = true;
    queueMicrotask(flushJobs);
  }
}
function flushJobs() {
  flushPending = false;
  flushing = true;
  for (let i = 0; i < queue.length; i++) {
    queue[i]();
    lastFlushedIndex = i;
  }
  queue.length = 0;
  lastFlushedIndex = -1;
  flushing = false;
}
var reactive;
var effect;
var release;
var raw;
var shouldSchedule = true;
function disableEffectScheduling(callback) {
  shouldSchedule = false;
  callback();
  shouldSchedule = true;
}
function setReactivityEngine(engine) {
  reactive = engine.reactive;
  release = engine.release;
  effect = (callback) => engine.effect(callback, { scheduler: (task) => {
    if (shouldSchedule) {
      scheduler(task);
    } else {
      task();
    }
  } });
  raw = engine.raw;
}
function overrideEffect(override) {
  effect = override;
}
function elementBoundEffect(el) {
  let cleanup2 = () => {
  };
  let wrappedEffect = (callback) => {
    let effectReference = effect(callback);
    if (!el._x_effects) {
      el._x_effects = /* @__PURE__ */ new Set();
      el._x_runEffects = () => {
        el._x_effects.forEach((i) => i());
      };
    }
    el._x_effects.add(effectReference);
    cleanup2 = () => {
      if (effectReference === void 0)
        return;
      el._x_effects.delete(effectReference);
      release(effectReference);
    };
    return effectReference;
  };
  return [wrappedEffect, () => {
    cleanup2();
  }];
}
function watch(getter, callback) {
  let firstTime = true;
  let oldValue;
  let effectReference = effect(() => {
    let value = getter();
    JSON.stringify(value);
    if (!firstTime) {
      queueMicrotask(() => {
        callback(value, oldValue);
        oldValue = value;
      });
    } else {
      oldValue = value;
    }
    firstTime = false;
  });
  return () => release(effectReference);
}
var onAttributeAddeds = [];
var onElRemoveds = [];
var onElAddeds = [];
function onElAdded(callback) {
  onElAddeds.push(callback);
}
function onElRemoved(el, callback) {
  if (typeof callback === "function") {
    if (!el._x_cleanups)
      el._x_cleanups = [];
    el._x_cleanups.push(callback);
  } else {
    callback = el;
    onElRemoveds.push(callback);
  }
}
function onAttributesAdded(callback) {
  onAttributeAddeds.push(callback);
}
function onAttributeRemoved(el, name, callback) {
  if (!el._x_attributeCleanups)
    el._x_attributeCleanups = {};
  if (!el._x_attributeCleanups[name])
    el._x_attributeCleanups[name] = [];
  el._x_attributeCleanups[name].push(callback);
}
function cleanupAttributes(el, names) {
  if (!el._x_attributeCleanups)
    return;
  Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
    if (names === void 0 || names.includes(name)) {
      value.forEach((i) => i());
      delete el._x_attributeCleanups[name];
    }
  });
}
function cleanupElement(el) {
  if (el._x_cleanups) {
    while (el._x_cleanups.length)
      el._x_cleanups.pop()();
  }
}
var observer = new MutationObserver(onMutate);
var currentlyObserving = false;
function startObservingMutations() {
  observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
  currentlyObserving = true;
}
function stopObservingMutations() {
  flushObserver();
  observer.disconnect();
  currentlyObserving = false;
}
var queuedMutations = [];
function flushObserver() {
  let records = observer.takeRecords();
  queuedMutations.push(() => records.length > 0 && onMutate(records));
  let queueLengthWhenTriggered = queuedMutations.length;
  queueMicrotask(() => {
    if (queuedMutations.length === queueLengthWhenTriggered) {
      while (queuedMutations.length > 0)
        queuedMutations.shift()();
    }
  });
}
function mutateDom(callback) {
  if (!currentlyObserving)
    return callback();
  stopObservingMutations();
  let result = callback();
  startObservingMutations();
  return result;
}
var isCollecting = false;
var deferredMutations = [];
function deferMutations() {
  isCollecting = true;
}
function flushAndStopDeferringMutations() {
  isCollecting = false;
  onMutate(deferredMutations);
  deferredMutations = [];
}
function onMutate(mutations) {
  if (isCollecting) {
    deferredMutations = deferredMutations.concat(mutations);
    return;
  }
  let addedNodes = /* @__PURE__ */ new Set();
  let removedNodes = /* @__PURE__ */ new Set();
  let addedAttributes = /* @__PURE__ */ new Map();
  let removedAttributes = /* @__PURE__ */ new Map();
  for (let i = 0; i < mutations.length; i++) {
    if (mutations[i].target._x_ignoreMutationObserver)
      continue;
    if (mutations[i].type === "childList") {
      mutations[i].addedNodes.forEach((node) => node.nodeType === 1 && addedNodes.add(node));
      mutations[i].removedNodes.forEach((node) => node.nodeType === 1 && removedNodes.add(node));
    }
    if (mutations[i].type === "attributes") {
      let el = mutations[i].target;
      let name = mutations[i].attributeName;
      let oldValue = mutations[i].oldValue;
      let add2 = () => {
        if (!addedAttributes.has(el))
          addedAttributes.set(el, []);
        addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
      };
      let remove2 = () => {
        if (!removedAttributes.has(el))
          removedAttributes.set(el, []);
        removedAttributes.get(el).push(name);
      };
      if (el.hasAttribute(name) && oldValue === null) {
        add2();
      } else if (el.hasAttribute(name)) {
        remove2();
        add2();
      } else {
        remove2();
      }
    }
  }
  removedAttributes.forEach((attrs, el) => {
    cleanupAttributes(el, attrs);
  });
  addedAttributes.forEach((attrs, el) => {
    onAttributeAddeds.forEach((i) => i(el, attrs));
  });
  for (let node of removedNodes) {
    if (addedNodes.has(node))
      continue;
    onElRemoveds.forEach((i) => i(node));
  }
  addedNodes.forEach((node) => {
    node._x_ignoreSelf = true;
    node._x_ignore = true;
  });
  for (let node of addedNodes) {
    if (removedNodes.has(node))
      continue;
    if (!node.isConnected)
      continue;
    delete node._x_ignoreSelf;
    delete node._x_ignore;
    onElAddeds.forEach((i) => i(node));
    node._x_ignore = true;
    node._x_ignoreSelf = true;
  }
  addedNodes.forEach((node) => {
    delete node._x_ignoreSelf;
    delete node._x_ignore;
  });
  addedNodes = null;
  removedNodes = null;
  addedAttributes = null;
  removedAttributes = null;
}
function scope(node) {
  return mergeProxies(closestDataStack(node));
}
function addScopeToNode(node, data2, referenceNode) {
  node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
  return () => {
    node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
  };
}
function closestDataStack(node) {
  if (node._x_dataStack)
    return node._x_dataStack;
  if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
    return closestDataStack(node.host);
  }
  if (!node.parentNode) {
    return [];
  }
  return closestDataStack(node.parentNode);
}
function mergeProxies(objects) {
  return new Proxy({ objects }, mergeProxyTrap);
}
var mergeProxyTrap = {
  ownKeys({ objects }) {
    return Array.from(
      new Set(objects.flatMap((i) => Object.keys(i)))
    );
  },
  has({ objects }, name) {
    if (name == Symbol.unscopables)
      return false;
    return objects.some(
      (obj) => Object.prototype.hasOwnProperty.call(obj, name) || Reflect.has(obj, name)
    );
  },
  get({ objects }, name, thisProxy) {
    if (name == "toJSON")
      return collapseProxies;
    return Reflect.get(
      objects.find(
        (obj) => Reflect.has(obj, name)
      ) || {},
      name,
      thisProxy
    );
  },
  set({ objects }, name, value, thisProxy) {
    const target = objects.find(
      (obj) => Object.prototype.hasOwnProperty.call(obj, name)
    ) || objects[objects.length - 1];
    const descriptor = Object.getOwnPropertyDescriptor(target, name);
    if (descriptor?.set && descriptor?.get)
      return descriptor.set.call(thisProxy, value) || true;
    return Reflect.set(target, name, value);
  }
};
function collapseProxies() {
  let keys = Reflect.ownKeys(this);
  return keys.reduce((acc, key) => {
    acc[key] = Reflect.get(this, key);
    return acc;
  }, {});
}
function initInterceptors(data2) {
  let isObject2 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
  let recurse = (obj, basePath = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
      if (enumerable === false || value === void 0)
        return;
      if (typeof value === "object" && value !== null && value.__v_skip)
        return;
      let path = basePath === "" ? key : `${basePath}.${key}`;
      if (typeof value === "object" && value !== null && value._x_interceptor) {
        obj[key] = value.initialize(data2, path, key);
      } else {
        if (isObject2(value) && value !== obj && !(value instanceof Element)) {
          recurse(value, path);
        }
      }
    });
  };
  return recurse(data2);
}
function interceptor(callback, mutateObj = () => {
}) {
  let obj = {
    initialValue: void 0,
    _x_interceptor: true,
    initialize(data2, path, key) {
      return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
    }
  };
  mutateObj(obj);
  return (initialValue) => {
    if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
      let initialize = obj.initialize.bind(obj);
      obj.initialize = (data2, path, key) => {
        let innerValue = initialValue.initialize(data2, path, key);
        obj.initialValue = innerValue;
        return initialize(data2, path, key);
      };
    } else {
      obj.initialValue = initialValue;
    }
    return obj;
  };
}
function get(obj, path) {
  return path.split(".").reduce((carry, segment) => carry[segment], obj);
}
function set(obj, path, value) {
  if (typeof path === "string")
    path = path.split(".");
  if (path.length === 1)
    obj[path[0]] = value;
  else if (path.length === 0)
    throw error;
  else {
    if (obj[path[0]])
      return set(obj[path[0]], path.slice(1), value);
    else {
      obj[path[0]] = {};
      return set(obj[path[0]], path.slice(1), value);
    }
  }
}
var magics = {};
function magic(name, callback) {
  magics[name] = callback;
}
function injectMagics(obj, el) {
  Object.entries(magics).forEach(([name, callback]) => {
    let memoizedUtilities = null;
    function getUtilities() {
      if (memoizedUtilities) {
        return memoizedUtilities;
      } else {
        let [utilities, cleanup2] = getElementBoundUtilities(el);
        memoizedUtilities = { interceptor, ...utilities };
        onElRemoved(el, cleanup2);
        return memoizedUtilities;
      }
    }
    Object.defineProperty(obj, `$${name}`, {
      get() {
        return callback(el, getUtilities());
      },
      enumerable: false
    });
  });
  return obj;
}
function tryCatch(el, expression, callback, ...args) {
  try {
    return callback(...args);
  } catch (e) {
    handleError(e, el, expression);
  }
}
function handleError(error2, el, expression = void 0) {
  error2 = Object.assign(
    error2 ?? { message: "No error message given." },
    { el, expression }
  );
  console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
  setTimeout(() => {
    throw error2;
  }, 0);
}
var shouldAutoEvaluateFunctions = true;
function dontAutoEvaluateFunctions(callback) {
  let cache = shouldAutoEvaluateFunctions;
  shouldAutoEvaluateFunctions = false;
  let result = callback();
  shouldAutoEvaluateFunctions = cache;
  return result;
}
function evaluate(el, expression, extras = {}) {
  let result;
  evaluateLater(el, expression)((value) => result = value, extras);
  return result;
}
function evaluateLater(...args) {
  return theEvaluatorFunction(...args);
}
var theEvaluatorFunction = normalEvaluator;
function setEvaluator(newEvaluator) {
  theEvaluatorFunction = newEvaluator;
}
function normalEvaluator(el, expression) {
  let overriddenMagics = {};
  injectMagics(overriddenMagics, el);
  let dataStack = [overriddenMagics, ...closestDataStack(el)];
  let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
  return tryCatch.bind(null, el, expression, evaluator);
}
function generateEvaluatorFromFunction(dataStack, func) {
  return (receiver = () => {
  }, { scope: scope2 = {}, params = [] } = {}) => {
    let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
    runIfTypeOfFunction(receiver, result);
  };
}
var evaluatorMemo = {};
function generateFunctionFromString(expression, el) {
  if (evaluatorMemo[expression]) {
    return evaluatorMemo[expression];
  }
  let AsyncFunction = Object.getPrototypeOf(async function() {
  }).constructor;
  let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression.trim()) || /^(let|const)\s/.test(expression.trim()) ? `(async()=>{ ${expression} })()` : expression;
  const safeAsyncFunction = () => {
    try {
      let func2 = new AsyncFunction(
        ["__self", "scope"],
        `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`
      );
      Object.defineProperty(func2, "name", {
        value: `[Alpine] ${expression}`
      });
      return func2;
    } catch (error2) {
      handleError(error2, el, expression);
      return Promise.resolve();
    }
  };
  let func = safeAsyncFunction();
  evaluatorMemo[expression] = func;
  return func;
}
function generateEvaluatorFromString(dataStack, expression, el) {
  let func = generateFunctionFromString(expression, el);
  return (receiver = () => {
  }, { scope: scope2 = {}, params = [] } = {}) => {
    func.result = void 0;
    func.finished = false;
    let completeScope = mergeProxies([scope2, ...dataStack]);
    if (typeof func === "function") {
      let promise = func(func, completeScope).catch((error2) => handleError(error2, el, expression));
      if (func.finished) {
        runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
        func.result = void 0;
      } else {
        promise.then((result) => {
          runIfTypeOfFunction(receiver, result, completeScope, params, el);
        }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = void 0);
      }
    }
  };
}
function runIfTypeOfFunction(receiver, value, scope2, params, el) {
  if (shouldAutoEvaluateFunctions && typeof value === "function") {
    let result = value.apply(scope2, params);
    if (result instanceof Promise) {
      result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2) => handleError(error2, el, value));
    } else {
      receiver(result);
    }
  } else if (typeof value === "object" && value instanceof Promise) {
    value.then((i) => receiver(i));
  } else {
    receiver(value);
  }
}
var prefixAsString = "x-";
function prefix(subject = "") {
  return prefixAsString + subject;
}
function setPrefix(newPrefix) {
  prefixAsString = newPrefix;
}
var directiveHandlers = {};
function directive(name, callback) {
  directiveHandlers[name] = callback;
  return {
    before(directive2) {
      if (!directiveHandlers[directive2]) {
        console.warn(String.raw`Cannot find directive \`${directive2}\`. \`${name}\` will use the default order of execution`);
        return;
      }
      const pos = directiveOrder.indexOf(directive2);
      directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
    }
  };
}
function directiveExists(name) {
  return Object.keys(directiveHandlers).includes(name);
}
function directives(el, attributes, originalAttributeOverride) {
  attributes = Array.from(attributes);
  if (el._x_virtualDirectives) {
    let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(vAttributes);
    vAttributes = vAttributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    attributes = attributes.concat(vAttributes);
  }
  let transformedAttributeMap = {};
  let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
  return directives2.map((directive2) => {
    return getDirectiveHandler(el, directive2);
  });
}
function attributesOnly(attributes) {
  return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
}
var isDeferringHandlers = false;
var directiveHandlerStacks = /* @__PURE__ */ new Map();
var currentHandlerStackKey = Symbol();
function deferHandlingDirectives(callback) {
  isDeferringHandlers = true;
  let key = Symbol();
  currentHandlerStackKey = key;
  directiveHandlerStacks.set(key, []);
  let flushHandlers = () => {
    while (directiveHandlerStacks.get(key).length)
      directiveHandlerStacks.get(key).shift()();
    directiveHandlerStacks.delete(key);
  };
  let stopDeferring = () => {
    isDeferringHandlers = false;
    flushHandlers();
  };
  callback(flushHandlers);
  stopDeferring();
}
function getElementBoundUtilities(el) {
  let cleanups = [];
  let cleanup2 = (callback) => cleanups.push(callback);
  let [effect3, cleanupEffect] = elementBoundEffect(el);
  cleanups.push(cleanupEffect);
  let utilities = {
    Alpine: alpine_default,
    effect: effect3,
    cleanup: cleanup2,
    evaluateLater: evaluateLater.bind(evaluateLater, el),
    evaluate: evaluate.bind(evaluate, el)
  };
  let doCleanup = () => cleanups.forEach((i) => i());
  return [utilities, doCleanup];
}
function getDirectiveHandler(el, directive2) {
  let noop = () => {
  };
  let handler4 = directiveHandlers[directive2.type] || noop;
  let [utilities, cleanup2] = getElementBoundUtilities(el);
  onAttributeRemoved(el, directive2.original, cleanup2);
  let fullHandler = () => {
    if (el._x_ignore || el._x_ignoreSelf)
      return;
    handler4.inline && handler4.inline(el, directive2, utilities);
    handler4 = handler4.bind(handler4, el, directive2, utilities);
    isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler4) : handler4();
  };
  fullHandler.runCleanups = cleanup2;
  return fullHandler;
}
var startingWith = (subject, replacement) => ({ name, value }) => {
  if (name.startsWith(subject))
    name = name.replace(subject, replacement);
  return { name, value };
};
var into = (i) => i;
function toTransformedAttributes(callback = () => {
}) {
  return ({ name, value }) => {
    let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
      return transform(carry);
    }, { name, value });
    if (newName !== name)
      callback(newName, name);
    return { name: newName, value: newValue };
  };
}
var attributeTransformers = [];
function mapAttributes(callback) {
  attributeTransformers.push(callback);
}
function outNonAlpineAttributes({ name }) {
  return alpineAttributeRegex().test(name);
}
var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
  return ({ name, value }) => {
    let typeMatch = name.match(alpineAttributeRegex());
    let valueMatch = name.match(/:([a-zA-Z0-9\-_:]+)/);
    let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
    let original = originalAttributeOverride || transformedAttributeMap[name] || name;
    return {
      type: typeMatch ? typeMatch[1] : null,
      value: valueMatch ? valueMatch[1] : null,
      modifiers: modifiers.map((i) => i.replace(".", "")),
      expression: value,
      original
    };
  };
}
var DEFAULT = "DEFAULT";
var directiveOrder = [
  "ignore",
  "ref",
  "data",
  "id",
  "anchor",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  DEFAULT,
  "teleport"
];
function byPriority(a, b) {
  let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
  let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
  return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
}
function dispatch(el, name, detail = {}) {
  el.dispatchEvent(
    new CustomEvent(name, {
      detail,
      bubbles: true,
      // Allows events to pass the shadow DOM barrier.
      composed: true,
      cancelable: true
    })
  );
}
function walk(el, callback) {
  if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
    Array.from(el.children).forEach((el2) => walk(el2, callback));
    return;
  }
  let skip = false;
  callback(el, () => skip = true);
  if (skip)
    return;
  let node = el.firstElementChild;
  while (node) {
    walk(node, callback, false);
    node = node.nextElementSibling;
  }
}
function warn(message, ...args) {
  console.warn(`Alpine Warning: ${message}`, ...args);
}
var started = false;
function start() {
  if (started)
    warn("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems.");
  started = true;
  if (!document.body)
    warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
  dispatch(document, "alpine:init");
  dispatch(document, "alpine:initializing");
  startObservingMutations();
  onElAdded((el) => initTree(el, walk));
  onElRemoved((el) => destroyTree(el));
  onAttributesAdded((el, attrs) => {
    directives(el, attrs).forEach((handle2) => handle2());
  });
  let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
  Array.from(document.querySelectorAll(allSelectors().join(","))).filter(outNestedComponents).forEach((el) => {
    initTree(el);
  });
  dispatch(document, "alpine:initialized");
  setTimeout(() => {
    warnAboutMissingPlugins();
  });
}
var rootSelectorCallbacks = [];
var initSelectorCallbacks = [];
function rootSelectors() {
  return rootSelectorCallbacks.map((fn) => fn());
}
function allSelectors() {
  return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
}
function addRootSelector(selectorCallback) {
  rootSelectorCallbacks.push(selectorCallback);
}
function addInitSelector(selectorCallback) {
  initSelectorCallbacks.push(selectorCallback);
}
function closestRoot(el, includeInitSelectors = false) {
  return findClosest(el, (element) => {
    const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
    if (selectors.some((selector) => element.matches(selector)))
      return true;
  });
}
function findClosest(el, callback) {
  if (!el)
    return;
  if (callback(el))
    return el;
  if (el._x_teleportBack)
    el = el._x_teleportBack;
  if (!el.parentElement)
    return;
  return findClosest(el.parentElement, callback);
}
function isRoot(el) {
  return rootSelectors().some((selector) => el.matches(selector));
}
var initInterceptors2 = [];
function interceptInit(callback) {
  initInterceptors2.push(callback);
}
function initTree(el, walker = walk, intercept = () => {
}) {
  deferHandlingDirectives(() => {
    walker(el, (el2, skip) => {
      intercept(el2, skip);
      initInterceptors2.forEach((i) => i(el2, skip));
      directives(el2, el2.attributes).forEach((handle2) => handle2());
      el2._x_ignore && skip();
    });
  });
}
function destroyTree(root, walker = walk) {
  walker(root, (el) => {
    cleanupAttributes(el);
    cleanupElement(el);
  });
}
function warnAboutMissingPlugins() {
  let pluginDirectives = [
    ["ui", "dialog", ["[x-dialog], [x-popover]"]],
    ["anchor", "anchor", ["[x-anchor]"]],
    ["sort", "sort", ["[x-sort]"]]
  ];
  pluginDirectives.forEach(([plugin2, directive2, selectors]) => {
    if (directiveExists(directive2))
      return;
    selectors.some((selector) => {
      if (document.querySelector(selector)) {
        warn(`found "${selector}", but missing ${plugin2} plugin`);
        return true;
      }
    });
  });
}
var tickStack = [];
var isHolding = false;
function nextTick(callback = () => {
}) {
  queueMicrotask(() => {
    isHolding || setTimeout(() => {
      releaseNextTicks();
    });
  });
  return new Promise((res) => {
    tickStack.push(() => {
      callback();
      res();
    });
  });
}
function releaseNextTicks() {
  isHolding = false;
  while (tickStack.length)
    tickStack.shift()();
}
function holdNextTicks() {
  isHolding = true;
}
function setClasses(el, value) {
  if (Array.isArray(value)) {
    return setClassesFromString(el, value.join(" "));
  } else if (typeof value === "object" && value !== null) {
    return setClassesFromObject(el, value);
  } else if (typeof value === "function") {
    return setClasses(el, value());
  }
  return setClassesFromString(el, value);
}
function setClassesFromString(el, classString) {
  let split = (classString2) => classString2.split(" ").filter(Boolean);
  let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
  let addClassesAndReturnUndo = (classes) => {
    el.classList.add(...classes);
    return () => {
      el.classList.remove(...classes);
    };
  };
  classString = classString === true ? classString = "" : classString || "";
  return addClassesAndReturnUndo(missingClasses(classString));
}
function setClassesFromObject(el, classObject) {
  let split = (classString) => classString.split(" ").filter(Boolean);
  let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
  let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
  let added = [];
  let removed = [];
  forRemove.forEach((i) => {
    if (el.classList.contains(i)) {
      el.classList.remove(i);
      removed.push(i);
    }
  });
  forAdd.forEach((i) => {
    if (!el.classList.contains(i)) {
      el.classList.add(i);
      added.push(i);
    }
  });
  return () => {
    removed.forEach((i) => el.classList.add(i));
    added.forEach((i) => el.classList.remove(i));
  };
}
function setStyles(el, value) {
  if (typeof value === "object" && value !== null) {
    return setStylesFromObject(el, value);
  }
  return setStylesFromString(el, value);
}
function setStylesFromObject(el, value) {
  let previousStyles = {};
  Object.entries(value).forEach(([key, value2]) => {
    previousStyles[key] = el.style[key];
    if (!key.startsWith("--")) {
      key = kebabCase(key);
    }
    el.style.setProperty(key, value2);
  });
  setTimeout(() => {
    if (el.style.length === 0) {
      el.removeAttribute("style");
    }
  });
  return () => {
    setStyles(el, previousStyles);
  };
}
function setStylesFromString(el, value) {
  let cache = el.getAttribute("style", value);
  el.setAttribute("style", value);
  return () => {
    el.setAttribute("style", cache || "");
  };
}
function kebabCase(subject) {
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function once(callback, fallback = () => {
}) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      callback.apply(this, arguments);
    } else {
      fallback.apply(this, arguments);
    }
  };
}
directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
  if (typeof expression === "function")
    expression = evaluate2(expression);
  if (expression === false)
    return;
  if (!expression || typeof expression === "boolean") {
    registerTransitionsFromHelper(el, modifiers, value);
  } else {
    registerTransitionsFromClassString(el, expression, value);
  }
});
function registerTransitionsFromClassString(el, classString, stage) {
  registerTransitionObject(el, setClasses, "");
  let directiveStorageMap = {
    "enter": (classes) => {
      el._x_transition.enter.during = classes;
    },
    "enter-start": (classes) => {
      el._x_transition.enter.start = classes;
    },
    "enter-end": (classes) => {
      el._x_transition.enter.end = classes;
    },
    "leave": (classes) => {
      el._x_transition.leave.during = classes;
    },
    "leave-start": (classes) => {
      el._x_transition.leave.start = classes;
    },
    "leave-end": (classes) => {
      el._x_transition.leave.end = classes;
    }
  };
  directiveStorageMap[stage](classString);
}
function registerTransitionsFromHelper(el, modifiers, stage) {
  registerTransitionObject(el, setStyles);
  let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
  let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
  let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
  if (modifiers.includes("in") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
  }
  if (modifiers.includes("out") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
  }
  let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
  let wantsOpacity = wantsAll || modifiers.includes("opacity");
  let wantsScale = wantsAll || modifiers.includes("scale");
  let opacityValue = wantsOpacity ? 0 : 1;
  let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
  let delay2 = modifierValue(modifiers, "delay", 0) / 1e3;
  let origin = modifierValue(modifiers, "origin", "center");
  let property = "opacity, transform";
  let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
  let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
  let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
  if (transitioningIn) {
    el._x_transition.enter.during = {
      transformOrigin: origin,
      transitionDelay: `${delay2}s`,
      transitionProperty: property,
      transitionDuration: `${durationIn}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.enter.start = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
    el._x_transition.enter.end = {
      opacity: 1,
      transform: `scale(1)`
    };
  }
  if (transitioningOut) {
    el._x_transition.leave.during = {
      transformOrigin: origin,
      transitionDelay: `${delay2}s`,
      transitionProperty: property,
      transitionDuration: `${durationOut}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.leave.start = {
      opacity: 1,
      transform: `scale(1)`
    };
    el._x_transition.leave.end = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
  }
}
function registerTransitionObject(el, setFunction, defaultValue = {}) {
  if (!el._x_transition)
    el._x_transition = {
      enter: { during: defaultValue, start: defaultValue, end: defaultValue },
      leave: { during: defaultValue, start: defaultValue, end: defaultValue },
      in(before = () => {
      }, after = () => {
      }) {
        transition(el, setFunction, {
          during: this.enter.during,
          start: this.enter.start,
          end: this.enter.end
        }, before, after);
      },
      out(before = () => {
      }, after = () => {
      }) {
        transition(el, setFunction, {
          during: this.leave.during,
          start: this.leave.start,
          end: this.leave.end
        }, before, after);
      }
    };
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
  const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let clickAwayCompatibleShow = () => nextTick2(show);
  if (value) {
    if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
      el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
    } else {
      el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
    }
    return;
  }
  el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
    el._x_transition.out(() => {
    }, () => resolve(hide));
    el._x_transitioning && el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
  }) : Promise.resolve(hide);
  queueMicrotask(() => {
    let closest = closestHide(el);
    if (closest) {
      if (!closest._x_hideChildren)
        closest._x_hideChildren = [];
      closest._x_hideChildren.push(el);
    } else {
      nextTick2(() => {
        let hideAfterChildren = (el2) => {
          let carry = Promise.all([
            el2._x_hidePromise,
            ...(el2._x_hideChildren || []).map(hideAfterChildren)
          ]).then(([i]) => i?.());
          delete el2._x_hidePromise;
          delete el2._x_hideChildren;
          return carry;
        };
        hideAfterChildren(el).catch((e) => {
          if (!e.isFromCancelledTransition)
            throw e;
        });
      });
    }
  });
};
function closestHide(el) {
  let parent = el.parentNode;
  if (!parent)
    return;
  return parent._x_hidePromise ? parent : closestHide(parent);
}
function transition(el, setFunction, { during, start: start2, end } = {}, before = () => {
}, after = () => {
}) {
  if (el._x_transitioning)
    el._x_transitioning.cancel();
  if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
    before();
    after();
    return;
  }
  let undoStart, undoDuring, undoEnd;
  performTransition(el, {
    start() {
      undoStart = setFunction(el, start2);
    },
    during() {
      undoDuring = setFunction(el, during);
    },
    before,
    end() {
      undoStart();
      undoEnd = setFunction(el, end);
    },
    after,
    cleanup() {
      undoDuring();
      undoEnd();
    }
  });
}
function performTransition(el, stages) {
  let interrupted, reachedBefore, reachedEnd;
  let finish = once(() => {
    mutateDom(() => {
      interrupted = true;
      if (!reachedBefore)
        stages.before();
      if (!reachedEnd) {
        stages.end();
        releaseNextTicks();
      }
      stages.after();
      if (el.isConnected)
        stages.cleanup();
      delete el._x_transitioning;
    });
  });
  el._x_transitioning = {
    beforeCancels: [],
    beforeCancel(callback) {
      this.beforeCancels.push(callback);
    },
    cancel: once(function() {
      while (this.beforeCancels.length) {
        this.beforeCancels.shift()();
      }
      ;
      finish();
    }),
    finish
  };
  mutateDom(() => {
    stages.start();
    stages.during();
  });
  holdNextTicks();
  requestAnimationFrame(() => {
    if (interrupted)
      return;
    let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
    let delay2 = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    if (duration === 0)
      duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
    mutateDom(() => {
      stages.before();
    });
    reachedBefore = true;
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      mutateDom(() => {
        stages.end();
      });
      releaseNextTicks();
      setTimeout(el._x_transitioning.finish, duration + delay2);
      reachedEnd = true;
    });
  });
}
function modifierValue(modifiers, key, fallback) {
  if (modifiers.indexOf(key) === -1)
    return fallback;
  const rawValue = modifiers[modifiers.indexOf(key) + 1];
  if (!rawValue)
    return fallback;
  if (key === "scale") {
    if (isNaN(rawValue))
      return fallback;
  }
  if (key === "duration" || key === "delay") {
    let match = rawValue.match(/([0-9]+)ms/);
    if (match)
      return match[1];
  }
  if (key === "origin") {
    if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
      return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
    }
  }
  return rawValue;
}
var isCloning = false;
function skipDuringClone(callback, fallback = () => {
}) {
  return (...args) => isCloning ? fallback(...args) : callback(...args);
}
function onlyDuringClone(callback) {
  return (...args) => isCloning && callback(...args);
}
var interceptors = [];
function interceptClone(callback) {
  interceptors.push(callback);
}
function cloneNode(from, to) {
  interceptors.forEach((i) => i(from, to));
  isCloning = true;
  dontRegisterReactiveSideEffects(() => {
    initTree(to, (el, callback) => {
      callback(el, () => {
      });
    });
  });
  isCloning = false;
}
var isCloningLegacy = false;
function clone(oldEl, newEl) {
  if (!newEl._x_dataStack)
    newEl._x_dataStack = oldEl._x_dataStack;
  isCloning = true;
  isCloningLegacy = true;
  dontRegisterReactiveSideEffects(() => {
    cloneTree(newEl);
  });
  isCloning = false;
  isCloningLegacy = false;
}
function cloneTree(el) {
  let hasRunThroughFirstEl = false;
  let shallowWalker = (el2, callback) => {
    walk(el2, (el3, skip) => {
      if (hasRunThroughFirstEl && isRoot(el3))
        return skip();
      hasRunThroughFirstEl = true;
      callback(el3, skip);
    });
  };
  initTree(el, shallowWalker);
}
function dontRegisterReactiveSideEffects(callback) {
  let cache = effect;
  overrideEffect((callback2, el) => {
    let storedEffect = cache(callback2);
    release(storedEffect);
    return () => {
    };
  });
  callback();
  overrideEffect(cache);
}
function bind(el, name, value, modifiers = []) {
  if (!el._x_bindings)
    el._x_bindings = reactive({});
  el._x_bindings[name] = value;
  name = modifiers.includes("camel") ? camelCase(name) : name;
  switch (name) {
    case "value":
      bindInputValue(el, value);
      break;
    case "style":
      bindStyles(el, value);
      break;
    case "class":
      bindClasses(el, value);
      break;
    case "selected":
    case "checked":
      bindAttributeAndProperty(el, name, value);
      break;
    default:
      bindAttribute(el, name, value);
      break;
  }
}
function bindInputValue(el, value) {
  if (el.type === "radio") {
    if (el.attributes.value === void 0) {
      el.value = value;
    }
    if (window.fromModel) {
      if (typeof value === "boolean") {
        el.checked = safeParseBoolean(el.value) === value;
      } else {
        el.checked = checkedAttrLooseCompare(el.value, value);
      }
    }
  } else if (el.type === "checkbox") {
    if (Number.isInteger(value)) {
      el.value = value;
    } else if (!Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
      el.value = String(value);
    } else {
      if (Array.isArray(value)) {
        el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
      } else {
        el.checked = !!value;
      }
    }
  } else if (el.tagName === "SELECT") {
    updateSelect(el, value);
  } else {
    if (el.value === value)
      return;
    el.value = value === void 0 ? "" : value;
  }
}
function bindClasses(el, value) {
  if (el._x_undoAddedClasses)
    el._x_undoAddedClasses();
  el._x_undoAddedClasses = setClasses(el, value);
}
function bindStyles(el, value) {
  if (el._x_undoAddedStyles)
    el._x_undoAddedStyles();
  el._x_undoAddedStyles = setStyles(el, value);
}
function bindAttributeAndProperty(el, name, value) {
  bindAttribute(el, name, value);
  setPropertyIfChanged(el, name, value);
}
function bindAttribute(el, name, value) {
  if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
    el.removeAttribute(name);
  } else {
    if (isBooleanAttr(name))
      value = name;
    setIfChanged(el, name, value);
  }
}
function setIfChanged(el, attrName, value) {
  if (el.getAttribute(attrName) != value) {
    el.setAttribute(attrName, value);
  }
}
function setPropertyIfChanged(el, propName, value) {
  if (el[propName] !== value) {
    el[propName] = value;
  }
}
function updateSelect(el, value) {
  const arrayWrappedValue = [].concat(value).map((value2) => {
    return value2 + "";
  });
  Array.from(el.options).forEach((option) => {
    option.selected = arrayWrappedValue.includes(option.value);
  });
}
function camelCase(subject) {
  return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
}
function checkedAttrLooseCompare(valueA, valueB) {
  return valueA == valueB;
}
function safeParseBoolean(rawValue) {
  if ([1, "1", "true", "on", "yes", true].includes(rawValue)) {
    return true;
  }
  if ([0, "0", "false", "off", "no", false].includes(rawValue)) {
    return false;
  }
  return rawValue ? Boolean(rawValue) : null;
}
function isBooleanAttr(attrName) {
  const booleanAttributes = [
    "disabled",
    "checked",
    "required",
    "readonly",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule"
  ];
  return booleanAttributes.includes(attrName);
}
function attributeShouldntBePreservedIfFalsy(name) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
}
function getBinding(el, name, fallback) {
  if (el._x_bindings && el._x_bindings[name] !== void 0)
    return el._x_bindings[name];
  return getAttributeBinding(el, name, fallback);
}
function extractProp(el, name, fallback, extract = true) {
  if (el._x_bindings && el._x_bindings[name] !== void 0)
    return el._x_bindings[name];
  if (el._x_inlineBindings && el._x_inlineBindings[name] !== void 0) {
    let binding = el._x_inlineBindings[name];
    binding.extract = extract;
    return dontAutoEvaluateFunctions(() => {
      return evaluate(el, binding.expression);
    });
  }
  return getAttributeBinding(el, name, fallback);
}
function getAttributeBinding(el, name, fallback) {
  let attr = el.getAttribute(name);
  if (attr === null)
    return typeof fallback === "function" ? fallback() : fallback;
  if (attr === "")
    return true;
  if (isBooleanAttr(name)) {
    return !![name, "true"].includes(attr);
  }
  return attr;
}
function debounce(func, wait) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function throttle(func, limit) {
  let inThrottle;
  return function() {
    let context = this, args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
function entangle({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
  let firstRun = true;
  let outerHash;
  let innerHash;
  let reference = effect(() => {
    let outer = outerGet();
    let inner = innerGet();
    if (firstRun) {
      innerSet(cloneIfObject(outer));
      firstRun = false;
    } else {
      let outerHashLatest = JSON.stringify(outer);
      let innerHashLatest = JSON.stringify(inner);
      if (outerHashLatest !== outerHash) {
        innerSet(cloneIfObject(outer));
      } else if (outerHashLatest !== innerHashLatest) {
        outerSet(cloneIfObject(inner));
      } else {
      }
    }
    outerHash = JSON.stringify(outerGet());
    innerHash = JSON.stringify(innerGet());
  });
  return () => {
    release(reference);
  };
}
function cloneIfObject(value) {
  return typeof value === "object" ? JSON.parse(JSON.stringify(value)) : value;
}
function plugin(callback) {
  let callbacks = Array.isArray(callback) ? callback : [callback];
  callbacks.forEach((i) => i(alpine_default));
}
var stores = {};
var isReactive = false;
function store(name, value) {
  if (!isReactive) {
    stores = reactive(stores);
    isReactive = true;
  }
  if (value === void 0) {
    return stores[name];
  }
  stores[name] = value;
  if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
    stores[name].init();
  }
  initInterceptors(stores[name]);
}
function getStores() {
  return stores;
}
var binds = {};
function bind2(name, bindings) {
  let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
  if (name instanceof Element) {
    return applyBindingsObject(name, getBindings());
  } else {
    binds[name] = getBindings;
  }
  return () => {
  };
}
function injectBindingProviders(obj) {
  Object.entries(binds).forEach(([name, callback]) => {
    Object.defineProperty(obj, name, {
      get() {
        return (...args) => {
          return callback(...args);
        };
      }
    });
  });
  return obj;
}
function applyBindingsObject(el, obj, original) {
  let cleanupRunners = [];
  while (cleanupRunners.length)
    cleanupRunners.pop()();
  let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
  let staticAttributes = attributesOnly(attributes);
  attributes = attributes.map((attribute) => {
    if (staticAttributes.find((attr) => attr.name === attribute.name)) {
      return {
        name: `x-bind:${attribute.name}`,
        value: `"${attribute.value}"`
      };
    }
    return attribute;
  });
  directives(el, attributes, original).map((handle2) => {
    cleanupRunners.push(handle2.runCleanups);
    handle2();
  });
  return () => {
    while (cleanupRunners.length)
      cleanupRunners.pop()();
  };
}
var datas = {};
function data(name, callback) {
  datas[name] = callback;
}
function injectDataProviders(obj, context) {
  Object.entries(datas).forEach(([name, callback]) => {
    Object.defineProperty(obj, name, {
      get() {
        return (...args) => {
          return callback.bind(context)(...args);
        };
      },
      enumerable: false
    });
  });
  return obj;
}
var Alpine = {
  get reactive() {
    return reactive;
  },
  get release() {
    return release;
  },
  get effect() {
    return effect;
  },
  get raw() {
    return raw;
  },
  version: "3.14.1",
  flushAndStopDeferringMutations,
  dontAutoEvaluateFunctions,
  disableEffectScheduling,
  startObservingMutations,
  stopObservingMutations,
  setReactivityEngine,
  onAttributeRemoved,
  onAttributesAdded,
  closestDataStack,
  skipDuringClone,
  onlyDuringClone,
  addRootSelector,
  addInitSelector,
  interceptClone,
  addScopeToNode,
  deferMutations,
  mapAttributes,
  evaluateLater,
  interceptInit,
  setEvaluator,
  mergeProxies,
  extractProp,
  findClosest,
  onElRemoved,
  closestRoot,
  destroyTree,
  interceptor,
  // INTERNAL: not public API and is subject to change without major release.
  transition,
  // INTERNAL
  setStyles,
  // INTERNAL
  mutateDom,
  directive,
  entangle,
  throttle,
  debounce,
  evaluate,
  initTree,
  nextTick,
  prefixed: prefix,
  prefix: setPrefix,
  plugin,
  magic,
  store,
  start,
  clone,
  // INTERNAL
  cloneNode,
  // INTERNAL
  bound: getBinding,
  $data: scope,
  watch,
  walk,
  data,
  bind: bind2
};
var alpine_default = Alpine;
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
var EMPTY_OBJ = true ? Object.freeze({}) : {};
var EMPTY_ARR = true ? Object.freeze([]) : [];
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
var targetMap = /* @__PURE__ */ new WeakMap();
var effectStack = [];
var activeEffect;
var ITERATE_KEY = Symbol(true ? "iterate" : "");
var MAP_KEY_ITERATE_KEY = Symbol(true ? "Map key iterate" : "");
function isEffect(fn) {
  return fn && fn._isEffect === true;
}
function effect2(fn, options = EMPTY_OBJ) {
  if (isEffect(fn)) {
    fn = fn.raw;
  }
  const effect3 = createReactiveEffect(fn, options);
  if (!options.lazy) {
    effect3();
  }
  return effect3;
}
function stop(effect3) {
  if (effect3.active) {
    cleanup(effect3);
    if (effect3.options.onStop) {
      effect3.options.onStop();
    }
    effect3.active = false;
  }
}
var uid = 0;
function createReactiveEffect(fn, options) {
  const effect3 = function reactiveEffect() {
    if (!effect3.active) {
      return fn();
    }
    if (!effectStack.includes(effect3)) {
      cleanup(effect3);
      try {
        enableTracking();
        effectStack.push(effect3);
        activeEffect = effect3;
        return fn();
      } finally {
        effectStack.pop();
        resetTracking();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  effect3.id = uid++;
  effect3.allowRecurse = !!options.allowRecurse;
  effect3._isEffect = true;
  effect3.active = true;
  effect3.raw = fn;
  effect3.deps = [];
  effect3.options = options;
  return effect3;
}
function cleanup(effect3) {
  const { deps } = effect3;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect3);
    }
    deps.length = 0;
  }
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (!shouldTrack || activeEffect === void 0) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = /* @__PURE__ */ new Set());
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target,
        type,
        key
      });
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const effects = /* @__PURE__ */ new Set();
  const add2 = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach((effect3) => {
        if (effect3 !== activeEffect || effect3.allowRecurse) {
          effects.add(effect3);
        }
      });
    }
  };
  if (type === "clear") {
    depsMap.forEach(add2);
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        add2(dep);
      }
    });
  } else {
    if (key !== void 0) {
      add2(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          add2(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          add2(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const run = (effect3) => {
    if (effect3.options.onTrigger) {
      effect3.options.onTrigger({
        effect: effect3,
        target,
        key,
        type,
        newValue,
        oldValue,
        oldTarget
      });
    }
    if (effect3.options.scheduler) {
      effect3.options.scheduler(effect3);
    } else {
      effect3();
    }
  };
  effects.forEach(run);
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
var get2 = /* @__PURE__ */ createGetter();
var readonlyGet = /* @__PURE__ */ createGetter(true);
var arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly = false, shallow = false) {
  return function get32(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive2(res);
    }
    return res;
  };
}
var set2 = /* @__PURE__ */ createSetter();
function createSetter(shallow = false) {
  return function set3(target, key, value, receiver) {
    let oldValue = target[key];
    if (!shallow) {
      value = toRaw(value);
      oldValue = toRaw(oldValue);
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
var mutableHandlers = {
  get: get2,
  set: set2,
  deleteProperty,
  has,
  ownKeys
};
var readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    if (true) {
      console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    if (true) {
      console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
var toReactive = (value) => isObject(value) ? reactive2(value) : value;
var toReadonly = (value) => isObject(value) ? readonly(value) : value;
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly = false, isShallow = false) {
  target = target[
    "__v_raw"
    /* RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "get", key);
  }
  !isReadonly && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly = false) {
  const target = this[
    "__v_raw"
    /* RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "has", key);
  }
  !isReadonly && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
  target = target[
    "__v_raw"
    /* RAW */
  ];
  !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get32 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get32.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get32 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get32 ? get32.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly, isShallow) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (true) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
var [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
var mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
var readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive2(target) {
  if (target && target[
    "__v_isReadonly"
    /* IS_READONLY */
  ]) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (true) {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* RAW */
  ] && !(isReadonly && target[
    "__v_isReactive"
    /* IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function toRaw(observed) {
  return observed && toRaw(observed[
    "__v_raw"
    /* RAW */
  ]) || observed;
}
function isRef(r) {
  return Boolean(r && r.__v_isRef === true);
}
magic("nextTick", () => nextTick);
magic("dispatch", (el) => dispatch.bind(dispatch, el));
magic("watch", (el, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => (key, callback) => {
  let evaluate2 = evaluateLater2(key);
  let getter = () => {
    let value;
    evaluate2((i) => value = i);
    return value;
  };
  let unwatch = watch(getter, callback);
  cleanup2(unwatch);
});
magic("store", getStores);
magic("data", (el) => scope(el));
magic("root", (el) => closestRoot(el));
magic("refs", (el) => {
  if (el._x_refs_proxy)
    return el._x_refs_proxy;
  el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
  return el._x_refs_proxy;
});
function getArrayOfRefObject(el) {
  let refObjects = [];
  findClosest(el, (i) => {
    if (i._x_refs)
      refObjects.push(i._x_refs);
  });
  return refObjects;
}
var globalIdMemo = {};
function findAndIncrementId(name) {
  if (!globalIdMemo[name])
    globalIdMemo[name] = 0;
  return ++globalIdMemo[name];
}
function closestIdRoot(el, name) {
  return findClosest(el, (element) => {
    if (element._x_ids && element._x_ids[name])
      return true;
  });
}
function setIdRoot(el, name) {
  if (!el._x_ids)
    el._x_ids = {};
  if (!el._x_ids[name])
    el._x_ids[name] = findAndIncrementId(name);
}
magic("id", (el, { cleanup: cleanup2 }) => (name, key = null) => {
  let cacheKey = `${name}${key ? `-${key}` : ""}`;
  return cacheIdByNameOnElement(el, cacheKey, cleanup2, () => {
    let root = closestIdRoot(el, name);
    let id = root ? root._x_ids[name] : findAndIncrementId(name);
    return key ? `${name}-${id}-${key}` : `${name}-${id}`;
  });
});
interceptClone((from, to) => {
  if (from._x_id) {
    to._x_id = from._x_id;
  }
});
function cacheIdByNameOnElement(el, cacheKey, cleanup2, callback) {
  if (!el._x_id)
    el._x_id = {};
  if (el._x_id[cacheKey])
    return el._x_id[cacheKey];
  let output = callback();
  el._x_id[cacheKey] = output;
  cleanup2(() => {
    delete el._x_id[cacheKey];
  });
  return output;
}
magic("el", (el) => el);
warnMissingPluginMagic("Focus", "focus", "focus");
warnMissingPluginMagic("Persist", "persist", "persist");
function warnMissingPluginMagic(name, magicName, slug) {
  magic(magicName, (el) => warn(`You can't use [$${magicName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
}
directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
  let func = evaluateLater2(expression);
  let innerGet = () => {
    let result;
    func((i) => result = i);
    return result;
  };
  let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
  let innerSet = (val) => evaluateInnerSet(() => {
  }, { scope: { "__placeholder": val } });
  let initialValue = innerGet();
  innerSet(initialValue);
  queueMicrotask(() => {
    if (!el._x_model)
      return;
    el._x_removeModelListeners["default"]();
    let outerGet = el._x_model.get;
    let outerSet = el._x_model.set;
    let releaseEntanglement = entangle(
      {
        get() {
          return outerGet();
        },
        set(value) {
          outerSet(value);
        }
      },
      {
        get() {
          return innerGet();
        },
        set(value) {
          innerSet(value);
        }
      }
    );
    cleanup2(releaseEntanglement);
  });
});
directive("teleport", (el, { modifiers, expression }, { cleanup: cleanup2 }) => {
  if (el.tagName.toLowerCase() !== "template")
    warn("x-teleport can only be used on a <template> tag", el);
  let target = getTarget(expression);
  let clone2 = el.content.cloneNode(true).firstElementChild;
  el._x_teleport = clone2;
  clone2._x_teleportBack = el;
  el.setAttribute("data-teleport-template", true);
  clone2.setAttribute("data-teleport-target", true);
  if (el._x_forwardEvents) {
    el._x_forwardEvents.forEach((eventName) => {
      clone2.addEventListener(eventName, (e) => {
        e.stopPropagation();
        el.dispatchEvent(new e.constructor(e.type, e));
      });
    });
  }
  addScopeToNode(clone2, {}, el);
  let placeInDom = (clone3, target2, modifiers2) => {
    if (modifiers2.includes("prepend")) {
      target2.parentNode.insertBefore(clone3, target2);
    } else if (modifiers2.includes("append")) {
      target2.parentNode.insertBefore(clone3, target2.nextSibling);
    } else {
      target2.appendChild(clone3);
    }
  };
  mutateDom(() => {
    placeInDom(clone2, target, modifiers);
    skipDuringClone(() => {
      initTree(clone2);
      clone2._x_ignore = true;
    })();
  });
  el._x_teleportPutBack = () => {
    let target2 = getTarget(expression);
    mutateDom(() => {
      placeInDom(el._x_teleport, target2, modifiers);
    });
  };
  cleanup2(() => clone2.remove());
});
var teleportContainerDuringClone = document.createElement("div");
function getTarget(expression) {
  let target = skipDuringClone(() => {
    return document.querySelector(expression);
  }, () => {
    return teleportContainerDuringClone;
  })();
  if (!target)
    warn(`Cannot find x-teleport element for selector: "${expression}"`);
  return target;
}
var handler = () => {
};
handler.inline = (el, { modifiers }, { cleanup: cleanup2 }) => {
  modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
  cleanup2(() => {
    modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
  });
};
directive("ignore", handler);
directive("effect", skipDuringClone((el, { expression }, { effect: effect3 }) => {
  effect3(evaluateLater(el, expression));
}));
function on(el, event, modifiers, callback) {
  let listenerTarget = el;
  let handler4 = (e) => callback(e);
  let options = {};
  let wrapHandler = (callback2, wrapper) => (e) => wrapper(callback2, e);
  if (modifiers.includes("dot"))
    event = dotSyntax(event);
  if (modifiers.includes("camel"))
    event = camelCase2(event);
  if (modifiers.includes("passive"))
    options.passive = true;
  if (modifiers.includes("capture"))
    options.capture = true;
  if (modifiers.includes("window"))
    listenerTarget = window;
  if (modifiers.includes("document"))
    listenerTarget = document;
  if (modifiers.includes("debounce")) {
    let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
    let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
    handler4 = debounce(handler4, wait);
  }
  if (modifiers.includes("throttle")) {
    let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
    let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
    handler4 = throttle(handler4, wait);
  }
  if (modifiers.includes("prevent"))
    handler4 = wrapHandler(handler4, (next, e) => {
      e.preventDefault();
      next(e);
    });
  if (modifiers.includes("stop"))
    handler4 = wrapHandler(handler4, (next, e) => {
      e.stopPropagation();
      next(e);
    });
  if (modifiers.includes("once")) {
    handler4 = wrapHandler(handler4, (next, e) => {
      next(e);
      listenerTarget.removeEventListener(event, handler4, options);
    });
  }
  if (modifiers.includes("away") || modifiers.includes("outside")) {
    listenerTarget = document;
    handler4 = wrapHandler(handler4, (next, e) => {
      if (el.contains(e.target))
        return;
      if (e.target.isConnected === false)
        return;
      if (el.offsetWidth < 1 && el.offsetHeight < 1)
        return;
      if (el._x_isShown === false)
        return;
      next(e);
    });
  }
  if (modifiers.includes("self"))
    handler4 = wrapHandler(handler4, (next, e) => {
      e.target === el && next(e);
    });
  if (isKeyEvent(event) || isClickEvent(event)) {
    handler4 = wrapHandler(handler4, (next, e) => {
      if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
        return;
      }
      next(e);
    });
  }
  listenerTarget.addEventListener(event, handler4, options);
  return () => {
    listenerTarget.removeEventListener(event, handler4, options);
  };
}
function dotSyntax(subject) {
  return subject.replace(/-/g, ".");
}
function camelCase2(subject) {
  return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
}
function isNumeric(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function kebabCase2(subject) {
  if ([" ", "_"].includes(
    subject
  ))
    return subject;
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function isKeyEvent(event) {
  return ["keydown", "keyup"].includes(event);
}
function isClickEvent(event) {
  return ["contextmenu", "click", "mouse"].some((i) => event.includes(i));
}
function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
  let keyModifiers = modifiers.filter((i) => {
    return !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(i);
  });
  if (keyModifiers.includes("debounce")) {
    let debounceIndex = keyModifiers.indexOf("debounce");
    keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (keyModifiers.includes("throttle")) {
    let debounceIndex = keyModifiers.indexOf("throttle");
    keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (keyModifiers.length === 0)
    return false;
  if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0]))
    return false;
  const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
  const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
  keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
  if (selectedSystemKeyModifiers.length > 0) {
    const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
      if (modifier === "cmd" || modifier === "super")
        modifier = "meta";
      return e[`${modifier}Key`];
    });
    if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
      if (isClickEvent(e.type))
        return false;
      if (keyToModifiers(e.key).includes(keyModifiers[0]))
        return false;
    }
  }
  return true;
}
function keyToModifiers(key) {
  if (!key)
    return [];
  key = kebabCase2(key);
  let modifierToKeyMap = {
    "ctrl": "control",
    "slash": "/",
    "space": " ",
    "spacebar": " ",
    "cmd": "meta",
    "esc": "escape",
    "up": "arrow-up",
    "down": "arrow-down",
    "left": "arrow-left",
    "right": "arrow-right",
    "period": ".",
    "comma": ",",
    "equal": "=",
    "minus": "-",
    "underscore": "_"
  };
  modifierToKeyMap[key] = key;
  return Object.keys(modifierToKeyMap).map((modifier) => {
    if (modifierToKeyMap[modifier] === key)
      return modifier;
  }).filter((modifier) => modifier);
}
directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 }) => {
  let scopeTarget = el;
  if (modifiers.includes("parent")) {
    scopeTarget = el.parentNode;
  }
  let evaluateGet = evaluateLater(scopeTarget, expression);
  let evaluateSet;
  if (typeof expression === "string") {
    evaluateSet = evaluateLater(scopeTarget, `${expression} = __placeholder`);
  } else if (typeof expression === "function" && typeof expression() === "string") {
    evaluateSet = evaluateLater(scopeTarget, `${expression()} = __placeholder`);
  } else {
    evaluateSet = () => {
    };
  }
  let getValue = () => {
    let result;
    evaluateGet((value) => result = value);
    return isGetterSetter(result) ? result.get() : result;
  };
  let setValue = (value) => {
    let result;
    evaluateGet((value2) => result = value2);
    if (isGetterSetter(result)) {
      result.set(value);
    } else {
      evaluateSet(() => {
      }, {
        scope: { "__placeholder": value }
      });
    }
  };
  if (typeof expression === "string" && el.type === "radio") {
    mutateDom(() => {
      if (!el.hasAttribute("name"))
        el.setAttribute("name", expression);
    });
  }
  var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
  let removeListener = isCloning ? () => {
  } : on(el, event, modifiers, (e) => {
    setValue(getInputValue(el, modifiers, e, getValue()));
  });
  if (modifiers.includes("fill")) {
    if ([void 0, null, ""].includes(getValue()) || el.type === "checkbox" && Array.isArray(getValue()) || el.tagName.toLowerCase() === "select" && el.multiple) {
      setValue(
        getInputValue(el, modifiers, { target: el }, getValue())
      );
    }
  }
  if (!el._x_removeModelListeners)
    el._x_removeModelListeners = {};
  el._x_removeModelListeners["default"] = removeListener;
  cleanup2(() => el._x_removeModelListeners["default"]());
  if (el.form) {
    let removeResetListener = on(el.form, "reset", [], (e) => {
      nextTick(() => el._x_model && el._x_model.set(getInputValue(el, modifiers, { target: el }, getValue())));
    });
    cleanup2(() => removeResetListener());
  }
  el._x_model = {
    get() {
      return getValue();
    },
    set(value) {
      setValue(value);
    }
  };
  el._x_forceModelUpdate = (value) => {
    if (value === void 0 && typeof expression === "string" && expression.match(/\./))
      value = "";
    window.fromModel = true;
    mutateDom(() => bind(el, "value", value));
    delete window.fromModel;
  };
  effect3(() => {
    let value = getValue();
    if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
      return;
    el._x_forceModelUpdate(value);
  });
});
function getInputValue(el, modifiers, event, currentValue) {
  return mutateDom(() => {
    if (event instanceof CustomEvent && event.detail !== void 0)
      return event.detail !== null && event.detail !== void 0 ? event.detail : event.target.value;
    else if (el.type === "checkbox") {
      if (Array.isArray(currentValue)) {
        let newValue = null;
        if (modifiers.includes("number")) {
          newValue = safeParseNumber(event.target.value);
        } else if (modifiers.includes("boolean")) {
          newValue = safeParseBoolean(event.target.value);
        } else {
          newValue = event.target.value;
        }
        return event.target.checked ? currentValue.includes(newValue) ? currentValue : currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
      } else {
        return event.target.checked;
      }
    } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
      if (modifiers.includes("number")) {
        return Array.from(event.target.selectedOptions).map((option) => {
          let rawValue = option.value || option.text;
          return safeParseNumber(rawValue);
        });
      } else if (modifiers.includes("boolean")) {
        return Array.from(event.target.selectedOptions).map((option) => {
          let rawValue = option.value || option.text;
          return safeParseBoolean(rawValue);
        });
      }
      return Array.from(event.target.selectedOptions).map((option) => {
        return option.value || option.text;
      });
    } else {
      let newValue;
      if (el.type === "radio") {
        if (event.target.checked) {
          newValue = event.target.value;
        } else {
          newValue = currentValue;
        }
      } else {
        newValue = event.target.value;
      }
      if (modifiers.includes("number")) {
        return safeParseNumber(newValue);
      } else if (modifiers.includes("boolean")) {
        return safeParseBoolean(newValue);
      } else if (modifiers.includes("trim")) {
        return newValue.trim();
      } else {
        return newValue;
      }
    }
  });
}
function safeParseNumber(rawValue) {
  let number = rawValue ? parseFloat(rawValue) : null;
  return isNumeric2(number) ? number : rawValue;
}
function checkedAttrLooseCompare2(valueA, valueB) {
  return valueA == valueB;
}
function isNumeric2(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function isGetterSetter(value) {
  return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
}
directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));
addInitSelector(() => `[${prefix("init")}]`);
directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate2 }) => {
  if (typeof expression === "string") {
    return !!expression.trim() && evaluate2(expression, {}, false);
  }
  return evaluate2(expression, {}, false);
}));
directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
  let evaluate2 = evaluateLater2(expression);
  effect3(() => {
    evaluate2((value) => {
      mutateDom(() => {
        el.textContent = value;
      });
    });
  });
});
directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
  let evaluate2 = evaluateLater2(expression);
  effect3(() => {
    evaluate2((value) => {
      mutateDom(() => {
        el.innerHTML = value;
        el._x_ignoreSelf = true;
        initTree(el);
        delete el._x_ignoreSelf;
      });
    });
  });
});
mapAttributes(startingWith(":", into(prefix("bind:"))));
var handler2 = (el, { value, modifiers, expression, original }, { effect: effect3, cleanup: cleanup2 }) => {
  if (!value) {
    let bindingProviders = {};
    injectBindingProviders(bindingProviders);
    let getBindings = evaluateLater(el, expression);
    getBindings((bindings) => {
      applyBindingsObject(el, bindings, original);
    }, { scope: bindingProviders });
    return;
  }
  if (value === "key")
    return storeKeyForXFor(el, expression);
  if (el._x_inlineBindings && el._x_inlineBindings[value] && el._x_inlineBindings[value].extract) {
    return;
  }
  let evaluate2 = evaluateLater(el, expression);
  effect3(() => evaluate2((result) => {
    if (result === void 0 && typeof expression === "string" && expression.match(/\./)) {
      result = "";
    }
    mutateDom(() => bind(el, value, result, modifiers));
  }));
  cleanup2(() => {
    el._x_undoAddedClasses && el._x_undoAddedClasses();
    el._x_undoAddedStyles && el._x_undoAddedStyles();
  });
};
handler2.inline = (el, { value, modifiers, expression }) => {
  if (!value)
    return;
  if (!el._x_inlineBindings)
    el._x_inlineBindings = {};
  el._x_inlineBindings[value] = { expression, extract: false };
};
directive("bind", handler2);
function storeKeyForXFor(el, expression) {
  el._x_keyExpression = expression;
}
addRootSelector(() => `[${prefix("data")}]`);
directive("data", (el, { expression }, { cleanup: cleanup2 }) => {
  if (shouldSkipRegisteringDataDuringClone(el))
    return;
  expression = expression === "" ? "{}" : expression;
  let magicContext = {};
  injectMagics(magicContext, el);
  let dataProviderContext = {};
  injectDataProviders(dataProviderContext, magicContext);
  let data2 = evaluate(el, expression, { scope: dataProviderContext });
  if (data2 === void 0 || data2 === true)
    data2 = {};
  injectMagics(data2, el);
  let reactiveData = reactive(data2);
  initInterceptors(reactiveData);
  let undo = addScopeToNode(el, reactiveData);
  reactiveData["init"] && evaluate(el, reactiveData["init"]);
  cleanup2(() => {
    reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
    undo();
  });
});
interceptClone((from, to) => {
  if (from._x_dataStack) {
    to._x_dataStack = from._x_dataStack;
    to.setAttribute("data-has-alpine-state", true);
  }
});
function shouldSkipRegisteringDataDuringClone(el) {
  if (!isCloning)
    return false;
  if (isCloningLegacy)
    return true;
  return el.hasAttribute("data-has-alpine-state");
}
directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
  let evaluate2 = evaluateLater(el, expression);
  if (!el._x_doHide)
    el._x_doHide = () => {
      mutateDom(() => {
        el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : void 0);
      });
    };
  if (!el._x_doShow)
    el._x_doShow = () => {
      mutateDom(() => {
        if (el.style.length === 1 && el.style.display === "none") {
          el.removeAttribute("style");
        } else {
          el.style.removeProperty("display");
        }
      });
    };
  let hide = () => {
    el._x_doHide();
    el._x_isShown = false;
  };
  let show = () => {
    el._x_doShow();
    el._x_isShown = true;
  };
  let clickAwayCompatibleShow = () => setTimeout(show);
  let toggle = once(
    (value) => value ? show() : hide(),
    (value) => {
      if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
        el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
      } else {
        value ? clickAwayCompatibleShow() : hide();
      }
    }
  );
  let oldValue;
  let firstTime = true;
  effect3(() => evaluate2((value) => {
    if (!firstTime && value === oldValue)
      return;
    if (modifiers.includes("immediate"))
      value ? clickAwayCompatibleShow() : hide();
    toggle(value);
    oldValue = value;
    firstTime = false;
  }));
});
directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
  let iteratorNames = parseForExpression(expression);
  let evaluateItems = evaluateLater(el, iteratorNames.items);
  let evaluateKey = evaluateLater(
    el,
    // the x-bind:key expression is stored for our use instead of evaluated.
    el._x_keyExpression || "index"
  );
  el._x_prevKeys = [];
  el._x_lookup = {};
  effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
  cleanup2(() => {
    Object.values(el._x_lookup).forEach((el2) => el2.remove());
    delete el._x_prevKeys;
    delete el._x_lookup;
  });
});
function loop(el, iteratorNames, evaluateItems, evaluateKey) {
  let isObject2 = (i) => typeof i === "object" && !Array.isArray(i);
  let templateEl = el;
  evaluateItems((items) => {
    if (isNumeric3(items) && items >= 0) {
      items = Array.from(Array(items).keys(), (i) => i + 1);
    }
    if (items === void 0)
      items = [];
    let lookup = el._x_lookup;
    let prevKeys = el._x_prevKeys;
    let scopes = [];
    let keys = [];
    if (isObject2(items)) {
      items = Object.entries(items).map(([key, value]) => {
        let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
        evaluateKey((value2) => {
          if (keys.includes(value2))
            warn("Duplicate key on x-for", el);
          keys.push(value2);
        }, { scope: { index: key, ...scope2 } });
        scopes.push(scope2);
      });
    } else {
      for (let i = 0; i < items.length; i++) {
        let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
        evaluateKey((value) => {
          if (keys.includes(value))
            warn("Duplicate key on x-for", el);
          keys.push(value);
        }, { scope: { index: i, ...scope2 } });
        scopes.push(scope2);
      }
    }
    let adds = [];
    let moves = [];
    let removes = [];
    let sames = [];
    for (let i = 0; i < prevKeys.length; i++) {
      let key = prevKeys[i];
      if (keys.indexOf(key) === -1)
        removes.push(key);
    }
    prevKeys = prevKeys.filter((key) => !removes.includes(key));
    let lastKey = "template";
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let prevIndex = prevKeys.indexOf(key);
      if (prevIndex === -1) {
        prevKeys.splice(i, 0, key);
        adds.push([lastKey, i]);
      } else if (prevIndex !== i) {
        let keyInSpot = prevKeys.splice(i, 1)[0];
        let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
        prevKeys.splice(i, 0, keyForSpot);
        prevKeys.splice(prevIndex, 0, keyInSpot);
        moves.push([keyInSpot, keyForSpot]);
      } else {
        sames.push(key);
      }
      lastKey = key;
    }
    for (let i = 0; i < removes.length; i++) {
      let key = removes[i];
      if (!!lookup[key]._x_effects) {
        lookup[key]._x_effects.forEach(dequeueJob);
      }
      lookup[key].remove();
      lookup[key] = null;
      delete lookup[key];
    }
    for (let i = 0; i < moves.length; i++) {
      let [keyInSpot, keyForSpot] = moves[i];
      let elInSpot = lookup[keyInSpot];
      let elForSpot = lookup[keyForSpot];
      let marker = document.createElement("div");
      mutateDom(() => {
        if (!elForSpot)
          warn(`x-for ":key" is undefined or invalid`, templateEl, keyForSpot, lookup);
        elForSpot.after(marker);
        elInSpot.after(elForSpot);
        elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
        marker.before(elInSpot);
        elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
        marker.remove();
      });
      elForSpot._x_refreshXForScope(scopes[keys.indexOf(keyForSpot)]);
    }
    for (let i = 0; i < adds.length; i++) {
      let [lastKey2, index] = adds[i];
      let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
      if (lastEl._x_currentIfEl)
        lastEl = lastEl._x_currentIfEl;
      let scope2 = scopes[index];
      let key = keys[index];
      let clone2 = document.importNode(templateEl.content, true).firstElementChild;
      let reactiveScope = reactive(scope2);
      addScopeToNode(clone2, reactiveScope, templateEl);
      clone2._x_refreshXForScope = (newScope) => {
        Object.entries(newScope).forEach(([key2, value]) => {
          reactiveScope[key2] = value;
        });
      };
      mutateDom(() => {
        lastEl.after(clone2);
        skipDuringClone(() => initTree(clone2))();
      });
      if (typeof key === "object") {
        warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
      }
      lookup[key] = clone2;
    }
    for (let i = 0; i < sames.length; i++) {
      lookup[sames[i]]._x_refreshXForScope(scopes[keys.indexOf(sames[i])]);
    }
    templateEl._x_prevKeys = keys;
  });
}
function parseForExpression(expression) {
  let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  let stripParensRE = /^\s*\(|\)\s*$/g;
  let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  let inMatch = expression.match(forAliasRE);
  if (!inMatch)
    return;
  let res = {};
  res.items = inMatch[2].trim();
  let item = inMatch[1].replace(stripParensRE, "").trim();
  let iteratorMatch = item.match(forIteratorRE);
  if (iteratorMatch) {
    res.item = item.replace(forIteratorRE, "").trim();
    res.index = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.collection = iteratorMatch[2].trim();
    }
  } else {
    res.item = item;
  }
  return res;
}
function getIterationScopeVariables(iteratorNames, item, index, items) {
  let scopeVariables = {};
  if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
    let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
    names.forEach((name, i) => {
      scopeVariables[name] = item[i];
    });
  } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
    let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim());
    names.forEach((name) => {
      scopeVariables[name] = item[name];
    });
  } else {
    scopeVariables[iteratorNames.item] = item;
  }
  if (iteratorNames.index)
    scopeVariables[iteratorNames.index] = index;
  if (iteratorNames.collection)
    scopeVariables[iteratorNames.collection] = items;
  return scopeVariables;
}
function isNumeric3(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function handler3() {
}
handler3.inline = (el, { expression }, { cleanup: cleanup2 }) => {
  let root = closestRoot(el);
  if (!root._x_refs)
    root._x_refs = {};
  root._x_refs[expression] = el;
  cleanup2(() => delete root._x_refs[expression]);
};
directive("ref", handler3);
directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
  if (el.tagName.toLowerCase() !== "template")
    warn("x-if can only be used on a <template> tag", el);
  let evaluate2 = evaluateLater(el, expression);
  let show = () => {
    if (el._x_currentIfEl)
      return el._x_currentIfEl;
    let clone2 = el.content.cloneNode(true).firstElementChild;
    addScopeToNode(clone2, {}, el);
    mutateDom(() => {
      el.after(clone2);
      skipDuringClone(() => initTree(clone2))();
    });
    el._x_currentIfEl = clone2;
    el._x_undoIf = () => {
      walk(clone2, (node) => {
        if (!!node._x_effects) {
          node._x_effects.forEach(dequeueJob);
        }
      });
      clone2.remove();
      delete el._x_currentIfEl;
    };
    return clone2;
  };
  let hide = () => {
    if (!el._x_undoIf)
      return;
    el._x_undoIf();
    delete el._x_undoIf;
  };
  effect3(() => evaluate2((value) => {
    value ? show() : hide();
  }));
  cleanup2(() => el._x_undoIf && el._x_undoIf());
});
directive("id", (el, { expression }, { evaluate: evaluate2 }) => {
  let names = evaluate2(expression);
  names.forEach((name) => setIdRoot(el, name));
});
interceptClone((from, to) => {
  if (from._x_ids) {
    to._x_ids = from._x_ids;
  }
});
mapAttributes(startingWith("@", into(prefix("on:"))));
directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 }) => {
  let evaluate2 = expression ? evaluateLater(el, expression) : () => {
  };
  if (el.tagName.toLowerCase() === "template") {
    if (!el._x_forwardEvents)
      el._x_forwardEvents = [];
    if (!el._x_forwardEvents.includes(value))
      el._x_forwardEvents.push(value);
  }
  let removeListener = on(el, value, modifiers, (e) => {
    evaluate2(() => {
    }, { scope: { "$event": e }, params: [e] });
  });
  cleanup2(() => removeListener());
}));
warnMissingPluginDirective("Collapse", "collapse", "collapse");
warnMissingPluginDirective("Intersect", "intersect", "intersect");
warnMissingPluginDirective("Focus", "trap", "focus");
warnMissingPluginDirective("Mask", "mask", "mask");
function warnMissingPluginDirective(name, directiveName, slug) {
  directive(directiveName, (el) => warn(`You can't use [x-${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
}
alpine_default.setEvaluator(normalEvaluator);
alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
var src_default = alpine_default;
var module_default = src_default;

// node_modules/leaflet/dist/leaflet-src.esm.js
function extend(dest) {
  var i, j, len, src;
  for (j = 1, len = arguments.length; j < len; j++) {
    src = arguments[j];
    for (i in src) {
      dest[i] = src[i];
    }
  }
  return dest;
}
var create$2 = Object.create || function() {
  function F() {
  }
  return function(proto) {
    F.prototype = proto;
    return new F();
  };
}();
function bind3(fn, obj) {
  var slice = Array.prototype.slice;
  if (fn.bind) {
    return fn.bind.apply(fn, slice.call(arguments, 1));
  }
  var args = slice.call(arguments, 2);
  return function() {
    return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
  };
}
var lastId = 0;
function stamp(obj) {
  if (!("_leaflet_id" in obj)) {
    obj["_leaflet_id"] = ++lastId;
  }
  return obj._leaflet_id;
}
function throttle2(fn, time, context) {
  var lock, args, wrapperFn, later;
  later = function() {
    lock = false;
    if (args) {
      wrapperFn.apply(context, args);
      args = false;
    }
  };
  wrapperFn = function() {
    if (lock) {
      args = arguments;
    } else {
      fn.apply(context, arguments);
      setTimeout(later, time);
      lock = true;
    }
  };
  return wrapperFn;
}
function wrapNum(x, range, includeMax) {
  var max = range[1], min = range[0], d = max - min;
  return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
}
function falseFn() {
  return false;
}
function formatNum(num, precision) {
  if (precision === false) {
    return num;
  }
  var pow = Math.pow(10, precision === void 0 ? 6 : precision);
  return Math.round(num * pow) / pow;
}
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function splitWords(str) {
  return trim(str).split(/\s+/);
}
function setOptions(obj, options) {
  if (!Object.prototype.hasOwnProperty.call(obj, "options")) {
    obj.options = obj.options ? create$2(obj.options) : {};
  }
  for (var i in options) {
    obj.options[i] = options[i];
  }
  return obj.options;
}
function getParamString(obj, existingUrl, uppercase) {
  var params = [];
  for (var i in obj) {
    params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + "=" + encodeURIComponent(obj[i]));
  }
  return (!existingUrl || existingUrl.indexOf("?") === -1 ? "?" : "&") + params.join("&");
}
var templateRe = /\{ *([\w_ -]+) *\}/g;
function template(str, data2) {
  return str.replace(templateRe, function(str2, key) {
    var value = data2[key];
    if (value === void 0) {
      throw new Error("No value provided for variable " + str2);
    } else if (typeof value === "function") {
      value = value(data2);
    }
    return value;
  });
}
var isArray2 = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
};
function indexOf(array, el) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === el) {
      return i;
    }
  }
  return -1;
}
var emptyImageUrl = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
function getPrefixed(name) {
  return window["webkit" + name] || window["moz" + name] || window["ms" + name];
}
var lastTime = 0;
function timeoutDefer(fn) {
  var time = +/* @__PURE__ */ new Date(), timeToCall = Math.max(0, 16 - (time - lastTime));
  lastTime = time + timeToCall;
  return window.setTimeout(fn, timeToCall);
}
var requestFn = window.requestAnimationFrame || getPrefixed("RequestAnimationFrame") || timeoutDefer;
var cancelFn = window.cancelAnimationFrame || getPrefixed("CancelAnimationFrame") || getPrefixed("CancelRequestAnimationFrame") || function(id) {
  window.clearTimeout(id);
};
function requestAnimFrame(fn, context, immediate) {
  if (immediate && requestFn === timeoutDefer) {
    fn.call(context);
  } else {
    return requestFn.call(window, bind3(fn, context));
  }
}
function cancelAnimFrame(id) {
  if (id) {
    cancelFn.call(window, id);
  }
}
function Class() {
}
Class.extend = function(props) {
  var NewClass = function() {
    setOptions(this);
    if (this.initialize) {
      this.initialize.apply(this, arguments);
    }
    this.callInitHooks();
  };
  var parentProto = NewClass.__super__ = this.prototype;
  var proto = create$2(parentProto);
  proto.constructor = NewClass;
  NewClass.prototype = proto;
  for (var i in this) {
    if (Object.prototype.hasOwnProperty.call(this, i) && i !== "prototype" && i !== "__super__") {
      NewClass[i] = this[i];
    }
  }
  if (props.statics) {
    extend(NewClass, props.statics);
  }
  if (props.includes) {
    checkDeprecatedMixinEvents(props.includes);
    extend.apply(null, [proto].concat(props.includes));
  }
  extend(proto, props);
  delete proto.statics;
  delete proto.includes;
  if (proto.options) {
    proto.options = parentProto.options ? create$2(parentProto.options) : {};
    extend(proto.options, props.options);
  }
  proto._initHooks = [];
  proto.callInitHooks = function() {
    if (this._initHooksCalled) {
      return;
    }
    if (parentProto.callInitHooks) {
      parentProto.callInitHooks.call(this);
    }
    this._initHooksCalled = true;
    for (var i2 = 0, len = proto._initHooks.length; i2 < len; i2++) {
      proto._initHooks[i2].call(this);
    }
  };
  return NewClass;
};
Class.include = function(props) {
  var parentOptions = this.prototype.options;
  extend(this.prototype, props);
  if (props.options) {
    this.prototype.options = parentOptions;
    this.mergeOptions(props.options);
  }
  return this;
};
Class.mergeOptions = function(options) {
  extend(this.prototype.options, options);
  return this;
};
Class.addInitHook = function(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  var init = typeof fn === "function" ? fn : function() {
    this[fn].apply(this, args);
  };
  this.prototype._initHooks = this.prototype._initHooks || [];
  this.prototype._initHooks.push(init);
  return this;
};
function checkDeprecatedMixinEvents(includes) {
  if (typeof L === "undefined" || !L || !L.Mixin) {
    return;
  }
  includes = isArray2(includes) ? includes : [includes];
  for (var i = 0; i < includes.length; i++) {
    if (includes[i] === L.Mixin.Events) {
      console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
    }
  }
}
var Events = {
  /* @method on(type: String, fn: Function, context?: Object): this
   * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
   *
   * @alternative
   * @method on(eventMap: Object): this
   * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
   */
  on: function(types, fn, context) {
    if (typeof types === "object") {
      for (var type in types) {
        this._on(type, types[type], fn);
      }
    } else {
      types = splitWords(types);
      for (var i = 0, len = types.length; i < len; i++) {
        this._on(types[i], fn, context);
      }
    }
    return this;
  },
  /* @method off(type: String, fn?: Function, context?: Object): this
   * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
   *
   * @alternative
   * @method off(eventMap: Object): this
   * Removes a set of type/listener pairs.
   *
   * @alternative
   * @method off: this
   * Removes all listeners to all events on the object. This includes implicitly attached events.
   */
  off: function(types, fn, context) {
    if (!arguments.length) {
      delete this._events;
    } else if (typeof types === "object") {
      for (var type in types) {
        this._off(type, types[type], fn);
      }
    } else {
      types = splitWords(types);
      var removeAll = arguments.length === 1;
      for (var i = 0, len = types.length; i < len; i++) {
        if (removeAll) {
          this._off(types[i]);
        } else {
          this._off(types[i], fn, context);
        }
      }
    }
    return this;
  },
  // attach listener (without syntactic sugar now)
  _on: function(type, fn, context, _once) {
    if (typeof fn !== "function") {
      console.warn("wrong listener type: " + typeof fn);
      return;
    }
    if (this._listens(type, fn, context) !== false) {
      return;
    }
    if (context === this) {
      context = void 0;
    }
    var newListener = { fn, ctx: context };
    if (_once) {
      newListener.once = true;
    }
    this._events = this._events || {};
    this._events[type] = this._events[type] || [];
    this._events[type].push(newListener);
  },
  _off: function(type, fn, context) {
    var listeners, i, len;
    if (!this._events) {
      return;
    }
    listeners = this._events[type];
    if (!listeners) {
      return;
    }
    if (arguments.length === 1) {
      if (this._firingCount) {
        for (i = 0, len = listeners.length; i < len; i++) {
          listeners[i].fn = falseFn;
        }
      }
      delete this._events[type];
      return;
    }
    if (typeof fn !== "function") {
      console.warn("wrong listener type: " + typeof fn);
      return;
    }
    var index = this._listens(type, fn, context);
    if (index !== false) {
      var listener = listeners[index];
      if (this._firingCount) {
        listener.fn = falseFn;
        this._events[type] = listeners = listeners.slice();
      }
      listeners.splice(index, 1);
    }
  },
  // @method fire(type: String, data?: Object, propagate?: Boolean): this
  // Fires an event of the specified type. You can optionally provide a data
  // object — the first argument of the listener function will contain its
  // properties. The event can optionally be propagated to event parents.
  fire: function(type, data2, propagate) {
    if (!this.listens(type, propagate)) {
      return this;
    }
    var event = extend({}, data2, {
      type,
      target: this,
      sourceTarget: data2 && data2.sourceTarget || this
    });
    if (this._events) {
      var listeners = this._events[type];
      if (listeners) {
        this._firingCount = this._firingCount + 1 || 1;
        for (var i = 0, len = listeners.length; i < len; i++) {
          var l = listeners[i];
          var fn = l.fn;
          if (l.once) {
            this.off(type, fn, l.ctx);
          }
          fn.call(l.ctx || this, event);
        }
        this._firingCount--;
      }
    }
    if (propagate) {
      this._propagateEvent(event);
    }
    return this;
  },
  // @method listens(type: String, propagate?: Boolean): Boolean
  // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
  // Returns `true` if a particular event type has any listeners attached to it.
  // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
  listens: function(type, fn, context, propagate) {
    if (typeof type !== "string") {
      console.warn('"string" type argument expected');
    }
    var _fn = fn;
    if (typeof fn !== "function") {
      propagate = !!fn;
      _fn = void 0;
      context = void 0;
    }
    var listeners = this._events && this._events[type];
    if (listeners && listeners.length) {
      if (this._listens(type, _fn, context) !== false) {
        return true;
      }
    }
    if (propagate) {
      for (var id in this._eventParents) {
        if (this._eventParents[id].listens(type, fn, context, propagate)) {
          return true;
        }
      }
    }
    return false;
  },
  // returns the index (number) or false
  _listens: function(type, fn, context) {
    if (!this._events) {
      return false;
    }
    var listeners = this._events[type] || [];
    if (!fn) {
      return !!listeners.length;
    }
    if (context === this) {
      context = void 0;
    }
    for (var i = 0, len = listeners.length; i < len; i++) {
      if (listeners[i].fn === fn && listeners[i].ctx === context) {
        return i;
      }
    }
    return false;
  },
  // @method once(…): this
  // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
  once: function(types, fn, context) {
    if (typeof types === "object") {
      for (var type in types) {
        this._on(type, types[type], fn, true);
      }
    } else {
      types = splitWords(types);
      for (var i = 0, len = types.length; i < len; i++) {
        this._on(types[i], fn, context, true);
      }
    }
    return this;
  },
  // @method addEventParent(obj: Evented): this
  // Adds an event parent - an `Evented` that will receive propagated events
  addEventParent: function(obj) {
    this._eventParents = this._eventParents || {};
    this._eventParents[stamp(obj)] = obj;
    return this;
  },
  // @method removeEventParent(obj: Evented): this
  // Removes an event parent, so it will stop receiving propagated events
  removeEventParent: function(obj) {
    if (this._eventParents) {
      delete this._eventParents[stamp(obj)];
    }
    return this;
  },
  _propagateEvent: function(e) {
    for (var id in this._eventParents) {
      this._eventParents[id].fire(e.type, extend({
        layer: e.target,
        propagatedFrom: e.target
      }, e), true);
    }
  }
};
Events.addEventListener = Events.on;
Events.removeEventListener = Events.clearAllEventListeners = Events.off;
Events.addOneTimeEventListener = Events.once;
Events.fireEvent = Events.fire;
Events.hasEventListeners = Events.listens;
var Evented = Class.extend(Events);
function Point(x, y, round) {
  this.x = round ? Math.round(x) : x;
  this.y = round ? Math.round(y) : y;
}
var trunc = Math.trunc || function(v) {
  return v > 0 ? Math.floor(v) : Math.ceil(v);
};
Point.prototype = {
  // @method clone(): Point
  // Returns a copy of the current point.
  clone: function() {
    return new Point(this.x, this.y);
  },
  // @method add(otherPoint: Point): Point
  // Returns the result of addition of the current and the given points.
  add: function(point) {
    return this.clone()._add(toPoint(point));
  },
  _add: function(point) {
    this.x += point.x;
    this.y += point.y;
    return this;
  },
  // @method subtract(otherPoint: Point): Point
  // Returns the result of subtraction of the given point from the current.
  subtract: function(point) {
    return this.clone()._subtract(toPoint(point));
  },
  _subtract: function(point) {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  },
  // @method divideBy(num: Number): Point
  // Returns the result of division of the current point by the given number.
  divideBy: function(num) {
    return this.clone()._divideBy(num);
  },
  _divideBy: function(num) {
    this.x /= num;
    this.y /= num;
    return this;
  },
  // @method multiplyBy(num: Number): Point
  // Returns the result of multiplication of the current point by the given number.
  multiplyBy: function(num) {
    return this.clone()._multiplyBy(num);
  },
  _multiplyBy: function(num) {
    this.x *= num;
    this.y *= num;
    return this;
  },
  // @method scaleBy(scale: Point): Point
  // Multiply each coordinate of the current point by each coordinate of
  // `scale`. In linear algebra terms, multiply the point by the
  // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
  // defined by `scale`.
  scaleBy: function(point) {
    return new Point(this.x * point.x, this.y * point.y);
  },
  // @method unscaleBy(scale: Point): Point
  // Inverse of `scaleBy`. Divide each coordinate of the current point by
  // each coordinate of `scale`.
  unscaleBy: function(point) {
    return new Point(this.x / point.x, this.y / point.y);
  },
  // @method round(): Point
  // Returns a copy of the current point with rounded coordinates.
  round: function() {
    return this.clone()._round();
  },
  _round: function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  },
  // @method floor(): Point
  // Returns a copy of the current point with floored coordinates (rounded down).
  floor: function() {
    return this.clone()._floor();
  },
  _floor: function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  },
  // @method ceil(): Point
  // Returns a copy of the current point with ceiled coordinates (rounded up).
  ceil: function() {
    return this.clone()._ceil();
  },
  _ceil: function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  },
  // @method trunc(): Point
  // Returns a copy of the current point with truncated coordinates (rounded towards zero).
  trunc: function() {
    return this.clone()._trunc();
  },
  _trunc: function() {
    this.x = trunc(this.x);
    this.y = trunc(this.y);
    return this;
  },
  // @method distanceTo(otherPoint: Point): Number
  // Returns the cartesian distance between the current and the given points.
  distanceTo: function(point) {
    point = toPoint(point);
    var x = point.x - this.x, y = point.y - this.y;
    return Math.sqrt(x * x + y * y);
  },
  // @method equals(otherPoint: Point): Boolean
  // Returns `true` if the given point has the same coordinates.
  equals: function(point) {
    point = toPoint(point);
    return point.x === this.x && point.y === this.y;
  },
  // @method contains(otherPoint: Point): Boolean
  // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
  contains: function(point) {
    point = toPoint(point);
    return Math.abs(point.x) <= Math.abs(this.x) && Math.abs(point.y) <= Math.abs(this.y);
  },
  // @method toString(): String
  // Returns a string representation of the point for debugging purposes.
  toString: function() {
    return "Point(" + formatNum(this.x) + ", " + formatNum(this.y) + ")";
  }
};
function toPoint(x, y, round) {
  if (x instanceof Point) {
    return x;
  }
  if (isArray2(x)) {
    return new Point(x[0], x[1]);
  }
  if (x === void 0 || x === null) {
    return x;
  }
  if (typeof x === "object" && "x" in x && "y" in x) {
    return new Point(x.x, x.y);
  }
  return new Point(x, y, round);
}
function Bounds(a, b) {
  if (!a) {
    return;
  }
  var points = b ? [a, b] : a;
  for (var i = 0, len = points.length; i < len; i++) {
    this.extend(points[i]);
  }
}
Bounds.prototype = {
  // @method extend(point: Point): this
  // Extends the bounds to contain the given point.
  // @alternative
  // @method extend(otherBounds: Bounds): this
  // Extend the bounds to contain the given bounds
  extend: function(obj) {
    var min2, max2;
    if (!obj) {
      return this;
    }
    if (obj instanceof Point || typeof obj[0] === "number" || "x" in obj) {
      min2 = max2 = toPoint(obj);
    } else {
      obj = toBounds(obj);
      min2 = obj.min;
      max2 = obj.max;
      if (!min2 || !max2) {
        return this;
      }
    }
    if (!this.min && !this.max) {
      this.min = min2.clone();
      this.max = max2.clone();
    } else {
      this.min.x = Math.min(min2.x, this.min.x);
      this.max.x = Math.max(max2.x, this.max.x);
      this.min.y = Math.min(min2.y, this.min.y);
      this.max.y = Math.max(max2.y, this.max.y);
    }
    return this;
  },
  // @method getCenter(round?: Boolean): Point
  // Returns the center point of the bounds.
  getCenter: function(round) {
    return toPoint(
      (this.min.x + this.max.x) / 2,
      (this.min.y + this.max.y) / 2,
      round
    );
  },
  // @method getBottomLeft(): Point
  // Returns the bottom-left point of the bounds.
  getBottomLeft: function() {
    return toPoint(this.min.x, this.max.y);
  },
  // @method getTopRight(): Point
  // Returns the top-right point of the bounds.
  getTopRight: function() {
    return toPoint(this.max.x, this.min.y);
  },
  // @method getTopLeft(): Point
  // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
  getTopLeft: function() {
    return this.min;
  },
  // @method getBottomRight(): Point
  // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
  getBottomRight: function() {
    return this.max;
  },
  // @method getSize(): Point
  // Returns the size of the given bounds
  getSize: function() {
    return this.max.subtract(this.min);
  },
  // @method contains(otherBounds: Bounds): Boolean
  // Returns `true` if the rectangle contains the given one.
  // @alternative
  // @method contains(point: Point): Boolean
  // Returns `true` if the rectangle contains the given point.
  contains: function(obj) {
    var min, max;
    if (typeof obj[0] === "number" || obj instanceof Point) {
      obj = toPoint(obj);
    } else {
      obj = toBounds(obj);
    }
    if (obj instanceof Bounds) {
      min = obj.min;
      max = obj.max;
    } else {
      min = max = obj;
    }
    return min.x >= this.min.x && max.x <= this.max.x && min.y >= this.min.y && max.y <= this.max.y;
  },
  // @method intersects(otherBounds: Bounds): Boolean
  // Returns `true` if the rectangle intersects the given bounds. Two bounds
  // intersect if they have at least one point in common.
  intersects: function(bounds) {
    bounds = toBounds(bounds);
    var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xIntersects = max2.x >= min.x && min2.x <= max.x, yIntersects = max2.y >= min.y && min2.y <= max.y;
    return xIntersects && yIntersects;
  },
  // @method overlaps(otherBounds: Bounds): Boolean
  // Returns `true` if the rectangle overlaps the given bounds. Two bounds
  // overlap if their intersection is an area.
  overlaps: function(bounds) {
    bounds = toBounds(bounds);
    var min = this.min, max = this.max, min2 = bounds.min, max2 = bounds.max, xOverlaps = max2.x > min.x && min2.x < max.x, yOverlaps = max2.y > min.y && min2.y < max.y;
    return xOverlaps && yOverlaps;
  },
  // @method isValid(): Boolean
  // Returns `true` if the bounds are properly initialized.
  isValid: function() {
    return !!(this.min && this.max);
  },
  // @method pad(bufferRatio: Number): Bounds
  // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
  // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
  // Negative values will retract the bounds.
  pad: function(bufferRatio) {
    var min = this.min, max = this.max, heightBuffer = Math.abs(min.x - max.x) * bufferRatio, widthBuffer = Math.abs(min.y - max.y) * bufferRatio;
    return toBounds(
      toPoint(min.x - heightBuffer, min.y - widthBuffer),
      toPoint(max.x + heightBuffer, max.y + widthBuffer)
    );
  },
  // @method equals(otherBounds: Bounds): Boolean
  // Returns `true` if the rectangle is equivalent to the given bounds.
  equals: function(bounds) {
    if (!bounds) {
      return false;
    }
    bounds = toBounds(bounds);
    return this.min.equals(bounds.getTopLeft()) && this.max.equals(bounds.getBottomRight());
  }
};
function toBounds(a, b) {
  if (!a || a instanceof Bounds) {
    return a;
  }
  return new Bounds(a, b);
}
function LatLngBounds(corner1, corner2) {
  if (!corner1) {
    return;
  }
  var latlngs = corner2 ? [corner1, corner2] : corner1;
  for (var i = 0, len = latlngs.length; i < len; i++) {
    this.extend(latlngs[i]);
  }
}
LatLngBounds.prototype = {
  // @method extend(latlng: LatLng): this
  // Extend the bounds to contain the given point
  // @alternative
  // @method extend(otherBounds: LatLngBounds): this
  // Extend the bounds to contain the given bounds
  extend: function(obj) {
    var sw = this._southWest, ne = this._northEast, sw2, ne2;
    if (obj instanceof LatLng) {
      sw2 = obj;
      ne2 = obj;
    } else if (obj instanceof LatLngBounds) {
      sw2 = obj._southWest;
      ne2 = obj._northEast;
      if (!sw2 || !ne2) {
        return this;
      }
    } else {
      return obj ? this.extend(toLatLng(obj) || toLatLngBounds(obj)) : this;
    }
    if (!sw && !ne) {
      this._southWest = new LatLng(sw2.lat, sw2.lng);
      this._northEast = new LatLng(ne2.lat, ne2.lng);
    } else {
      sw.lat = Math.min(sw2.lat, sw.lat);
      sw.lng = Math.min(sw2.lng, sw.lng);
      ne.lat = Math.max(ne2.lat, ne.lat);
      ne.lng = Math.max(ne2.lng, ne.lng);
    }
    return this;
  },
  // @method pad(bufferRatio: Number): LatLngBounds
  // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
  // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
  // Negative values will retract the bounds.
  pad: function(bufferRatio) {
    var sw = this._southWest, ne = this._northEast, heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio, widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;
    return new LatLngBounds(
      new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
      new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer)
    );
  },
  // @method getCenter(): LatLng
  // Returns the center point of the bounds.
  getCenter: function() {
    return new LatLng(
      (this._southWest.lat + this._northEast.lat) / 2,
      (this._southWest.lng + this._northEast.lng) / 2
    );
  },
  // @method getSouthWest(): LatLng
  // Returns the south-west point of the bounds.
  getSouthWest: function() {
    return this._southWest;
  },
  // @method getNorthEast(): LatLng
  // Returns the north-east point of the bounds.
  getNorthEast: function() {
    return this._northEast;
  },
  // @method getNorthWest(): LatLng
  // Returns the north-west point of the bounds.
  getNorthWest: function() {
    return new LatLng(this.getNorth(), this.getWest());
  },
  // @method getSouthEast(): LatLng
  // Returns the south-east point of the bounds.
  getSouthEast: function() {
    return new LatLng(this.getSouth(), this.getEast());
  },
  // @method getWest(): Number
  // Returns the west longitude of the bounds
  getWest: function() {
    return this._southWest.lng;
  },
  // @method getSouth(): Number
  // Returns the south latitude of the bounds
  getSouth: function() {
    return this._southWest.lat;
  },
  // @method getEast(): Number
  // Returns the east longitude of the bounds
  getEast: function() {
    return this._northEast.lng;
  },
  // @method getNorth(): Number
  // Returns the north latitude of the bounds
  getNorth: function() {
    return this._northEast.lat;
  },
  // @method contains(otherBounds: LatLngBounds): Boolean
  // Returns `true` if the rectangle contains the given one.
  // @alternative
  // @method contains (latlng: LatLng): Boolean
  // Returns `true` if the rectangle contains the given point.
  contains: function(obj) {
    if (typeof obj[0] === "number" || obj instanceof LatLng || "lat" in obj) {
      obj = toLatLng(obj);
    } else {
      obj = toLatLngBounds(obj);
    }
    var sw = this._southWest, ne = this._northEast, sw2, ne2;
    if (obj instanceof LatLngBounds) {
      sw2 = obj.getSouthWest();
      ne2 = obj.getNorthEast();
    } else {
      sw2 = ne2 = obj;
    }
    return sw2.lat >= sw.lat && ne2.lat <= ne.lat && sw2.lng >= sw.lng && ne2.lng <= ne.lng;
  },
  // @method intersects(otherBounds: LatLngBounds): Boolean
  // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
  intersects: function(bounds) {
    bounds = toLatLngBounds(bounds);
    var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latIntersects = ne2.lat >= sw.lat && sw2.lat <= ne.lat, lngIntersects = ne2.lng >= sw.lng && sw2.lng <= ne.lng;
    return latIntersects && lngIntersects;
  },
  // @method overlaps(otherBounds: LatLngBounds): Boolean
  // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
  overlaps: function(bounds) {
    bounds = toLatLngBounds(bounds);
    var sw = this._southWest, ne = this._northEast, sw2 = bounds.getSouthWest(), ne2 = bounds.getNorthEast(), latOverlaps = ne2.lat > sw.lat && sw2.lat < ne.lat, lngOverlaps = ne2.lng > sw.lng && sw2.lng < ne.lng;
    return latOverlaps && lngOverlaps;
  },
  // @method toBBoxString(): String
  // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
  toBBoxString: function() {
    return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
  },
  // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
  // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
  equals: function(bounds, maxMargin) {
    if (!bounds) {
      return false;
    }
    bounds = toLatLngBounds(bounds);
    return this._southWest.equals(bounds.getSouthWest(), maxMargin) && this._northEast.equals(bounds.getNorthEast(), maxMargin);
  },
  // @method isValid(): Boolean
  // Returns `true` if the bounds are properly initialized.
  isValid: function() {
    return !!(this._southWest && this._northEast);
  }
};
function toLatLngBounds(a, b) {
  if (a instanceof LatLngBounds) {
    return a;
  }
  return new LatLngBounds(a, b);
}
function LatLng(lat, lng, alt) {
  if (isNaN(lat) || isNaN(lng)) {
    throw new Error("Invalid LatLng object: (" + lat + ", " + lng + ")");
  }
  this.lat = +lat;
  this.lng = +lng;
  if (alt !== void 0) {
    this.alt = +alt;
  }
}
LatLng.prototype = {
  // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
  // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
  equals: function(obj, maxMargin) {
    if (!obj) {
      return false;
    }
    obj = toLatLng(obj);
    var margin = Math.max(
      Math.abs(this.lat - obj.lat),
      Math.abs(this.lng - obj.lng)
    );
    return margin <= (maxMargin === void 0 ? 1e-9 : maxMargin);
  },
  // @method toString(): String
  // Returns a string representation of the point (for debugging purposes).
  toString: function(precision) {
    return "LatLng(" + formatNum(this.lat, precision) + ", " + formatNum(this.lng, precision) + ")";
  },
  // @method distanceTo(otherLatLng: LatLng): Number
  // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
  distanceTo: function(other) {
    return Earth.distance(this, toLatLng(other));
  },
  // @method wrap(): LatLng
  // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
  wrap: function() {
    return Earth.wrapLatLng(this);
  },
  // @method toBounds(sizeInMeters: Number): LatLngBounds
  // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
  toBounds: function(sizeInMeters) {
    var latAccuracy = 180 * sizeInMeters / 40075017, lngAccuracy = latAccuracy / Math.cos(Math.PI / 180 * this.lat);
    return toLatLngBounds(
      [this.lat - latAccuracy, this.lng - lngAccuracy],
      [this.lat + latAccuracy, this.lng + lngAccuracy]
    );
  },
  clone: function() {
    return new LatLng(this.lat, this.lng, this.alt);
  }
};
function toLatLng(a, b, c) {
  if (a instanceof LatLng) {
    return a;
  }
  if (isArray2(a) && typeof a[0] !== "object") {
    if (a.length === 3) {
      return new LatLng(a[0], a[1], a[2]);
    }
    if (a.length === 2) {
      return new LatLng(a[0], a[1]);
    }
    return null;
  }
  if (a === void 0 || a === null) {
    return a;
  }
  if (typeof a === "object" && "lat" in a) {
    return new LatLng(a.lat, "lng" in a ? a.lng : a.lon, a.alt);
  }
  if (b === void 0) {
    return null;
  }
  return new LatLng(a, b, c);
}
var CRS = {
  // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
  // Projects geographical coordinates into pixel coordinates for a given zoom.
  latLngToPoint: function(latlng, zoom2) {
    var projectedPoint = this.projection.project(latlng), scale2 = this.scale(zoom2);
    return this.transformation._transform(projectedPoint, scale2);
  },
  // @method pointToLatLng(point: Point, zoom: Number): LatLng
  // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
  // zoom into geographical coordinates.
  pointToLatLng: function(point, zoom2) {
    var scale2 = this.scale(zoom2), untransformedPoint = this.transformation.untransform(point, scale2);
    return this.projection.unproject(untransformedPoint);
  },
  // @method project(latlng: LatLng): Point
  // Projects geographical coordinates into coordinates in units accepted for
  // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
  project: function(latlng) {
    return this.projection.project(latlng);
  },
  // @method unproject(point: Point): LatLng
  // Given a projected coordinate returns the corresponding LatLng.
  // The inverse of `project`.
  unproject: function(point) {
    return this.projection.unproject(point);
  },
  // @method scale(zoom: Number): Number
  // Returns the scale used when transforming projected coordinates into
  // pixel coordinates for a particular zoom. For example, it returns
  // `256 * 2^zoom` for Mercator-based CRS.
  scale: function(zoom2) {
    return 256 * Math.pow(2, zoom2);
  },
  // @method zoom(scale: Number): Number
  // Inverse of `scale()`, returns the zoom level corresponding to a scale
  // factor of `scale`.
  zoom: function(scale2) {
    return Math.log(scale2 / 256) / Math.LN2;
  },
  // @method getProjectedBounds(zoom: Number): Bounds
  // Returns the projection's bounds scaled and transformed for the provided `zoom`.
  getProjectedBounds: function(zoom2) {
    if (this.infinite) {
      return null;
    }
    var b = this.projection.bounds, s = this.scale(zoom2), min = this.transformation.transform(b.min, s), max = this.transformation.transform(b.max, s);
    return new Bounds(min, max);
  },
  // @method distance(latlng1: LatLng, latlng2: LatLng): Number
  // Returns the distance between two geographical coordinates.
  // @property code: String
  // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
  //
  // @property wrapLng: Number[]
  // An array of two numbers defining whether the longitude (horizontal) coordinate
  // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
  // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
  //
  // @property wrapLat: Number[]
  // Like `wrapLng`, but for the latitude (vertical) axis.
  // wrapLng: [min, max],
  // wrapLat: [min, max],
  // @property infinite: Boolean
  // If true, the coordinate space will be unbounded (infinite in both axes)
  infinite: false,
  // @method wrapLatLng(latlng: LatLng): LatLng
  // Returns a `LatLng` where lat and lng has been wrapped according to the
  // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
  wrapLatLng: function(latlng) {
    var lng = this.wrapLng ? wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng, lat = this.wrapLat ? wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat, alt = latlng.alt;
    return new LatLng(lat, lng, alt);
  },
  // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
  // Returns a `LatLngBounds` with the same size as the given one, ensuring
  // that its center is within the CRS's bounds.
  // Only accepts actual `L.LatLngBounds` instances, not arrays.
  wrapLatLngBounds: function(bounds) {
    var center = bounds.getCenter(), newCenter = this.wrapLatLng(center), latShift = center.lat - newCenter.lat, lngShift = center.lng - newCenter.lng;
    if (latShift === 0 && lngShift === 0) {
      return bounds;
    }
    var sw = bounds.getSouthWest(), ne = bounds.getNorthEast(), newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift), newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);
    return new LatLngBounds(newSw, newNe);
  }
};
var Earth = extend({}, CRS, {
  wrapLng: [-180, 180],
  // Mean Earth Radius, as recommended for use by
  // the International Union of Geodesy and Geophysics,
  // see https://rosettacode.org/wiki/Haversine_formula
  R: 6371e3,
  // distance between two geographical points using spherical law of cosines approximation
  distance: function(latlng1, latlng2) {
    var rad = Math.PI / 180, lat1 = latlng1.lat * rad, lat2 = latlng2.lat * rad, sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2), sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2), a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon, c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.R * c;
  }
});
var earthRadius = 6378137;
var SphericalMercator = {
  R: earthRadius,
  MAX_LATITUDE: 85.0511287798,
  project: function(latlng) {
    var d = Math.PI / 180, max = this.MAX_LATITUDE, lat = Math.max(Math.min(max, latlng.lat), -max), sin = Math.sin(lat * d);
    return new Point(
      this.R * latlng.lng * d,
      this.R * Math.log((1 + sin) / (1 - sin)) / 2
    );
  },
  unproject: function(point) {
    var d = 180 / Math.PI;
    return new LatLng(
      (2 * Math.atan(Math.exp(point.y / this.R)) - Math.PI / 2) * d,
      point.x * d / this.R
    );
  },
  bounds: function() {
    var d = earthRadius * Math.PI;
    return new Bounds([-d, -d], [d, d]);
  }()
};
function Transformation(a, b, c, d) {
  if (isArray2(a)) {
    this._a = a[0];
    this._b = a[1];
    this._c = a[2];
    this._d = a[3];
    return;
  }
  this._a = a;
  this._b = b;
  this._c = c;
  this._d = d;
}
Transformation.prototype = {
  // @method transform(point: Point, scale?: Number): Point
  // Returns a transformed point, optionally multiplied by the given scale.
  // Only accepts actual `L.Point` instances, not arrays.
  transform: function(point, scale2) {
    return this._transform(point.clone(), scale2);
  },
  // destructive transform (faster)
  _transform: function(point, scale2) {
    scale2 = scale2 || 1;
    point.x = scale2 * (this._a * point.x + this._b);
    point.y = scale2 * (this._c * point.y + this._d);
    return point;
  },
  // @method untransform(point: Point, scale?: Number): Point
  // Returns the reverse transformation of the given point, optionally divided
  // by the given scale. Only accepts actual `L.Point` instances, not arrays.
  untransform: function(point, scale2) {
    scale2 = scale2 || 1;
    return new Point(
      (point.x / scale2 - this._b) / this._a,
      (point.y / scale2 - this._d) / this._c
    );
  }
};
function toTransformation(a, b, c, d) {
  return new Transformation(a, b, c, d);
}
var EPSG3857 = extend({}, Earth, {
  code: "EPSG:3857",
  projection: SphericalMercator,
  transformation: function() {
    var scale2 = 0.5 / (Math.PI * SphericalMercator.R);
    return toTransformation(scale2, 0.5, -scale2, 0.5);
  }()
});
var EPSG900913 = extend({}, EPSG3857, {
  code: "EPSG:900913"
});
function svgCreate(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function pointsToPath(rings, closed) {
  var str = "", i, j, len, len2, points, p;
  for (i = 0, len = rings.length; i < len; i++) {
    points = rings[i];
    for (j = 0, len2 = points.length; j < len2; j++) {
      p = points[j];
      str += (j ? "L" : "M") + p.x + " " + p.y;
    }
    str += closed ? Browser.svg ? "z" : "x" : "";
  }
  return str || "M0 0";
}
var style = document.documentElement.style;
var ie = "ActiveXObject" in window;
var ielt9 = ie && !document.addEventListener;
var edge = "msLaunchUri" in navigator && !("documentMode" in document);
var webkit = userAgentContains("webkit");
var android = userAgentContains("android");
var android23 = userAgentContains("android 2") || userAgentContains("android 3");
var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10);
var androidStock = android && userAgentContains("Google") && webkitVer < 537 && !("AudioNode" in window);
var opera = !!window.opera;
var chrome = !edge && userAgentContains("chrome");
var gecko = userAgentContains("gecko") && !webkit && !opera && !ie;
var safari = !chrome && userAgentContains("safari");
var phantom = userAgentContains("phantom");
var opera12 = "OTransition" in style;
var win = navigator.platform.indexOf("Win") === 0;
var ie3d = ie && "transition" in style;
var webkit3d = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !android23;
var gecko3d = "MozPerspective" in style;
var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;
var mobile = typeof orientation !== "undefined" || userAgentContains("mobile");
var mobileWebkit = mobile && webkit;
var mobileWebkit3d = mobile && webkit3d;
var msPointer = !window.PointerEvent && window.MSPointerEvent;
var pointer = !!(window.PointerEvent || msPointer);
var touchNative = "ontouchstart" in window || !!window.TouchEvent;
var touch = !window.L_NO_TOUCH && (touchNative || pointer);
var mobileOpera = mobile && opera;
var mobileGecko = mobile && gecko;
var retina = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
var passiveEvents = function() {
  var supportsPassiveOption = false;
  try {
    var opts = Object.defineProperty({}, "passive", {
      get: function() {
        supportsPassiveOption = true;
      }
    });
    window.addEventListener("testPassiveEventSupport", falseFn, opts);
    window.removeEventListener("testPassiveEventSupport", falseFn, opts);
  } catch (e) {
  }
  return supportsPassiveOption;
}();
var canvas$1 = function() {
  return !!document.createElement("canvas").getContext;
}();
var svg$1 = !!(document.createElementNS && svgCreate("svg").createSVGRect);
var inlineSvg = !!svg$1 && function() {
  var div = document.createElement("div");
  div.innerHTML = "<svg/>";
  return (div.firstChild && div.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
}();
var vml = !svg$1 && function() {
  try {
    var div = document.createElement("div");
    div.innerHTML = '<v:shape adj="1"/>';
    var shape = div.firstChild;
    shape.style.behavior = "url(#default#VML)";
    return shape && typeof shape.adj === "object";
  } catch (e) {
    return false;
  }
}();
var mac = navigator.platform.indexOf("Mac") === 0;
var linux = navigator.platform.indexOf("Linux") === 0;
function userAgentContains(str) {
  return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
}
var Browser = {
  ie,
  ielt9,
  edge,
  webkit,
  android,
  android23,
  androidStock,
  opera,
  chrome,
  gecko,
  safari,
  phantom,
  opera12,
  win,
  ie3d,
  webkit3d,
  gecko3d,
  any3d,
  mobile,
  mobileWebkit,
  mobileWebkit3d,
  msPointer,
  pointer,
  touch,
  touchNative,
  mobileOpera,
  mobileGecko,
  retina,
  passiveEvents,
  canvas: canvas$1,
  svg: svg$1,
  vml,
  inlineSvg,
  mac,
  linux
};
var POINTER_DOWN = Browser.msPointer ? "MSPointerDown" : "pointerdown";
var POINTER_MOVE = Browser.msPointer ? "MSPointerMove" : "pointermove";
var POINTER_UP = Browser.msPointer ? "MSPointerUp" : "pointerup";
var POINTER_CANCEL = Browser.msPointer ? "MSPointerCancel" : "pointercancel";
var pEvent = {
  touchstart: POINTER_DOWN,
  touchmove: POINTER_MOVE,
  touchend: POINTER_UP,
  touchcancel: POINTER_CANCEL
};
var handle = {
  touchstart: _onPointerStart,
  touchmove: _handlePointer,
  touchend: _handlePointer,
  touchcancel: _handlePointer
};
var _pointers = {};
var _pointerDocListener = false;
function addPointerListener(obj, type, handler4) {
  if (type === "touchstart") {
    _addPointerDocListener();
  }
  if (!handle[type]) {
    console.warn("wrong event specified:", type);
    return falseFn;
  }
  handler4 = handle[type].bind(this, handler4);
  obj.addEventListener(pEvent[type], handler4, false);
  return handler4;
}
function removePointerListener(obj, type, handler4) {
  if (!pEvent[type]) {
    console.warn("wrong event specified:", type);
    return;
  }
  obj.removeEventListener(pEvent[type], handler4, false);
}
function _globalPointerDown(e) {
  _pointers[e.pointerId] = e;
}
function _globalPointerMove(e) {
  if (_pointers[e.pointerId]) {
    _pointers[e.pointerId] = e;
  }
}
function _globalPointerUp(e) {
  delete _pointers[e.pointerId];
}
function _addPointerDocListener() {
  if (!_pointerDocListener) {
    document.addEventListener(POINTER_DOWN, _globalPointerDown, true);
    document.addEventListener(POINTER_MOVE, _globalPointerMove, true);
    document.addEventListener(POINTER_UP, _globalPointerUp, true);
    document.addEventListener(POINTER_CANCEL, _globalPointerUp, true);
    _pointerDocListener = true;
  }
}
function _handlePointer(handler4, e) {
  if (e.pointerType === (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
    return;
  }
  e.touches = [];
  for (var i in _pointers) {
    e.touches.push(_pointers[i]);
  }
  e.changedTouches = [e];
  handler4(e);
}
function _onPointerStart(handler4, e) {
  if (e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH) {
    preventDefault(e);
  }
  _handlePointer(handler4, e);
}
function makeDblclick(event) {
  var newEvent = {}, prop, i;
  for (i in event) {
    prop = event[i];
    newEvent[i] = prop && prop.bind ? prop.bind(event) : prop;
  }
  event = newEvent;
  newEvent.type = "dblclick";
  newEvent.detail = 2;
  newEvent.isTrusted = false;
  newEvent._simulated = true;
  return newEvent;
}
var delay = 200;
function addDoubleTapListener(obj, handler4) {
  obj.addEventListener("dblclick", handler4);
  var last = 0, detail;
  function simDblclick(e) {
    if (e.detail !== 1) {
      detail = e.detail;
      return;
    }
    if (e.pointerType === "mouse" || e.sourceCapabilities && !e.sourceCapabilities.firesTouchEvents) {
      return;
    }
    var path = getPropagationPath(e);
    if (path.some(function(el) {
      return el instanceof HTMLLabelElement && el.attributes.for;
    }) && !path.some(function(el) {
      return el instanceof HTMLInputElement || el instanceof HTMLSelectElement;
    })) {
      return;
    }
    var now = Date.now();
    if (now - last <= delay) {
      detail++;
      if (detail === 2) {
        handler4(makeDblclick(e));
      }
    } else {
      detail = 1;
    }
    last = now;
  }
  obj.addEventListener("click", simDblclick);
  return {
    dblclick: handler4,
    simDblclick
  };
}
function removeDoubleTapListener(obj, handlers) {
  obj.removeEventListener("dblclick", handlers.dblclick);
  obj.removeEventListener("click", handlers.simDblclick);
}
var TRANSFORM = testProp(
  ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
);
var TRANSITION = testProp(
  ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
);
var TRANSITION_END = TRANSITION === "webkitTransition" || TRANSITION === "OTransition" ? TRANSITION + "End" : "transitionend";
function get3(id) {
  return typeof id === "string" ? document.getElementById(id) : id;
}
function getStyle(el, style2) {
  var value = el.style[style2] || el.currentStyle && el.currentStyle[style2];
  if ((!value || value === "auto") && document.defaultView) {
    var css = document.defaultView.getComputedStyle(el, null);
    value = css ? css[style2] : null;
  }
  return value === "auto" ? null : value;
}
function create$1(tagName, className, container) {
  var el = document.createElement(tagName);
  el.className = className || "";
  if (container) {
    container.appendChild(el);
  }
  return el;
}
function remove(el) {
  var parent = el.parentNode;
  if (parent) {
    parent.removeChild(el);
  }
}
function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
function toFront(el) {
  var parent = el.parentNode;
  if (parent && parent.lastChild !== el) {
    parent.appendChild(el);
  }
}
function toBack(el) {
  var parent = el.parentNode;
  if (parent && parent.firstChild !== el) {
    parent.insertBefore(el, parent.firstChild);
  }
}
function hasClass(el, name) {
  if (el.classList !== void 0) {
    return el.classList.contains(name);
  }
  var className = getClass(el);
  return className.length > 0 && new RegExp("(^|\\s)" + name + "(\\s|$)").test(className);
}
function addClass(el, name) {
  if (el.classList !== void 0) {
    var classes = splitWords(name);
    for (var i = 0, len = classes.length; i < len; i++) {
      el.classList.add(classes[i]);
    }
  } else if (!hasClass(el, name)) {
    var className = getClass(el);
    setClass(el, (className ? className + " " : "") + name);
  }
}
function removeClass(el, name) {
  if (el.classList !== void 0) {
    el.classList.remove(name);
  } else {
    setClass(el, trim((" " + getClass(el) + " ").replace(" " + name + " ", " ")));
  }
}
function setClass(el, name) {
  if (el.className.baseVal === void 0) {
    el.className = name;
  } else {
    el.className.baseVal = name;
  }
}
function getClass(el) {
  if (el.correspondingElement) {
    el = el.correspondingElement;
  }
  return el.className.baseVal === void 0 ? el.className : el.className.baseVal;
}
function setOpacity(el, value) {
  if ("opacity" in el.style) {
    el.style.opacity = value;
  } else if ("filter" in el.style) {
    _setOpacityIE(el, value);
  }
}
function _setOpacityIE(el, value) {
  var filter = false, filterName = "DXImageTransform.Microsoft.Alpha";
  try {
    filter = el.filters.item(filterName);
  } catch (e) {
    if (value === 1) {
      return;
    }
  }
  value = Math.round(value * 100);
  if (filter) {
    filter.Enabled = value !== 100;
    filter.Opacity = value;
  } else {
    el.style.filter += " progid:" + filterName + "(opacity=" + value + ")";
  }
}
function testProp(props) {
  var style2 = document.documentElement.style;
  for (var i = 0; i < props.length; i++) {
    if (props[i] in style2) {
      return props[i];
    }
  }
  return false;
}
function setTransform(el, offset, scale2) {
  var pos = offset || new Point(0, 0);
  el.style[TRANSFORM] = (Browser.ie3d ? "translate(" + pos.x + "px," + pos.y + "px)" : "translate3d(" + pos.x + "px," + pos.y + "px,0)") + (scale2 ? " scale(" + scale2 + ")" : "");
}
function setPosition(el, point) {
  el._leaflet_pos = point;
  if (Browser.any3d) {
    setTransform(el, point);
  } else {
    el.style.left = point.x + "px";
    el.style.top = point.y + "px";
  }
}
function getPosition(el) {
  return el._leaflet_pos || new Point(0, 0);
}
var disableTextSelection;
var enableTextSelection;
var _userSelect;
if ("onselectstart" in document) {
  disableTextSelection = function() {
    on2(window, "selectstart", preventDefault);
  };
  enableTextSelection = function() {
    off(window, "selectstart", preventDefault);
  };
} else {
  userSelectProperty = testProp(
    ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
  );
  disableTextSelection = function() {
    if (userSelectProperty) {
      var style2 = document.documentElement.style;
      _userSelect = style2[userSelectProperty];
      style2[userSelectProperty] = "none";
    }
  };
  enableTextSelection = function() {
    if (userSelectProperty) {
      document.documentElement.style[userSelectProperty] = _userSelect;
      _userSelect = void 0;
    }
  };
}
var userSelectProperty;
function disableImageDrag() {
  on2(window, "dragstart", preventDefault);
}
function enableImageDrag() {
  off(window, "dragstart", preventDefault);
}
var _outlineElement;
var _outlineStyle;
function preventOutline(element) {
  while (element.tabIndex === -1) {
    element = element.parentNode;
  }
  if (!element.style) {
    return;
  }
  restoreOutline();
  _outlineElement = element;
  _outlineStyle = element.style.outlineStyle;
  element.style.outlineStyle = "none";
  on2(window, "keydown", restoreOutline);
}
function restoreOutline() {
  if (!_outlineElement) {
    return;
  }
  _outlineElement.style.outlineStyle = _outlineStyle;
  _outlineElement = void 0;
  _outlineStyle = void 0;
  off(window, "keydown", restoreOutline);
}
function getSizedParentNode(element) {
  do {
    element = element.parentNode;
  } while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
  return element;
}
function getScale(element) {
  var rect = element.getBoundingClientRect();
  return {
    x: rect.width / element.offsetWidth || 1,
    y: rect.height / element.offsetHeight || 1,
    boundingClientRect: rect
  };
}
var DomUtil = {
  __proto__: null,
  TRANSFORM,
  TRANSITION,
  TRANSITION_END,
  get: get3,
  getStyle,
  create: create$1,
  remove,
  empty,
  toFront,
  toBack,
  hasClass,
  addClass,
  removeClass,
  setClass,
  getClass,
  setOpacity,
  testProp,
  setTransform,
  setPosition,
  getPosition,
  get disableTextSelection() {
    return disableTextSelection;
  },
  get enableTextSelection() {
    return enableTextSelection;
  },
  disableImageDrag,
  enableImageDrag,
  preventOutline,
  restoreOutline,
  getSizedParentNode,
  getScale
};
function on2(obj, types, fn, context) {
  if (types && typeof types === "object") {
    for (var type in types) {
      addOne(obj, type, types[type], fn);
    }
  } else {
    types = splitWords(types);
    for (var i = 0, len = types.length; i < len; i++) {
      addOne(obj, types[i], fn, context);
    }
  }
  return this;
}
var eventsKey = "_leaflet_events";
function off(obj, types, fn, context) {
  if (arguments.length === 1) {
    batchRemove(obj);
    delete obj[eventsKey];
  } else if (types && typeof types === "object") {
    for (var type in types) {
      removeOne(obj, type, types[type], fn);
    }
  } else {
    types = splitWords(types);
    if (arguments.length === 2) {
      batchRemove(obj, function(type2) {
        return indexOf(types, type2) !== -1;
      });
    } else {
      for (var i = 0, len = types.length; i < len; i++) {
        removeOne(obj, types[i], fn, context);
      }
    }
  }
  return this;
}
function batchRemove(obj, filterFn) {
  for (var id in obj[eventsKey]) {
    var type = id.split(/\d/)[0];
    if (!filterFn || filterFn(type)) {
      removeOne(obj, type, null, null, id);
    }
  }
}
var mouseSubst = {
  mouseenter: "mouseover",
  mouseleave: "mouseout",
  wheel: !("onwheel" in window) && "mousewheel"
};
function addOne(obj, type, fn, context) {
  var id = type + stamp(fn) + (context ? "_" + stamp(context) : "");
  if (obj[eventsKey] && obj[eventsKey][id]) {
    return this;
  }
  var handler4 = function(e) {
    return fn.call(context || obj, e || window.event);
  };
  var originalHandler = handler4;
  if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) {
    handler4 = addPointerListener(obj, type, handler4);
  } else if (Browser.touch && type === "dblclick") {
    handler4 = addDoubleTapListener(obj, handler4);
  } else if ("addEventListener" in obj) {
    if (type === "touchstart" || type === "touchmove" || type === "wheel" || type === "mousewheel") {
      obj.addEventListener(mouseSubst[type] || type, handler4, Browser.passiveEvents ? { passive: false } : false);
    } else if (type === "mouseenter" || type === "mouseleave") {
      handler4 = function(e) {
        e = e || window.event;
        if (isExternalTarget(obj, e)) {
          originalHandler(e);
        }
      };
      obj.addEventListener(mouseSubst[type], handler4, false);
    } else {
      obj.addEventListener(type, originalHandler, false);
    }
  } else {
    obj.attachEvent("on" + type, handler4);
  }
  obj[eventsKey] = obj[eventsKey] || {};
  obj[eventsKey][id] = handler4;
}
function removeOne(obj, type, fn, context, id) {
  id = id || type + stamp(fn) + (context ? "_" + stamp(context) : "");
  var handler4 = obj[eventsKey] && obj[eventsKey][id];
  if (!handler4) {
    return this;
  }
  if (!Browser.touchNative && Browser.pointer && type.indexOf("touch") === 0) {
    removePointerListener(obj, type, handler4);
  } else if (Browser.touch && type === "dblclick") {
    removeDoubleTapListener(obj, handler4);
  } else if ("removeEventListener" in obj) {
    obj.removeEventListener(mouseSubst[type] || type, handler4, false);
  } else {
    obj.detachEvent("on" + type, handler4);
  }
  obj[eventsKey][id] = null;
}
function stopPropagation(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  } else if (e.originalEvent) {
    e.originalEvent._stopped = true;
  } else {
    e.cancelBubble = true;
  }
  return this;
}
function disableScrollPropagation(el) {
  addOne(el, "wheel", stopPropagation);
  return this;
}
function disableClickPropagation(el) {
  on2(el, "mousedown touchstart dblclick contextmenu", stopPropagation);
  el["_leaflet_disable_click"] = true;
  return this;
}
function preventDefault(e) {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
  return this;
}
function stop2(e) {
  preventDefault(e);
  stopPropagation(e);
  return this;
}
function getPropagationPath(ev) {
  if (ev.composedPath) {
    return ev.composedPath();
  }
  var path = [];
  var el = ev.target;
  while (el) {
    path.push(el);
    el = el.parentNode;
  }
  return path;
}
function getMousePosition(e, container) {
  if (!container) {
    return new Point(e.clientX, e.clientY);
  }
  var scale2 = getScale(container), offset = scale2.boundingClientRect;
  return new Point(
    // offset.left/top values are in page scale (like clientX/Y),
    // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
    (e.clientX - offset.left) / scale2.x - container.clientLeft,
    (e.clientY - offset.top) / scale2.y - container.clientTop
  );
}
var wheelPxFactor = Browser.linux && Browser.chrome ? window.devicePixelRatio : Browser.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
function getWheelDelta(e) {
  return Browser.edge ? e.wheelDeltaY / 2 : (
    // Don't trust window-geometry-based delta
    e.deltaY && e.deltaMode === 0 ? -e.deltaY / wheelPxFactor : (
      // Pixels
      e.deltaY && e.deltaMode === 1 ? -e.deltaY * 20 : (
        // Lines
        e.deltaY && e.deltaMode === 2 ? -e.deltaY * 60 : (
          // Pages
          e.deltaX || e.deltaZ ? 0 : (
            // Skip horizontal/depth wheel events
            e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : (
              // Legacy IE pixels
              e.detail && Math.abs(e.detail) < 32765 ? -e.detail * 20 : (
                // Legacy Moz lines
                e.detail ? e.detail / -32765 * 60 : (
                  // Legacy Moz pages
                  0
                )
              )
            )
          )
        )
      )
    )
  );
}
function isExternalTarget(el, e) {
  var related = e.relatedTarget;
  if (!related) {
    return true;
  }
  try {
    while (related && related !== el) {
      related = related.parentNode;
    }
  } catch (err) {
    return false;
  }
  return related !== el;
}
var PosAnimation = Evented.extend({
  // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
  // Run an animation of a given element to a new position, optionally setting
  // duration in seconds (`0.25` by default) and easing linearity factor (3rd
  // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
  // `0.5` by default).
  run: function(el, newPos, duration, easeLinearity) {
    this.stop();
    this._el = el;
    this._inProgress = true;
    this._duration = duration || 0.25;
    this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);
    this._startPos = getPosition(el);
    this._offset = newPos.subtract(this._startPos);
    this._startTime = +/* @__PURE__ */ new Date();
    this.fire("start");
    this._animate();
  },
  // @method stop()
  // Stops the animation (if currently running).
  stop: function() {
    if (!this._inProgress) {
      return;
    }
    this._step(true);
    this._complete();
  },
  _animate: function() {
    this._animId = requestAnimFrame(this._animate, this);
    this._step();
  },
  _step: function(round) {
    var elapsed = +/* @__PURE__ */ new Date() - this._startTime, duration = this._duration * 1e3;
    if (elapsed < duration) {
      this._runFrame(this._easeOut(elapsed / duration), round);
    } else {
      this._runFrame(1);
      this._complete();
    }
  },
  _runFrame: function(progress, round) {
    var pos = this._startPos.add(this._offset.multiplyBy(progress));
    if (round) {
      pos._round();
    }
    setPosition(this._el, pos);
    this.fire("step");
  },
  _complete: function() {
    cancelAnimFrame(this._animId);
    this._inProgress = false;
    this.fire("end");
  },
  _easeOut: function(t) {
    return 1 - Math.pow(1 - t, this._easeOutPower);
  }
});
var Map2 = Evented.extend({
  options: {
    // @section Map State Options
    // @option crs: CRS = L.CRS.EPSG3857
    // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
    // sure what it means.
    crs: EPSG3857,
    // @option center: LatLng = undefined
    // Initial geographic center of the map
    center: void 0,
    // @option zoom: Number = undefined
    // Initial map zoom level
    zoom: void 0,
    // @option minZoom: Number = *
    // Minimum zoom level of the map.
    // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
    // the lowest of their `minZoom` options will be used instead.
    minZoom: void 0,
    // @option maxZoom: Number = *
    // Maximum zoom level of the map.
    // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
    // the highest of their `maxZoom` options will be used instead.
    maxZoom: void 0,
    // @option layers: Layer[] = []
    // Array of layers that will be added to the map initially
    layers: [],
    // @option maxBounds: LatLngBounds = null
    // When this option is set, the map restricts the view to the given
    // geographical bounds, bouncing the user back if the user tries to pan
    // outside the view. To set the restriction dynamically, use
    // [`setMaxBounds`](#map-setmaxbounds) method.
    maxBounds: void 0,
    // @option renderer: Renderer = *
    // The default method for drawing vector layers on the map. `L.SVG`
    // or `L.Canvas` by default depending on browser support.
    renderer: void 0,
    // @section Animation Options
    // @option zoomAnimation: Boolean = true
    // Whether the map zoom animation is enabled. By default it's enabled
    // in all browsers that support CSS3 Transitions except Android.
    zoomAnimation: true,
    // @option zoomAnimationThreshold: Number = 4
    // Won't animate zoom if the zoom difference exceeds this value.
    zoomAnimationThreshold: 4,
    // @option fadeAnimation: Boolean = true
    // Whether the tile fade animation is enabled. By default it's enabled
    // in all browsers that support CSS3 Transitions except Android.
    fadeAnimation: true,
    // @option markerZoomAnimation: Boolean = true
    // Whether markers animate their zoom with the zoom animation, if disabled
    // they will disappear for the length of the animation. By default it's
    // enabled in all browsers that support CSS3 Transitions except Android.
    markerZoomAnimation: true,
    // @option transform3DLimit: Number = 2^23
    // Defines the maximum size of a CSS translation transform. The default
    // value should not be changed unless a web browser positions layers in
    // the wrong place after doing a large `panBy`.
    transform3DLimit: 8388608,
    // Precision limit of a 32-bit float
    // @section Interaction Options
    // @option zoomSnap: Number = 1
    // Forces the map's zoom level to always be a multiple of this, particularly
    // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
    // By default, the zoom level snaps to the nearest integer; lower values
    // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
    // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
    zoomSnap: 1,
    // @option zoomDelta: Number = 1
    // Controls how much the map's zoom level will change after a
    // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
    // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
    // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
    zoomDelta: 1,
    // @option trackResize: Boolean = true
    // Whether the map automatically handles browser window resize to update itself.
    trackResize: true
  },
  initialize: function(id, options) {
    options = setOptions(this, options);
    this._handlers = [];
    this._layers = {};
    this._zoomBoundLayers = {};
    this._sizeChanged = true;
    this._initContainer(id);
    this._initLayout();
    this._onResize = bind3(this._onResize, this);
    this._initEvents();
    if (options.maxBounds) {
      this.setMaxBounds(options.maxBounds);
    }
    if (options.zoom !== void 0) {
      this._zoom = this._limitZoom(options.zoom);
    }
    if (options.center && options.zoom !== void 0) {
      this.setView(toLatLng(options.center), options.zoom, { reset: true });
    }
    this.callInitHooks();
    this._zoomAnimated = TRANSITION && Browser.any3d && !Browser.mobileOpera && this.options.zoomAnimation;
    if (this._zoomAnimated) {
      this._createAnimProxy();
      on2(this._proxy, TRANSITION_END, this._catchTransitionEnd, this);
    }
    this._addLayers(this.options.layers);
  },
  // @section Methods for modifying map state
  // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
  // Sets the view of the map (geographical center and zoom) with the given
  // animation options.
  setView: function(center, zoom2, options) {
    zoom2 = zoom2 === void 0 ? this._zoom : this._limitZoom(zoom2);
    center = this._limitCenter(toLatLng(center), zoom2, this.options.maxBounds);
    options = options || {};
    this._stop();
    if (this._loaded && !options.reset && options !== true) {
      if (options.animate !== void 0) {
        options.zoom = extend({ animate: options.animate }, options.zoom);
        options.pan = extend({ animate: options.animate, duration: options.duration }, options.pan);
      }
      var moved = this._zoom !== zoom2 ? this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom2, options.zoom) : this._tryAnimatedPan(center, options.pan);
      if (moved) {
        clearTimeout(this._sizeTimer);
        return this;
      }
    }
    this._resetView(center, zoom2, options.pan && options.pan.noMoveStart);
    return this;
  },
  // @method setZoom(zoom: Number, options?: Zoom/pan options): this
  // Sets the zoom of the map.
  setZoom: function(zoom2, options) {
    if (!this._loaded) {
      this._zoom = zoom2;
      return this;
    }
    return this.setView(this.getCenter(), zoom2, { zoom: options });
  },
  // @method zoomIn(delta?: Number, options?: Zoom options): this
  // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
  zoomIn: function(delta, options) {
    delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
    return this.setZoom(this._zoom + delta, options);
  },
  // @method zoomOut(delta?: Number, options?: Zoom options): this
  // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
  zoomOut: function(delta, options) {
    delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
    return this.setZoom(this._zoom - delta, options);
  },
  // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
  // Zooms the map while keeping a specified geographical point on the map
  // stationary (e.g. used internally for scroll zoom and double-click zoom).
  // @alternative
  // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
  // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
  setZoomAround: function(latlng, zoom2, options) {
    var scale2 = this.getZoomScale(zoom2), viewHalf = this.getSize().divideBy(2), containerPoint = latlng instanceof Point ? latlng : this.latLngToContainerPoint(latlng), centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale2), newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));
    return this.setView(newCenter, zoom2, { zoom: options });
  },
  _getBoundsCenterZoom: function(bounds, options) {
    options = options || {};
    bounds = bounds.getBounds ? bounds.getBounds() : toLatLngBounds(bounds);
    var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), zoom2 = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));
    zoom2 = typeof options.maxZoom === "number" ? Math.min(options.maxZoom, zoom2) : zoom2;
    if (zoom2 === Infinity) {
      return {
        center: bounds.getCenter(),
        zoom: zoom2
      };
    }
    var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2), swPoint = this.project(bounds.getSouthWest(), zoom2), nePoint = this.project(bounds.getNorthEast(), zoom2), center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom2);
    return {
      center,
      zoom: zoom2
    };
  },
  // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
  // Sets a map view that contains the given geographical bounds with the
  // maximum zoom level possible.
  fitBounds: function(bounds, options) {
    bounds = toLatLngBounds(bounds);
    if (!bounds.isValid()) {
      throw new Error("Bounds are not valid.");
    }
    var target = this._getBoundsCenterZoom(bounds, options);
    return this.setView(target.center, target.zoom, options);
  },
  // @method fitWorld(options?: fitBounds options): this
  // Sets a map view that mostly contains the whole world with the maximum
  // zoom level possible.
  fitWorld: function(options) {
    return this.fitBounds([[-90, -180], [90, 180]], options);
  },
  // @method panTo(latlng: LatLng, options?: Pan options): this
  // Pans the map to a given center.
  panTo: function(center, options) {
    return this.setView(center, this._zoom, { pan: options });
  },
  // @method panBy(offset: Point, options?: Pan options): this
  // Pans the map by a given number of pixels (animated).
  panBy: function(offset, options) {
    offset = toPoint(offset).round();
    options = options || {};
    if (!offset.x && !offset.y) {
      return this.fire("moveend");
    }
    if (options.animate !== true && !this.getSize().contains(offset)) {
      this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
      return this;
    }
    if (!this._panAnim) {
      this._panAnim = new PosAnimation();
      this._panAnim.on({
        "step": this._onPanTransitionStep,
        "end": this._onPanTransitionEnd
      }, this);
    }
    if (!options.noMoveStart) {
      this.fire("movestart");
    }
    if (options.animate !== false) {
      addClass(this._mapPane, "leaflet-pan-anim");
      var newPos = this._getMapPanePos().subtract(offset).round();
      this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
    } else {
      this._rawPanBy(offset);
      this.fire("move").fire("moveend");
    }
    return this;
  },
  // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
  // Sets the view of the map (geographical center and zoom) performing a smooth
  // pan-zoom animation.
  flyTo: function(targetCenter, targetZoom, options) {
    options = options || {};
    if (options.animate === false || !Browser.any3d) {
      return this.setView(targetCenter, targetZoom, options);
    }
    this._stop();
    var from = this.project(this.getCenter()), to = this.project(targetCenter), size2 = this.getSize(), startZoom = this._zoom;
    targetCenter = toLatLng(targetCenter);
    targetZoom = targetZoom === void 0 ? startZoom : targetZoom;
    var w0 = Math.max(size2.x, size2.y), w1 = w0 * this.getZoomScale(startZoom, targetZoom), u1 = to.distanceTo(from) || 1, rho = 1.42, rho2 = rho * rho;
    function r(i) {
      var s1 = i ? -1 : 1, s2 = i ? w1 : w0, t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1, b1 = 2 * s2 * rho2 * u1, b = t1 / b1, sq = Math.sqrt(b * b + 1) - b;
      var log = sq < 1e-9 ? -18 : Math.log(sq);
      return log;
    }
    function sinh(n) {
      return (Math.exp(n) - Math.exp(-n)) / 2;
    }
    function cosh(n) {
      return (Math.exp(n) + Math.exp(-n)) / 2;
    }
    function tanh(n) {
      return sinh(n) / cosh(n);
    }
    var r0 = r(0);
    function w(s) {
      return w0 * (cosh(r0) / cosh(r0 + rho * s));
    }
    function u(s) {
      return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2;
    }
    function easeOut(t) {
      return 1 - Math.pow(1 - t, 1.5);
    }
    var start2 = Date.now(), S = (r(1) - r0) / rho, duration = options.duration ? 1e3 * options.duration : 1e3 * S * 0.8;
    function frame() {
      var t = (Date.now() - start2) / duration, s = easeOut(t) * S;
      if (t <= 1) {
        this._flyToFrame = requestAnimFrame(frame, this);
        this._move(
          this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
          this.getScaleZoom(w0 / w(s), startZoom),
          { flyTo: true }
        );
      } else {
        this._move(targetCenter, targetZoom)._moveEnd(true);
      }
    }
    this._moveStart(true, options.noMoveStart);
    frame.call(this);
    return this;
  },
  // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
  // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
  // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
  flyToBounds: function(bounds, options) {
    var target = this._getBoundsCenterZoom(bounds, options);
    return this.flyTo(target.center, target.zoom, options);
  },
  // @method setMaxBounds(bounds: LatLngBounds): this
  // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
  setMaxBounds: function(bounds) {
    bounds = toLatLngBounds(bounds);
    if (this.listens("moveend", this._panInsideMaxBounds)) {
      this.off("moveend", this._panInsideMaxBounds);
    }
    if (!bounds.isValid()) {
      this.options.maxBounds = null;
      return this;
    }
    this.options.maxBounds = bounds;
    if (this._loaded) {
      this._panInsideMaxBounds();
    }
    return this.on("moveend", this._panInsideMaxBounds);
  },
  // @method setMinZoom(zoom: Number): this
  // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
  setMinZoom: function(zoom2) {
    var oldZoom = this.options.minZoom;
    this.options.minZoom = zoom2;
    if (this._loaded && oldZoom !== zoom2) {
      this.fire("zoomlevelschange");
      if (this.getZoom() < this.options.minZoom) {
        return this.setZoom(zoom2);
      }
    }
    return this;
  },
  // @method setMaxZoom(zoom: Number): this
  // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
  setMaxZoom: function(zoom2) {
    var oldZoom = this.options.maxZoom;
    this.options.maxZoom = zoom2;
    if (this._loaded && oldZoom !== zoom2) {
      this.fire("zoomlevelschange");
      if (this.getZoom() > this.options.maxZoom) {
        return this.setZoom(zoom2);
      }
    }
    return this;
  },
  // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
  // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
  panInsideBounds: function(bounds, options) {
    this._enforcingBounds = true;
    var center = this.getCenter(), newCenter = this._limitCenter(center, this._zoom, toLatLngBounds(bounds));
    if (!center.equals(newCenter)) {
      this.panTo(newCenter, options);
    }
    this._enforcingBounds = false;
    return this;
  },
  // @method panInside(latlng: LatLng, options?: padding options): this
  // Pans the map the minimum amount to make the `latlng` visible. Use
  // padding options to fit the display to more restricted bounds.
  // If `latlng` is already within the (optionally padded) display bounds,
  // the map will not be panned.
  panInside: function(latlng, options) {
    options = options || {};
    var paddingTL = toPoint(options.paddingTopLeft || options.padding || [0, 0]), paddingBR = toPoint(options.paddingBottomRight || options.padding || [0, 0]), pixelCenter = this.project(this.getCenter()), pixelPoint = this.project(latlng), pixelBounds = this.getPixelBounds(), paddedBounds = toBounds([pixelBounds.min.add(paddingTL), pixelBounds.max.subtract(paddingBR)]), paddedSize = paddedBounds.getSize();
    if (!paddedBounds.contains(pixelPoint)) {
      this._enforcingBounds = true;
      var centerOffset = pixelPoint.subtract(paddedBounds.getCenter());
      var offset = paddedBounds.extend(pixelPoint).getSize().subtract(paddedSize);
      pixelCenter.x += centerOffset.x < 0 ? -offset.x : offset.x;
      pixelCenter.y += centerOffset.y < 0 ? -offset.y : offset.y;
      this.panTo(this.unproject(pixelCenter), options);
      this._enforcingBounds = false;
    }
    return this;
  },
  // @method invalidateSize(options: Zoom/pan options): this
  // Checks if the map container size changed and updates the map if so —
  // call it after you've changed the map size dynamically, also animating
  // pan by default. If `options.pan` is `false`, panning will not occur.
  // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
  // that it doesn't happen often even if the method is called many
  // times in a row.
  // @alternative
  // @method invalidateSize(animate: Boolean): this
  // Checks if the map container size changed and updates the map if so —
  // call it after you've changed the map size dynamically, also animating
  // pan by default.
  invalidateSize: function(options) {
    if (!this._loaded) {
      return this;
    }
    options = extend({
      animate: false,
      pan: true
    }, options === true ? { animate: true } : options);
    var oldSize = this.getSize();
    this._sizeChanged = true;
    this._lastCenter = null;
    var newSize = this.getSize(), oldCenter = oldSize.divideBy(2).round(), newCenter = newSize.divideBy(2).round(), offset = oldCenter.subtract(newCenter);
    if (!offset.x && !offset.y) {
      return this;
    }
    if (options.animate && options.pan) {
      this.panBy(offset);
    } else {
      if (options.pan) {
        this._rawPanBy(offset);
      }
      this.fire("move");
      if (options.debounceMoveend) {
        clearTimeout(this._sizeTimer);
        this._sizeTimer = setTimeout(bind3(this.fire, this, "moveend"), 200);
      } else {
        this.fire("moveend");
      }
    }
    return this.fire("resize", {
      oldSize,
      newSize
    });
  },
  // @section Methods for modifying map state
  // @method stop(): this
  // Stops the currently running `panTo` or `flyTo` animation, if any.
  stop: function() {
    this.setZoom(this._limitZoom(this._zoom));
    if (!this.options.zoomSnap) {
      this.fire("viewreset");
    }
    return this._stop();
  },
  // @section Geolocation methods
  // @method locate(options?: Locate options): this
  // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
  // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
  // and optionally sets the map view to the user's location with respect to
  // detection accuracy (or to the world view if geolocation failed).
  // Note that, if your page doesn't use HTTPS, this method will fail in
  // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
  // See `Locate options` for more details.
  locate: function(options) {
    options = this._locateOptions = extend({
      timeout: 1e4,
      watch: false
      // setView: false
      // maxZoom: <Number>
      // maximumAge: 0
      // enableHighAccuracy: false
    }, options);
    if (!("geolocation" in navigator)) {
      this._handleGeolocationError({
        code: 0,
        message: "Geolocation not supported."
      });
      return this;
    }
    var onResponse = bind3(this._handleGeolocationResponse, this), onError = bind3(this._handleGeolocationError, this);
    if (options.watch) {
      this._locationWatchId = navigator.geolocation.watchPosition(onResponse, onError, options);
    } else {
      navigator.geolocation.getCurrentPosition(onResponse, onError, options);
    }
    return this;
  },
  // @method stopLocate(): this
  // Stops watching location previously initiated by `map.locate({watch: true})`
  // and aborts resetting the map view if map.locate was called with
  // `{setView: true}`.
  stopLocate: function() {
    if (navigator.geolocation && navigator.geolocation.clearWatch) {
      navigator.geolocation.clearWatch(this._locationWatchId);
    }
    if (this._locateOptions) {
      this._locateOptions.setView = false;
    }
    return this;
  },
  _handleGeolocationError: function(error2) {
    if (!this._container._leaflet_id) {
      return;
    }
    var c = error2.code, message = error2.message || (c === 1 ? "permission denied" : c === 2 ? "position unavailable" : "timeout");
    if (this._locateOptions.setView && !this._loaded) {
      this.fitWorld();
    }
    this.fire("locationerror", {
      code: c,
      message: "Geolocation error: " + message + "."
    });
  },
  _handleGeolocationResponse: function(pos) {
    if (!this._container._leaflet_id) {
      return;
    }
    var lat = pos.coords.latitude, lng = pos.coords.longitude, latlng = new LatLng(lat, lng), bounds = latlng.toBounds(pos.coords.accuracy * 2), options = this._locateOptions;
    if (options.setView) {
      var zoom2 = this.getBoundsZoom(bounds);
      this.setView(latlng, options.maxZoom ? Math.min(zoom2, options.maxZoom) : zoom2);
    }
    var data2 = {
      latlng,
      bounds,
      timestamp: pos.timestamp
    };
    for (var i in pos.coords) {
      if (typeof pos.coords[i] === "number") {
        data2[i] = pos.coords[i];
      }
    }
    this.fire("locationfound", data2);
  },
  // TODO Appropriate docs section?
  // @section Other Methods
  // @method addHandler(name: String, HandlerClass: Function): this
  // Adds a new `Handler` to the map, given its name and constructor function.
  addHandler: function(name, HandlerClass) {
    if (!HandlerClass) {
      return this;
    }
    var handler4 = this[name] = new HandlerClass(this);
    this._handlers.push(handler4);
    if (this.options[name]) {
      handler4.enable();
    }
    return this;
  },
  // @method remove(): this
  // Destroys the map and clears all related event listeners.
  remove: function() {
    this._initEvents(true);
    if (this.options.maxBounds) {
      this.off("moveend", this._panInsideMaxBounds);
    }
    if (this._containerId !== this._container._leaflet_id) {
      throw new Error("Map container is being reused by another instance");
    }
    try {
      delete this._container._leaflet_id;
      delete this._containerId;
    } catch (e) {
      this._container._leaflet_id = void 0;
      this._containerId = void 0;
    }
    if (this._locationWatchId !== void 0) {
      this.stopLocate();
    }
    this._stop();
    remove(this._mapPane);
    if (this._clearControlPos) {
      this._clearControlPos();
    }
    if (this._resizeRequest) {
      cancelAnimFrame(this._resizeRequest);
      this._resizeRequest = null;
    }
    this._clearHandlers();
    if (this._loaded) {
      this.fire("unload");
    }
    var i;
    for (i in this._layers) {
      this._layers[i].remove();
    }
    for (i in this._panes) {
      remove(this._panes[i]);
    }
    this._layers = [];
    this._panes = [];
    delete this._mapPane;
    delete this._renderer;
    return this;
  },
  // @section Other Methods
  // @method createPane(name: String, container?: HTMLElement): HTMLElement
  // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
  // then returns it. The pane is created as a child of `container`, or
  // as a child of the main map pane if not set.
  createPane: function(name, container) {
    var className = "leaflet-pane" + (name ? " leaflet-" + name.replace("Pane", "") + "-pane" : ""), pane = create$1("div", className, container || this._mapPane);
    if (name) {
      this._panes[name] = pane;
    }
    return pane;
  },
  // @section Methods for Getting Map State
  // @method getCenter(): LatLng
  // Returns the geographical center of the map view
  getCenter: function() {
    this._checkIfLoaded();
    if (this._lastCenter && !this._moved()) {
      return this._lastCenter.clone();
    }
    return this.layerPointToLatLng(this._getCenterLayerPoint());
  },
  // @method getZoom(): Number
  // Returns the current zoom level of the map view
  getZoom: function() {
    return this._zoom;
  },
  // @method getBounds(): LatLngBounds
  // Returns the geographical bounds visible in the current map view
  getBounds: function() {
    var bounds = this.getPixelBounds(), sw = this.unproject(bounds.getBottomLeft()), ne = this.unproject(bounds.getTopRight());
    return new LatLngBounds(sw, ne);
  },
  // @method getMinZoom(): Number
  // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
  getMinZoom: function() {
    return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
  },
  // @method getMaxZoom(): Number
  // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
  getMaxZoom: function() {
    return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? Infinity : this._layersMaxZoom : this.options.maxZoom;
  },
  // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
  // Returns the maximum zoom level on which the given bounds fit to the map
  // view in its entirety. If `inside` (optional) is set to `true`, the method
  // instead returns the minimum zoom level on which the map view fits into
  // the given bounds in its entirety.
  getBoundsZoom: function(bounds, inside, padding) {
    bounds = toLatLngBounds(bounds);
    padding = toPoint(padding || [0, 0]);
    var zoom2 = this.getZoom() || 0, min = this.getMinZoom(), max = this.getMaxZoom(), nw = bounds.getNorthWest(), se = bounds.getSouthEast(), size2 = this.getSize().subtract(padding), boundsSize = toBounds(this.project(se, zoom2), this.project(nw, zoom2)).getSize(), snap = Browser.any3d ? this.options.zoomSnap : 1, scalex = size2.x / boundsSize.x, scaley = size2.y / boundsSize.y, scale2 = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);
    zoom2 = this.getScaleZoom(scale2, zoom2);
    if (snap) {
      zoom2 = Math.round(zoom2 / (snap / 100)) * (snap / 100);
      zoom2 = inside ? Math.ceil(zoom2 / snap) * snap : Math.floor(zoom2 / snap) * snap;
    }
    return Math.max(min, Math.min(max, zoom2));
  },
  // @method getSize(): Point
  // Returns the current size of the map container (in pixels).
  getSize: function() {
    if (!this._size || this._sizeChanged) {
      this._size = new Point(
        this._container.clientWidth || 0,
        this._container.clientHeight || 0
      );
      this._sizeChanged = false;
    }
    return this._size.clone();
  },
  // @method getPixelBounds(): Bounds
  // Returns the bounds of the current map view in projected pixel
  // coordinates (sometimes useful in layer and overlay implementations).
  getPixelBounds: function(center, zoom2) {
    var topLeftPoint = this._getTopLeftPoint(center, zoom2);
    return new Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
  },
  // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
  // the map pane? "left point of the map layer" can be confusing, specially
  // since there can be negative offsets.
  // @method getPixelOrigin(): Point
  // Returns the projected pixel coordinates of the top left point of
  // the map layer (useful in custom layer and overlay implementations).
  getPixelOrigin: function() {
    this._checkIfLoaded();
    return this._pixelOrigin;
  },
  // @method getPixelWorldBounds(zoom?: Number): Bounds
  // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
  // If `zoom` is omitted, the map's current zoom level is used.
  getPixelWorldBounds: function(zoom2) {
    return this.options.crs.getProjectedBounds(zoom2 === void 0 ? this.getZoom() : zoom2);
  },
  // @section Other Methods
  // @method getPane(pane: String|HTMLElement): HTMLElement
  // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
  getPane: function(pane) {
    return typeof pane === "string" ? this._panes[pane] : pane;
  },
  // @method getPanes(): Object
  // Returns a plain object containing the names of all [panes](#map-pane) as keys and
  // the panes as values.
  getPanes: function() {
    return this._panes;
  },
  // @method getContainer: HTMLElement
  // Returns the HTML element that contains the map.
  getContainer: function() {
    return this._container;
  },
  // @section Conversion Methods
  // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
  // Returns the scale factor to be applied to a map transition from zoom level
  // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
  getZoomScale: function(toZoom, fromZoom) {
    var crs = this.options.crs;
    fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
    return crs.scale(toZoom) / crs.scale(fromZoom);
  },
  // @method getScaleZoom(scale: Number, fromZoom: Number): Number
  // Returns the zoom level that the map would end up at, if it is at `fromZoom`
  // level and everything is scaled by a factor of `scale`. Inverse of
  // [`getZoomScale`](#map-getZoomScale).
  getScaleZoom: function(scale2, fromZoom) {
    var crs = this.options.crs;
    fromZoom = fromZoom === void 0 ? this._zoom : fromZoom;
    var zoom2 = crs.zoom(scale2 * crs.scale(fromZoom));
    return isNaN(zoom2) ? Infinity : zoom2;
  },
  // @method project(latlng: LatLng, zoom: Number): Point
  // Projects a geographical coordinate `LatLng` according to the projection
  // of the map's CRS, then scales it according to `zoom` and the CRS's
  // `Transformation`. The result is pixel coordinate relative to
  // the CRS origin.
  project: function(latlng, zoom2) {
    zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
    return this.options.crs.latLngToPoint(toLatLng(latlng), zoom2);
  },
  // @method unproject(point: Point, zoom: Number): LatLng
  // Inverse of [`project`](#map-project).
  unproject: function(point, zoom2) {
    zoom2 = zoom2 === void 0 ? this._zoom : zoom2;
    return this.options.crs.pointToLatLng(toPoint(point), zoom2);
  },
  // @method layerPointToLatLng(point: Point): LatLng
  // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
  // returns the corresponding geographical coordinate (for the current zoom level).
  layerPointToLatLng: function(point) {
    var projectedPoint = toPoint(point).add(this.getPixelOrigin());
    return this.unproject(projectedPoint);
  },
  // @method latLngToLayerPoint(latlng: LatLng): Point
  // Given a geographical coordinate, returns the corresponding pixel coordinate
  // relative to the [origin pixel](#map-getpixelorigin).
  latLngToLayerPoint: function(latlng) {
    var projectedPoint = this.project(toLatLng(latlng))._round();
    return projectedPoint._subtract(this.getPixelOrigin());
  },
  // @method wrapLatLng(latlng: LatLng): LatLng
  // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
  // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
  // CRS's bounds.
  // By default this means longitude is wrapped around the dateline so its
  // value is between -180 and +180 degrees.
  wrapLatLng: function(latlng) {
    return this.options.crs.wrapLatLng(toLatLng(latlng));
  },
  // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
  // Returns a `LatLngBounds` with the same size as the given one, ensuring that
  // its center is within the CRS's bounds.
  // By default this means the center longitude is wrapped around the dateline so its
  // value is between -180 and +180 degrees, and the majority of the bounds
  // overlaps the CRS's bounds.
  wrapLatLngBounds: function(latlng) {
    return this.options.crs.wrapLatLngBounds(toLatLngBounds(latlng));
  },
  // @method distance(latlng1: LatLng, latlng2: LatLng): Number
  // Returns the distance between two geographical coordinates according to
  // the map's CRS. By default this measures distance in meters.
  distance: function(latlng1, latlng2) {
    return this.options.crs.distance(toLatLng(latlng1), toLatLng(latlng2));
  },
  // @method containerPointToLayerPoint(point: Point): Point
  // Given a pixel coordinate relative to the map container, returns the corresponding
  // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
  containerPointToLayerPoint: function(point) {
    return toPoint(point).subtract(this._getMapPanePos());
  },
  // @method layerPointToContainerPoint(point: Point): Point
  // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
  // returns the corresponding pixel coordinate relative to the map container.
  layerPointToContainerPoint: function(point) {
    return toPoint(point).add(this._getMapPanePos());
  },
  // @method containerPointToLatLng(point: Point): LatLng
  // Given a pixel coordinate relative to the map container, returns
  // the corresponding geographical coordinate (for the current zoom level).
  containerPointToLatLng: function(point) {
    var layerPoint = this.containerPointToLayerPoint(toPoint(point));
    return this.layerPointToLatLng(layerPoint);
  },
  // @method latLngToContainerPoint(latlng: LatLng): Point
  // Given a geographical coordinate, returns the corresponding pixel coordinate
  // relative to the map container.
  latLngToContainerPoint: function(latlng) {
    return this.layerPointToContainerPoint(this.latLngToLayerPoint(toLatLng(latlng)));
  },
  // @method mouseEventToContainerPoint(ev: MouseEvent): Point
  // Given a MouseEvent object, returns the pixel coordinate relative to the
  // map container where the event took place.
  mouseEventToContainerPoint: function(e) {
    return getMousePosition(e, this._container);
  },
  // @method mouseEventToLayerPoint(ev: MouseEvent): Point
  // Given a MouseEvent object, returns the pixel coordinate relative to
  // the [origin pixel](#map-getpixelorigin) where the event took place.
  mouseEventToLayerPoint: function(e) {
    return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
  },
  // @method mouseEventToLatLng(ev: MouseEvent): LatLng
  // Given a MouseEvent object, returns geographical coordinate where the
  // event took place.
  mouseEventToLatLng: function(e) {
    return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
  },
  // map initialization methods
  _initContainer: function(id) {
    var container = this._container = get3(id);
    if (!container) {
      throw new Error("Map container not found.");
    } else if (container._leaflet_id) {
      throw new Error("Map container is already initialized.");
    }
    on2(container, "scroll", this._onScroll, this);
    this._containerId = stamp(container);
  },
  _initLayout: function() {
    var container = this._container;
    this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;
    addClass(container, "leaflet-container" + (Browser.touch ? " leaflet-touch" : "") + (Browser.retina ? " leaflet-retina" : "") + (Browser.ielt9 ? " leaflet-oldie" : "") + (Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
    var position = getStyle(container, "position");
    if (position !== "absolute" && position !== "relative" && position !== "fixed" && position !== "sticky") {
      container.style.position = "relative";
    }
    this._initPanes();
    if (this._initControlPos) {
      this._initControlPos();
    }
  },
  _initPanes: function() {
    var panes = this._panes = {};
    this._paneRenderers = {};
    this._mapPane = this.createPane("mapPane", this._container);
    setPosition(this._mapPane, new Point(0, 0));
    this.createPane("tilePane");
    this.createPane("overlayPane");
    this.createPane("shadowPane");
    this.createPane("markerPane");
    this.createPane("tooltipPane");
    this.createPane("popupPane");
    if (!this.options.markerZoomAnimation) {
      addClass(panes.markerPane, "leaflet-zoom-hide");
      addClass(panes.shadowPane, "leaflet-zoom-hide");
    }
  },
  // private methods that modify map state
  // @section Map state change events
  _resetView: function(center, zoom2, noMoveStart) {
    setPosition(this._mapPane, new Point(0, 0));
    var loading = !this._loaded;
    this._loaded = true;
    zoom2 = this._limitZoom(zoom2);
    this.fire("viewprereset");
    var zoomChanged = this._zoom !== zoom2;
    this._moveStart(zoomChanged, noMoveStart)._move(center, zoom2)._moveEnd(zoomChanged);
    this.fire("viewreset");
    if (loading) {
      this.fire("load");
    }
  },
  _moveStart: function(zoomChanged, noMoveStart) {
    if (zoomChanged) {
      this.fire("zoomstart");
    }
    if (!noMoveStart) {
      this.fire("movestart");
    }
    return this;
  },
  _move: function(center, zoom2, data2, supressEvent) {
    if (zoom2 === void 0) {
      zoom2 = this._zoom;
    }
    var zoomChanged = this._zoom !== zoom2;
    this._zoom = zoom2;
    this._lastCenter = center;
    this._pixelOrigin = this._getNewPixelOrigin(center);
    if (!supressEvent) {
      if (zoomChanged || data2 && data2.pinch) {
        this.fire("zoom", data2);
      }
      this.fire("move", data2);
    } else if (data2 && data2.pinch) {
      this.fire("zoom", data2);
    }
    return this;
  },
  _moveEnd: function(zoomChanged) {
    if (zoomChanged) {
      this.fire("zoomend");
    }
    return this.fire("moveend");
  },
  _stop: function() {
    cancelAnimFrame(this._flyToFrame);
    if (this._panAnim) {
      this._panAnim.stop();
    }
    return this;
  },
  _rawPanBy: function(offset) {
    setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
  },
  _getZoomSpan: function() {
    return this.getMaxZoom() - this.getMinZoom();
  },
  _panInsideMaxBounds: function() {
    if (!this._enforcingBounds) {
      this.panInsideBounds(this.options.maxBounds);
    }
  },
  _checkIfLoaded: function() {
    if (!this._loaded) {
      throw new Error("Set map center and zoom first.");
    }
  },
  // DOM event handling
  // @section Interaction events
  _initEvents: function(remove2) {
    this._targets = {};
    this._targets[stamp(this._container)] = this;
    var onOff = remove2 ? off : on2;
    onOff(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this);
    if (this.options.trackResize) {
      onOff(window, "resize", this._onResize, this);
    }
    if (Browser.any3d && this.options.transform3DLimit) {
      (remove2 ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
    }
  },
  _onResize: function() {
    cancelAnimFrame(this._resizeRequest);
    this._resizeRequest = requestAnimFrame(
      function() {
        this.invalidateSize({ debounceMoveend: true });
      },
      this
    );
  },
  _onScroll: function() {
    this._container.scrollTop = 0;
    this._container.scrollLeft = 0;
  },
  _onMoveEnd: function() {
    var pos = this._getMapPanePos();
    if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
      this._resetView(this.getCenter(), this.getZoom());
    }
  },
  _findEventTargets: function(e, type) {
    var targets = [], target, isHover = type === "mouseout" || type === "mouseover", src = e.target || e.srcElement, dragging = false;
    while (src) {
      target = this._targets[stamp(src)];
      if (target && (type === "click" || type === "preclick") && this._draggableMoved(target)) {
        dragging = true;
        break;
      }
      if (target && target.listens(type, true)) {
        if (isHover && !isExternalTarget(src, e)) {
          break;
        }
        targets.push(target);
        if (isHover) {
          break;
        }
      }
      if (src === this._container) {
        break;
      }
      src = src.parentNode;
    }
    if (!targets.length && !dragging && !isHover && this.listens(type, true)) {
      targets = [this];
    }
    return targets;
  },
  _isClickDisabled: function(el) {
    while (el && el !== this._container) {
      if (el["_leaflet_disable_click"]) {
        return true;
      }
      el = el.parentNode;
    }
  },
  _handleDOMEvent: function(e) {
    var el = e.target || e.srcElement;
    if (!this._loaded || el["_leaflet_disable_events"] || e.type === "click" && this._isClickDisabled(el)) {
      return;
    }
    var type = e.type;
    if (type === "mousedown") {
      preventOutline(el);
    }
    this._fireDOMEvent(e, type);
  },
  _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
  _fireDOMEvent: function(e, type, canvasTargets) {
    if (e.type === "click") {
      var synth = extend({}, e);
      synth.type = "preclick";
      this._fireDOMEvent(synth, synth.type, canvasTargets);
    }
    var targets = this._findEventTargets(e, type);
    if (canvasTargets) {
      var filtered = [];
      for (var i = 0; i < canvasTargets.length; i++) {
        if (canvasTargets[i].listens(type, true)) {
          filtered.push(canvasTargets[i]);
        }
      }
      targets = filtered.concat(targets);
    }
    if (!targets.length) {
      return;
    }
    if (type === "contextmenu") {
      preventDefault(e);
    }
    var target = targets[0];
    var data2 = {
      originalEvent: e
    };
    if (e.type !== "keypress" && e.type !== "keydown" && e.type !== "keyup") {
      var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
      data2.containerPoint = isMarker ? this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
      data2.layerPoint = this.containerPointToLayerPoint(data2.containerPoint);
      data2.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data2.layerPoint);
    }
    for (i = 0; i < targets.length; i++) {
      targets[i].fire(type, data2, true);
      if (data2.originalEvent._stopped || targets[i].options.bubblingMouseEvents === false && indexOf(this._mouseEvents, type) !== -1) {
        return;
      }
    }
  },
  _draggableMoved: function(obj) {
    obj = obj.dragging && obj.dragging.enabled() ? obj : this;
    return obj.dragging && obj.dragging.moved() || this.boxZoom && this.boxZoom.moved();
  },
  _clearHandlers: function() {
    for (var i = 0, len = this._handlers.length; i < len; i++) {
      this._handlers[i].disable();
    }
  },
  // @section Other Methods
  // @method whenReady(fn: Function, context?: Object): this
  // Runs the given function `fn` when the map gets initialized with
  // a view (center and zoom) and at least one layer, or immediately
  // if it's already initialized, optionally passing a function context.
  whenReady: function(callback, context) {
    if (this._loaded) {
      callback.call(context || this, { target: this });
    } else {
      this.on("load", callback, context);
    }
    return this;
  },
  // private methods for getting map state
  _getMapPanePos: function() {
    return getPosition(this._mapPane) || new Point(0, 0);
  },
  _moved: function() {
    var pos = this._getMapPanePos();
    return pos && !pos.equals([0, 0]);
  },
  _getTopLeftPoint: function(center, zoom2) {
    var pixelOrigin = center && zoom2 !== void 0 ? this._getNewPixelOrigin(center, zoom2) : this.getPixelOrigin();
    return pixelOrigin.subtract(this._getMapPanePos());
  },
  _getNewPixelOrigin: function(center, zoom2) {
    var viewHalf = this.getSize()._divideBy(2);
    return this.project(center, zoom2)._subtract(viewHalf)._add(this._getMapPanePos())._round();
  },
  _latLngToNewLayerPoint: function(latlng, zoom2, center) {
    var topLeft = this._getNewPixelOrigin(center, zoom2);
    return this.project(latlng, zoom2)._subtract(topLeft);
  },
  _latLngBoundsToNewLayerBounds: function(latLngBounds, zoom2, center) {
    var topLeft = this._getNewPixelOrigin(center, zoom2);
    return toBounds([
      this.project(latLngBounds.getSouthWest(), zoom2)._subtract(topLeft),
      this.project(latLngBounds.getNorthWest(), zoom2)._subtract(topLeft),
      this.project(latLngBounds.getSouthEast(), zoom2)._subtract(topLeft),
      this.project(latLngBounds.getNorthEast(), zoom2)._subtract(topLeft)
    ]);
  },
  // layer point of the current center
  _getCenterLayerPoint: function() {
    return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
  },
  // offset of the specified place to the current center in pixels
  _getCenterOffset: function(latlng) {
    return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
  },
  // adjust center for view to get inside bounds
  _limitCenter: function(center, zoom2, bounds) {
    if (!bounds) {
      return center;
    }
    var centerPoint = this.project(center, zoom2), viewHalf = this.getSize().divideBy(2), viewBounds = new Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)), offset = this._getBoundsOffset(viewBounds, bounds, zoom2);
    if (Math.abs(offset.x) <= 1 && Math.abs(offset.y) <= 1) {
      return center;
    }
    return this.unproject(centerPoint.add(offset), zoom2);
  },
  // adjust offset for view to get inside bounds
  _limitOffset: function(offset, bounds) {
    if (!bounds) {
      return offset;
    }
    var viewBounds = this.getPixelBounds(), newBounds = new Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));
    return offset.add(this._getBoundsOffset(newBounds, bounds));
  },
  // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
  _getBoundsOffset: function(pxBounds, maxBounds, zoom2) {
    var projectedMaxBounds = toBounds(
      this.project(maxBounds.getNorthEast(), zoom2),
      this.project(maxBounds.getSouthWest(), zoom2)
    ), minOffset = projectedMaxBounds.min.subtract(pxBounds.min), maxOffset = projectedMaxBounds.max.subtract(pxBounds.max), dx = this._rebound(minOffset.x, -maxOffset.x), dy = this._rebound(minOffset.y, -maxOffset.y);
    return new Point(dx, dy);
  },
  _rebound: function(left, right) {
    return left + right > 0 ? Math.round(left - right) / 2 : Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
  },
  _limitZoom: function(zoom2) {
    var min = this.getMinZoom(), max = this.getMaxZoom(), snap = Browser.any3d ? this.options.zoomSnap : 1;
    if (snap) {
      zoom2 = Math.round(zoom2 / snap) * snap;
    }
    return Math.max(min, Math.min(max, zoom2));
  },
  _onPanTransitionStep: function() {
    this.fire("move");
  },
  _onPanTransitionEnd: function() {
    removeClass(this._mapPane, "leaflet-pan-anim");
    this.fire("moveend");
  },
  _tryAnimatedPan: function(center, options) {
    var offset = this._getCenterOffset(center)._trunc();
    if ((options && options.animate) !== true && !this.getSize().contains(offset)) {
      return false;
    }
    this.panBy(offset, options);
    return true;
  },
  _createAnimProxy: function() {
    var proxy = this._proxy = create$1("div", "leaflet-proxy leaflet-zoom-animated");
    this._panes.mapPane.appendChild(proxy);
    this.on("zoomanim", function(e) {
      var prop = TRANSFORM, transform = this._proxy.style[prop];
      setTransform(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));
      if (transform === this._proxy.style[prop] && this._animatingZoom) {
        this._onZoomTransitionEnd();
      }
    }, this);
    this.on("load moveend", this._animMoveEnd, this);
    this._on("unload", this._destroyAnimProxy, this);
  },
  _destroyAnimProxy: function() {
    remove(this._proxy);
    this.off("load moveend", this._animMoveEnd, this);
    delete this._proxy;
  },
  _animMoveEnd: function() {
    var c = this.getCenter(), z = this.getZoom();
    setTransform(this._proxy, this.project(c, z), this.getZoomScale(z, 1));
  },
  _catchTransitionEnd: function(e) {
    if (this._animatingZoom && e.propertyName.indexOf("transform") >= 0) {
      this._onZoomTransitionEnd();
    }
  },
  _nothingToAnimate: function() {
    return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
  },
  _tryAnimatedZoom: function(center, zoom2, options) {
    if (this._animatingZoom) {
      return true;
    }
    options = options || {};
    if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() || Math.abs(zoom2 - this._zoom) > this.options.zoomAnimationThreshold) {
      return false;
    }
    var scale2 = this.getZoomScale(zoom2), offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale2);
    if (options.animate !== true && !this.getSize().contains(offset)) {
      return false;
    }
    requestAnimFrame(function() {
      this._moveStart(true, options.noMoveStart || false)._animateZoom(center, zoom2, true);
    }, this);
    return true;
  },
  _animateZoom: function(center, zoom2, startAnim, noUpdate) {
    if (!this._mapPane) {
      return;
    }
    if (startAnim) {
      this._animatingZoom = true;
      this._animateToCenter = center;
      this._animateToZoom = zoom2;
      addClass(this._mapPane, "leaflet-zoom-anim");
    }
    this.fire("zoomanim", {
      center,
      zoom: zoom2,
      noUpdate
    });
    if (!this._tempFireZoomEvent) {
      this._tempFireZoomEvent = this._zoom !== this._animateToZoom;
    }
    this._move(this._animateToCenter, this._animateToZoom, void 0, true);
    setTimeout(bind3(this._onZoomTransitionEnd, this), 250);
  },
  _onZoomTransitionEnd: function() {
    if (!this._animatingZoom) {
      return;
    }
    if (this._mapPane) {
      removeClass(this._mapPane, "leaflet-zoom-anim");
    }
    this._animatingZoom = false;
    this._move(this._animateToCenter, this._animateToZoom, void 0, true);
    if (this._tempFireZoomEvent) {
      this.fire("zoom");
    }
    delete this._tempFireZoomEvent;
    this.fire("move");
    this._moveEnd(true);
  }
});
function createMap(id, options) {
  return new Map2(id, options);
}
var Control = Class.extend({
  // @section
  // @aka Control Options
  options: {
    // @option position: String = 'topright'
    // The position of the control (one of the map corners). Possible values are `'topleft'`,
    // `'topright'`, `'bottomleft'` or `'bottomright'`
    position: "topright"
  },
  initialize: function(options) {
    setOptions(this, options);
  },
  /* @section
   * Classes extending L.Control will inherit the following methods:
   *
   * @method getPosition: string
   * Returns the position of the control.
   */
  getPosition: function() {
    return this.options.position;
  },
  // @method setPosition(position: string): this
  // Sets the position of the control.
  setPosition: function(position) {
    var map = this._map;
    if (map) {
      map.removeControl(this);
    }
    this.options.position = position;
    if (map) {
      map.addControl(this);
    }
    return this;
  },
  // @method getContainer: HTMLElement
  // Returns the HTMLElement that contains the control.
  getContainer: function() {
    return this._container;
  },
  // @method addTo(map: Map): this
  // Adds the control to the given map.
  addTo: function(map) {
    this.remove();
    this._map = map;
    var container = this._container = this.onAdd(map), pos = this.getPosition(), corner = map._controlCorners[pos];
    addClass(container, "leaflet-control");
    if (pos.indexOf("bottom") !== -1) {
      corner.insertBefore(container, corner.firstChild);
    } else {
      corner.appendChild(container);
    }
    this._map.on("unload", this.remove, this);
    return this;
  },
  // @method remove: this
  // Removes the control from the map it is currently active on.
  remove: function() {
    if (!this._map) {
      return this;
    }
    remove(this._container);
    if (this.onRemove) {
      this.onRemove(this._map);
    }
    this._map.off("unload", this.remove, this);
    this._map = null;
    return this;
  },
  _refocusOnMap: function(e) {
    if (this._map && e && e.screenX > 0 && e.screenY > 0) {
      this._map.getContainer().focus();
    }
  }
});
var control = function(options) {
  return new Control(options);
};
Map2.include({
  // @method addControl(control: Control): this
  // Adds the given control to the map
  addControl: function(control2) {
    control2.addTo(this);
    return this;
  },
  // @method removeControl(control: Control): this
  // Removes the given control from the map
  removeControl: function(control2) {
    control2.remove();
    return this;
  },
  _initControlPos: function() {
    var corners = this._controlCorners = {}, l = "leaflet-", container = this._controlContainer = create$1("div", l + "control-container", this._container);
    function createCorner(vSide, hSide) {
      var className = l + vSide + " " + l + hSide;
      corners[vSide + hSide] = create$1("div", className, container);
    }
    createCorner("top", "left");
    createCorner("top", "right");
    createCorner("bottom", "left");
    createCorner("bottom", "right");
  },
  _clearControlPos: function() {
    for (var i in this._controlCorners) {
      remove(this._controlCorners[i]);
    }
    remove(this._controlContainer);
    delete this._controlCorners;
    delete this._controlContainer;
  }
});
var Layers = Control.extend({
  // @section
  // @aka Control.Layers options
  options: {
    // @option collapsed: Boolean = true
    // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
    collapsed: true,
    position: "topright",
    // @option autoZIndex: Boolean = true
    // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
    autoZIndex: true,
    // @option hideSingleBase: Boolean = false
    // If `true`, the base layers in the control will be hidden when there is only one.
    hideSingleBase: false,
    // @option sortLayers: Boolean = false
    // Whether to sort the layers. When `false`, layers will keep the order
    // in which they were added to the control.
    sortLayers: false,
    // @option sortFunction: Function = *
    // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
    // that will be used for sorting the layers, when `sortLayers` is `true`.
    // The function receives both the `L.Layer` instances and their names, as in
    // `sortFunction(layerA, layerB, nameA, nameB)`.
    // By default, it sorts layers alphabetically by their name.
    sortFunction: function(layerA, layerB, nameA, nameB) {
      return nameA < nameB ? -1 : nameB < nameA ? 1 : 0;
    }
  },
  initialize: function(baseLayers, overlays, options) {
    setOptions(this, options);
    this._layerControlInputs = [];
    this._layers = [];
    this._lastZIndex = 0;
    this._handlingClick = false;
    this._preventClick = false;
    for (var i in baseLayers) {
      this._addLayer(baseLayers[i], i);
    }
    for (i in overlays) {
      this._addLayer(overlays[i], i, true);
    }
  },
  onAdd: function(map) {
    this._initLayout();
    this._update();
    this._map = map;
    map.on("zoomend", this._checkDisabledLayers, this);
    for (var i = 0; i < this._layers.length; i++) {
      this._layers[i].layer.on("add remove", this._onLayerChange, this);
    }
    return this._container;
  },
  addTo: function(map) {
    Control.prototype.addTo.call(this, map);
    return this._expandIfNotCollapsed();
  },
  onRemove: function() {
    this._map.off("zoomend", this._checkDisabledLayers, this);
    for (var i = 0; i < this._layers.length; i++) {
      this._layers[i].layer.off("add remove", this._onLayerChange, this);
    }
  },
  // @method addBaseLayer(layer: Layer, name: String): this
  // Adds a base layer (radio button entry) with the given name to the control.
  addBaseLayer: function(layer, name) {
    this._addLayer(layer, name);
    return this._map ? this._update() : this;
  },
  // @method addOverlay(layer: Layer, name: String): this
  // Adds an overlay (checkbox entry) with the given name to the control.
  addOverlay: function(layer, name) {
    this._addLayer(layer, name, true);
    return this._map ? this._update() : this;
  },
  // @method removeLayer(layer: Layer): this
  // Remove the given layer from the control.
  removeLayer: function(layer) {
    layer.off("add remove", this._onLayerChange, this);
    var obj = this._getLayer(stamp(layer));
    if (obj) {
      this._layers.splice(this._layers.indexOf(obj), 1);
    }
    return this._map ? this._update() : this;
  },
  // @method expand(): this
  // Expand the control container if collapsed.
  expand: function() {
    addClass(this._container, "leaflet-control-layers-expanded");
    this._section.style.height = null;
    var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
    if (acceptableHeight < this._section.clientHeight) {
      addClass(this._section, "leaflet-control-layers-scrollbar");
      this._section.style.height = acceptableHeight + "px";
    } else {
      removeClass(this._section, "leaflet-control-layers-scrollbar");
    }
    this._checkDisabledLayers();
    return this;
  },
  // @method collapse(): this
  // Collapse the control container if expanded.
  collapse: function() {
    removeClass(this._container, "leaflet-control-layers-expanded");
    return this;
  },
  _initLayout: function() {
    var className = "leaflet-control-layers", container = this._container = create$1("div", className), collapsed = this.options.collapsed;
    container.setAttribute("aria-haspopup", true);
    disableClickPropagation(container);
    disableScrollPropagation(container);
    var section = this._section = create$1("section", className + "-list");
    if (collapsed) {
      this._map.on("click", this.collapse, this);
      on2(container, {
        mouseenter: this._expandSafely,
        mouseleave: this.collapse
      }, this);
    }
    var link = this._layersLink = create$1("a", className + "-toggle", container);
    link.href = "#";
    link.title = "Layers";
    link.setAttribute("role", "button");
    on2(link, {
      keydown: function(e) {
        if (e.keyCode === 13) {
          this._expandSafely();
        }
      },
      // Certain screen readers intercept the key event and instead send a click event
      click: function(e) {
        preventDefault(e);
        this._expandSafely();
      }
    }, this);
    if (!collapsed) {
      this.expand();
    }
    this._baseLayersList = create$1("div", className + "-base", section);
    this._separator = create$1("div", className + "-separator", section);
    this._overlaysList = create$1("div", className + "-overlays", section);
    container.appendChild(section);
  },
  _getLayer: function(id) {
    for (var i = 0; i < this._layers.length; i++) {
      if (this._layers[i] && stamp(this._layers[i].layer) === id) {
        return this._layers[i];
      }
    }
  },
  _addLayer: function(layer, name, overlay) {
    if (this._map) {
      layer.on("add remove", this._onLayerChange, this);
    }
    this._layers.push({
      layer,
      name,
      overlay
    });
    if (this.options.sortLayers) {
      this._layers.sort(bind3(function(a, b) {
        return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
      }, this));
    }
    if (this.options.autoZIndex && layer.setZIndex) {
      this._lastZIndex++;
      layer.setZIndex(this._lastZIndex);
    }
    this._expandIfNotCollapsed();
  },
  _update: function() {
    if (!this._container) {
      return this;
    }
    empty(this._baseLayersList);
    empty(this._overlaysList);
    this._layerControlInputs = [];
    var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;
    for (i = 0; i < this._layers.length; i++) {
      obj = this._layers[i];
      this._addItem(obj);
      overlaysPresent = overlaysPresent || obj.overlay;
      baseLayersPresent = baseLayersPresent || !obj.overlay;
      baseLayersCount += !obj.overlay ? 1 : 0;
    }
    if (this.options.hideSingleBase) {
      baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
      this._baseLayersList.style.display = baseLayersPresent ? "" : "none";
    }
    this._separator.style.display = overlaysPresent && baseLayersPresent ? "" : "none";
    return this;
  },
  _onLayerChange: function(e) {
    if (!this._handlingClick) {
      this._update();
    }
    var obj = this._getLayer(stamp(e.target));
    var type = obj.overlay ? e.type === "add" ? "overlayadd" : "overlayremove" : e.type === "add" ? "baselayerchange" : null;
    if (type) {
      this._map.fire(type, obj);
    }
  },
  // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
  _createRadioElement: function(name, checked) {
    var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"' + (checked ? ' checked="checked"' : "") + "/>";
    var radioFragment = document.createElement("div");
    radioFragment.innerHTML = radioHtml;
    return radioFragment.firstChild;
  },
  _addItem: function(obj) {
    var label = document.createElement("label"), checked = this._map.hasLayer(obj.layer), input;
    if (obj.overlay) {
      input = document.createElement("input");
      input.type = "checkbox";
      input.className = "leaflet-control-layers-selector";
      input.defaultChecked = checked;
    } else {
      input = this._createRadioElement("leaflet-base-layers_" + stamp(this), checked);
    }
    this._layerControlInputs.push(input);
    input.layerId = stamp(obj.layer);
    on2(input, "click", this._onInputClick, this);
    var name = document.createElement("span");
    name.innerHTML = " " + obj.name;
    var holder = document.createElement("span");
    label.appendChild(holder);
    holder.appendChild(input);
    holder.appendChild(name);
    var container = obj.overlay ? this._overlaysList : this._baseLayersList;
    container.appendChild(label);
    this._checkDisabledLayers();
    return label;
  },
  _onInputClick: function() {
    if (this._preventClick) {
      return;
    }
    var inputs = this._layerControlInputs, input, layer;
    var addedLayers = [], removedLayers = [];
    this._handlingClick = true;
    for (var i = inputs.length - 1; i >= 0; i--) {
      input = inputs[i];
      layer = this._getLayer(input.layerId).layer;
      if (input.checked) {
        addedLayers.push(layer);
      } else if (!input.checked) {
        removedLayers.push(layer);
      }
    }
    for (i = 0; i < removedLayers.length; i++) {
      if (this._map.hasLayer(removedLayers[i])) {
        this._map.removeLayer(removedLayers[i]);
      }
    }
    for (i = 0; i < addedLayers.length; i++) {
      if (!this._map.hasLayer(addedLayers[i])) {
        this._map.addLayer(addedLayers[i]);
      }
    }
    this._handlingClick = false;
    this._refocusOnMap();
  },
  _checkDisabledLayers: function() {
    var inputs = this._layerControlInputs, input, layer, zoom2 = this._map.getZoom();
    for (var i = inputs.length - 1; i >= 0; i--) {
      input = inputs[i];
      layer = this._getLayer(input.layerId).layer;
      input.disabled = layer.options.minZoom !== void 0 && zoom2 < layer.options.minZoom || layer.options.maxZoom !== void 0 && zoom2 > layer.options.maxZoom;
    }
  },
  _expandIfNotCollapsed: function() {
    if (this._map && !this.options.collapsed) {
      this.expand();
    }
    return this;
  },
  _expandSafely: function() {
    var section = this._section;
    this._preventClick = true;
    on2(section, "click", preventDefault);
    this.expand();
    var that = this;
    setTimeout(function() {
      off(section, "click", preventDefault);
      that._preventClick = false;
    });
  }
});
var layers = function(baseLayers, overlays, options) {
  return new Layers(baseLayers, overlays, options);
};
var Zoom = Control.extend({
  // @section
  // @aka Control.Zoom options
  options: {
    position: "topleft",
    // @option zoomInText: String = '<span aria-hidden="true">+</span>'
    // The text set on the 'zoom in' button.
    zoomInText: '<span aria-hidden="true">+</span>',
    // @option zoomInTitle: String = 'Zoom in'
    // The title set on the 'zoom in' button.
    zoomInTitle: "Zoom in",
    // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
    // The text set on the 'zoom out' button.
    zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
    // @option zoomOutTitle: String = 'Zoom out'
    // The title set on the 'zoom out' button.
    zoomOutTitle: "Zoom out"
  },
  onAdd: function(map) {
    var zoomName = "leaflet-control-zoom", container = create$1("div", zoomName + " leaflet-bar"), options = this.options;
    this._zoomInButton = this._createButton(
      options.zoomInText,
      options.zoomInTitle,
      zoomName + "-in",
      container,
      this._zoomIn
    );
    this._zoomOutButton = this._createButton(
      options.zoomOutText,
      options.zoomOutTitle,
      zoomName + "-out",
      container,
      this._zoomOut
    );
    this._updateDisabled();
    map.on("zoomend zoomlevelschange", this._updateDisabled, this);
    return container;
  },
  onRemove: function(map) {
    map.off("zoomend zoomlevelschange", this._updateDisabled, this);
  },
  disable: function() {
    this._disabled = true;
    this._updateDisabled();
    return this;
  },
  enable: function() {
    this._disabled = false;
    this._updateDisabled();
    return this;
  },
  _zoomIn: function(e) {
    if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
      this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
    }
  },
  _zoomOut: function(e) {
    if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
      this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
    }
  },
  _createButton: function(html, title, className, container, fn) {
    var link = create$1("a", className, container);
    link.innerHTML = html;
    link.href = "#";
    link.title = title;
    link.setAttribute("role", "button");
    link.setAttribute("aria-label", title);
    disableClickPropagation(link);
    on2(link, "click", stop2);
    on2(link, "click", fn, this);
    on2(link, "click", this._refocusOnMap, this);
    return link;
  },
  _updateDisabled: function() {
    var map = this._map, className = "leaflet-disabled";
    removeClass(this._zoomInButton, className);
    removeClass(this._zoomOutButton, className);
    this._zoomInButton.setAttribute("aria-disabled", "false");
    this._zoomOutButton.setAttribute("aria-disabled", "false");
    if (this._disabled || map._zoom === map.getMinZoom()) {
      addClass(this._zoomOutButton, className);
      this._zoomOutButton.setAttribute("aria-disabled", "true");
    }
    if (this._disabled || map._zoom === map.getMaxZoom()) {
      addClass(this._zoomInButton, className);
      this._zoomInButton.setAttribute("aria-disabled", "true");
    }
  }
});
Map2.mergeOptions({
  zoomControl: true
});
Map2.addInitHook(function() {
  if (this.options.zoomControl) {
    this.zoomControl = new Zoom();
    this.addControl(this.zoomControl);
  }
});
var zoom = function(options) {
  return new Zoom(options);
};
var Scale = Control.extend({
  // @section
  // @aka Control.Scale options
  options: {
    position: "bottomleft",
    // @option maxWidth: Number = 100
    // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
    maxWidth: 100,
    // @option metric: Boolean = True
    // Whether to show the metric scale line (m/km).
    metric: true,
    // @option imperial: Boolean = True
    // Whether to show the imperial scale line (mi/ft).
    imperial: true
    // @option updateWhenIdle: Boolean = false
    // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
  },
  onAdd: function(map) {
    var className = "leaflet-control-scale", container = create$1("div", className), options = this.options;
    this._addScales(options, className + "-line", container);
    map.on(options.updateWhenIdle ? "moveend" : "move", this._update, this);
    map.whenReady(this._update, this);
    return container;
  },
  onRemove: function(map) {
    map.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
  },
  _addScales: function(options, className, container) {
    if (options.metric) {
      this._mScale = create$1("div", className, container);
    }
    if (options.imperial) {
      this._iScale = create$1("div", className, container);
    }
  },
  _update: function() {
    var map = this._map, y = map.getSize().y / 2;
    var maxMeters = map.distance(
      map.containerPointToLatLng([0, y]),
      map.containerPointToLatLng([this.options.maxWidth, y])
    );
    this._updateScales(maxMeters);
  },
  _updateScales: function(maxMeters) {
    if (this.options.metric && maxMeters) {
      this._updateMetric(maxMeters);
    }
    if (this.options.imperial && maxMeters) {
      this._updateImperial(maxMeters);
    }
  },
  _updateMetric: function(maxMeters) {
    var meters = this._getRoundNum(maxMeters), label = meters < 1e3 ? meters + " m" : meters / 1e3 + " km";
    this._updateScale(this._mScale, label, meters / maxMeters);
  },
  _updateImperial: function(maxMeters) {
    var maxFeet = maxMeters * 3.2808399, maxMiles, miles, feet;
    if (maxFeet > 5280) {
      maxMiles = maxFeet / 5280;
      miles = this._getRoundNum(maxMiles);
      this._updateScale(this._iScale, miles + " mi", miles / maxMiles);
    } else {
      feet = this._getRoundNum(maxFeet);
      this._updateScale(this._iScale, feet + " ft", feet / maxFeet);
    }
  },
  _updateScale: function(scale2, text, ratio) {
    scale2.style.width = Math.round(this.options.maxWidth * ratio) + "px";
    scale2.innerHTML = text;
  },
  _getRoundNum: function(num) {
    var pow10 = Math.pow(10, (Math.floor(num) + "").length - 1), d = num / pow10;
    d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;
    return pow10 * d;
  }
});
var scale = function(options) {
  return new Scale(options);
};
var ukrainianFlag = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>';
var Attribution = Control.extend({
  // @section
  // @aka Control.Attribution options
  options: {
    position: "bottomright",
    // @option prefix: String|false = 'Leaflet'
    // The HTML text shown before the attributions. Pass `false` to disable.
    prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Browser.inlineSvg ? ukrainianFlag + " " : "") + "Leaflet</a>"
  },
  initialize: function(options) {
    setOptions(this, options);
    this._attributions = {};
  },
  onAdd: function(map) {
    map.attributionControl = this;
    this._container = create$1("div", "leaflet-control-attribution");
    disableClickPropagation(this._container);
    for (var i in map._layers) {
      if (map._layers[i].getAttribution) {
        this.addAttribution(map._layers[i].getAttribution());
      }
    }
    this._update();
    map.on("layeradd", this._addAttribution, this);
    return this._container;
  },
  onRemove: function(map) {
    map.off("layeradd", this._addAttribution, this);
  },
  _addAttribution: function(ev) {
    if (ev.layer.getAttribution) {
      this.addAttribution(ev.layer.getAttribution());
      ev.layer.once("remove", function() {
        this.removeAttribution(ev.layer.getAttribution());
      }, this);
    }
  },
  // @method setPrefix(prefix: String|false): this
  // The HTML text shown before the attributions. Pass `false` to disable.
  setPrefix: function(prefix2) {
    this.options.prefix = prefix2;
    this._update();
    return this;
  },
  // @method addAttribution(text: String): this
  // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
  addAttribution: function(text) {
    if (!text) {
      return this;
    }
    if (!this._attributions[text]) {
      this._attributions[text] = 0;
    }
    this._attributions[text]++;
    this._update();
    return this;
  },
  // @method removeAttribution(text: String): this
  // Removes an attribution text.
  removeAttribution: function(text) {
    if (!text) {
      return this;
    }
    if (this._attributions[text]) {
      this._attributions[text]--;
      this._update();
    }
    return this;
  },
  _update: function() {
    if (!this._map) {
      return;
    }
    var attribs = [];
    for (var i in this._attributions) {
      if (this._attributions[i]) {
        attribs.push(i);
      }
    }
    var prefixAndAttribs = [];
    if (this.options.prefix) {
      prefixAndAttribs.push(this.options.prefix);
    }
    if (attribs.length) {
      prefixAndAttribs.push(attribs.join(", "));
    }
    this._container.innerHTML = prefixAndAttribs.join(' <span aria-hidden="true">|</span> ');
  }
});
Map2.mergeOptions({
  attributionControl: true
});
Map2.addInitHook(function() {
  if (this.options.attributionControl) {
    new Attribution().addTo(this);
  }
});
var attribution = function(options) {
  return new Attribution(options);
};
Control.Layers = Layers;
Control.Zoom = Zoom;
Control.Scale = Scale;
Control.Attribution = Attribution;
control.layers = layers;
control.zoom = zoom;
control.scale = scale;
control.attribution = attribution;
var Handler = Class.extend({
  initialize: function(map) {
    this._map = map;
  },
  // @method enable(): this
  // Enables the handler
  enable: function() {
    if (this._enabled) {
      return this;
    }
    this._enabled = true;
    this.addHooks();
    return this;
  },
  // @method disable(): this
  // Disables the handler
  disable: function() {
    if (!this._enabled) {
      return this;
    }
    this._enabled = false;
    this.removeHooks();
    return this;
  },
  // @method enabled(): Boolean
  // Returns `true` if the handler is enabled
  enabled: function() {
    return !!this._enabled;
  }
  // @section Extension methods
  // Classes inheriting from `Handler` must implement the two following methods:
  // @method addHooks()
  // Called when the handler is enabled, should add event hooks.
  // @method removeHooks()
  // Called when the handler is disabled, should remove the event hooks added previously.
});
Handler.addTo = function(map, name) {
  map.addHandler(name, this);
  return this;
};
var START = Browser.touch ? "touchstart mousedown" : "mousedown";
var Draggable = Evented.extend({
  options: {
    // @section
    // @aka Draggable options
    // @option clickTolerance: Number = 3
    // The max number of pixels a user can shift the mouse pointer during a click
    // for it to be considered a valid click (as opposed to a mouse drag).
    clickTolerance: 3
  },
  // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
  // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
  initialize: function(element, dragStartTarget, preventOutline2, options) {
    setOptions(this, options);
    this._element = element;
    this._dragStartTarget = dragStartTarget || element;
    this._preventOutline = preventOutline2;
  },
  // @method enable()
  // Enables the dragging ability
  enable: function() {
    if (this._enabled) {
      return;
    }
    on2(this._dragStartTarget, START, this._onDown, this);
    this._enabled = true;
  },
  // @method disable()
  // Disables the dragging ability
  disable: function() {
    if (!this._enabled) {
      return;
    }
    if (Draggable._dragging === this) {
      this.finishDrag(true);
    }
    off(this._dragStartTarget, START, this._onDown, this);
    this._enabled = false;
    this._moved = false;
  },
  _onDown: function(e) {
    if (!this._enabled) {
      return;
    }
    this._moved = false;
    if (hasClass(this._element, "leaflet-zoom-anim")) {
      return;
    }
    if (e.touches && e.touches.length !== 1) {
      if (Draggable._dragging === this) {
        this.finishDrag();
      }
      return;
    }
    if (Draggable._dragging || e.shiftKey || e.which !== 1 && e.button !== 1 && !e.touches) {
      return;
    }
    Draggable._dragging = this;
    if (this._preventOutline) {
      preventOutline(this._element);
    }
    disableImageDrag();
    disableTextSelection();
    if (this._moving) {
      return;
    }
    this.fire("down");
    var first = e.touches ? e.touches[0] : e, sizedParent = getSizedParentNode(this._element);
    this._startPoint = new Point(first.clientX, first.clientY);
    this._startPos = getPosition(this._element);
    this._parentScale = getScale(sizedParent);
    var mouseevent = e.type === "mousedown";
    on2(document, mouseevent ? "mousemove" : "touchmove", this._onMove, this);
    on2(document, mouseevent ? "mouseup" : "touchend touchcancel", this._onUp, this);
  },
  _onMove: function(e) {
    if (!this._enabled) {
      return;
    }
    if (e.touches && e.touches.length > 1) {
      this._moved = true;
      return;
    }
    var first = e.touches && e.touches.length === 1 ? e.touches[0] : e, offset = new Point(first.clientX, first.clientY)._subtract(this._startPoint);
    if (!offset.x && !offset.y) {
      return;
    }
    if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) {
      return;
    }
    offset.x /= this._parentScale.x;
    offset.y /= this._parentScale.y;
    preventDefault(e);
    if (!this._moved) {
      this.fire("dragstart");
      this._moved = true;
      addClass(document.body, "leaflet-dragging");
      this._lastTarget = e.target || e.srcElement;
      if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
        this._lastTarget = this._lastTarget.correspondingUseElement;
      }
      addClass(this._lastTarget, "leaflet-drag-target");
    }
    this._newPos = this._startPos.add(offset);
    this._moving = true;
    this._lastEvent = e;
    this._updatePosition();
  },
  _updatePosition: function() {
    var e = { originalEvent: this._lastEvent };
    this.fire("predrag", e);
    setPosition(this._element, this._newPos);
    this.fire("drag", e);
  },
  _onUp: function() {
    if (!this._enabled) {
      return;
    }
    this.finishDrag();
  },
  finishDrag: function(noInertia) {
    removeClass(document.body, "leaflet-dragging");
    if (this._lastTarget) {
      removeClass(this._lastTarget, "leaflet-drag-target");
      this._lastTarget = null;
    }
    off(document, "mousemove touchmove", this._onMove, this);
    off(document, "mouseup touchend touchcancel", this._onUp, this);
    enableImageDrag();
    enableTextSelection();
    var fireDragend = this._moved && this._moving;
    this._moving = false;
    Draggable._dragging = false;
    if (fireDragend) {
      this.fire("dragend", {
        noInertia,
        distance: this._newPos.distanceTo(this._startPos)
      });
    }
  }
});
function clipPolygon(points, bounds, round) {
  var clippedPoints, edges = [1, 4, 2, 8], i, j, k, a, b, len, edge2, p;
  for (i = 0, len = points.length; i < len; i++) {
    points[i]._code = _getBitCode(points[i], bounds);
  }
  for (k = 0; k < 4; k++) {
    edge2 = edges[k];
    clippedPoints = [];
    for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
      a = points[i];
      b = points[j];
      if (!(a._code & edge2)) {
        if (b._code & edge2) {
          p = _getEdgeIntersection(b, a, edge2, bounds, round);
          p._code = _getBitCode(p, bounds);
          clippedPoints.push(p);
        }
        clippedPoints.push(a);
      } else if (!(b._code & edge2)) {
        p = _getEdgeIntersection(b, a, edge2, bounds, round);
        p._code = _getBitCode(p, bounds);
        clippedPoints.push(p);
      }
    }
    points = clippedPoints;
  }
  return points;
}
function polygonCenter(latlngs, crs) {
  var i, j, p1, p2, f, area, x, y, center;
  if (!latlngs || latlngs.length === 0) {
    throw new Error("latlngs not passed");
  }
  if (!isFlat(latlngs)) {
    console.warn("latlngs are not flat! Only the first ring will be used");
    latlngs = latlngs[0];
  }
  var centroidLatLng = toLatLng([0, 0]);
  var bounds = toLatLngBounds(latlngs);
  var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
  if (areaBounds < 1700) {
    centroidLatLng = centroid(latlngs);
  }
  var len = latlngs.length;
  var points = [];
  for (i = 0; i < len; i++) {
    var latlng = toLatLng(latlngs[i]);
    points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
  }
  area = x = y = 0;
  for (i = 0, j = len - 1; i < len; j = i++) {
    p1 = points[i];
    p2 = points[j];
    f = p1.y * p2.x - p2.y * p1.x;
    x += (p1.x + p2.x) * f;
    y += (p1.y + p2.y) * f;
    area += f * 3;
  }
  if (area === 0) {
    center = points[0];
  } else {
    center = [x / area, y / area];
  }
  var latlngCenter = crs.unproject(toPoint(center));
  return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
}
function centroid(coords) {
  var latSum = 0;
  var lngSum = 0;
  var len = 0;
  for (var i = 0; i < coords.length; i++) {
    var latlng = toLatLng(coords[i]);
    latSum += latlng.lat;
    lngSum += latlng.lng;
    len++;
  }
  return toLatLng([latSum / len, lngSum / len]);
}
function simplify(points, tolerance) {
  if (!tolerance || !points.length) {
    return points.slice();
  }
  var sqTolerance = tolerance * tolerance;
  points = _reducePoints(points, sqTolerance);
  points = _simplifyDP(points, sqTolerance);
  return points;
}
function pointToSegmentDistance(p, p1, p2) {
  return Math.sqrt(_sqClosestPointOnSegment(p, p1, p2, true));
}
function _simplifyDP(points, sqTolerance) {
  var len = points.length, ArrayConstructor = typeof Uint8Array !== void 0 + "" ? Uint8Array : Array, markers = new ArrayConstructor(len);
  markers[0] = markers[len - 1] = 1;
  _simplifyDPStep(points, markers, sqTolerance, 0, len - 1);
  var i, newPoints = [];
  for (i = 0; i < len; i++) {
    if (markers[i]) {
      newPoints.push(points[i]);
    }
  }
  return newPoints;
}
function _simplifyDPStep(points, markers, sqTolerance, first, last) {
  var maxSqDist = 0, index, i, sqDist;
  for (i = first + 1; i <= last - 1; i++) {
    sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);
    if (sqDist > maxSqDist) {
      index = i;
      maxSqDist = sqDist;
    }
  }
  if (maxSqDist > sqTolerance) {
    markers[index] = 1;
    _simplifyDPStep(points, markers, sqTolerance, first, index);
    _simplifyDPStep(points, markers, sqTolerance, index, last);
  }
}
function _reducePoints(points, sqTolerance) {
  var reducedPoints = [points[0]];
  for (var i = 1, prev = 0, len = points.length; i < len; i++) {
    if (_sqDist(points[i], points[prev]) > sqTolerance) {
      reducedPoints.push(points[i]);
      prev = i;
    }
  }
  if (prev < len - 1) {
    reducedPoints.push(points[len - 1]);
  }
  return reducedPoints;
}
var _lastCode;
function clipSegment(a, b, bounds, useLastCode, round) {
  var codeA = useLastCode ? _lastCode : _getBitCode(a, bounds), codeB = _getBitCode(b, bounds), codeOut, p, newCode;
  _lastCode = codeB;
  while (true) {
    if (!(codeA | codeB)) {
      return [a, b];
    }
    if (codeA & codeB) {
      return false;
    }
    codeOut = codeA || codeB;
    p = _getEdgeIntersection(a, b, codeOut, bounds, round);
    newCode = _getBitCode(p, bounds);
    if (codeOut === codeA) {
      a = p;
      codeA = newCode;
    } else {
      b = p;
      codeB = newCode;
    }
  }
}
function _getEdgeIntersection(a, b, code, bounds, round) {
  var dx = b.x - a.x, dy = b.y - a.y, min = bounds.min, max = bounds.max, x, y;
  if (code & 8) {
    x = a.x + dx * (max.y - a.y) / dy;
    y = max.y;
  } else if (code & 4) {
    x = a.x + dx * (min.y - a.y) / dy;
    y = min.y;
  } else if (code & 2) {
    x = max.x;
    y = a.y + dy * (max.x - a.x) / dx;
  } else if (code & 1) {
    x = min.x;
    y = a.y + dy * (min.x - a.x) / dx;
  }
  return new Point(x, y, round);
}
function _getBitCode(p, bounds) {
  var code = 0;
  if (p.x < bounds.min.x) {
    code |= 1;
  } else if (p.x > bounds.max.x) {
    code |= 2;
  }
  if (p.y < bounds.min.y) {
    code |= 4;
  } else if (p.y > bounds.max.y) {
    code |= 8;
  }
  return code;
}
function _sqDist(p1, p2) {
  var dx = p2.x - p1.x, dy = p2.y - p1.y;
  return dx * dx + dy * dy;
}
function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
  var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y, dot = dx * dx + dy * dy, t;
  if (dot > 0) {
    t = ((p.x - x) * dx + (p.y - y) * dy) / dot;
    if (t > 1) {
      x = p2.x;
      y = p2.y;
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }
  dx = p.x - x;
  dy = p.y - y;
  return sqDist ? dx * dx + dy * dy : new Point(x, y);
}
function isFlat(latlngs) {
  return !isArray2(latlngs[0]) || typeof latlngs[0][0] !== "object" && typeof latlngs[0][0] !== "undefined";
}
function _flat(latlngs) {
  console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead.");
  return isFlat(latlngs);
}
function polylineCenter(latlngs, crs) {
  var i, halfDist, segDist, dist, p1, p2, ratio, center;
  if (!latlngs || latlngs.length === 0) {
    throw new Error("latlngs not passed");
  }
  if (!isFlat(latlngs)) {
    console.warn("latlngs are not flat! Only the first ring will be used");
    latlngs = latlngs[0];
  }
  var centroidLatLng = toLatLng([0, 0]);
  var bounds = toLatLngBounds(latlngs);
  var areaBounds = bounds.getNorthWest().distanceTo(bounds.getSouthWest()) * bounds.getNorthEast().distanceTo(bounds.getNorthWest());
  if (areaBounds < 1700) {
    centroidLatLng = centroid(latlngs);
  }
  var len = latlngs.length;
  var points = [];
  for (i = 0; i < len; i++) {
    var latlng = toLatLng(latlngs[i]);
    points.push(crs.project(toLatLng([latlng.lat - centroidLatLng.lat, latlng.lng - centroidLatLng.lng])));
  }
  for (i = 0, halfDist = 0; i < len - 1; i++) {
    halfDist += points[i].distanceTo(points[i + 1]) / 2;
  }
  if (halfDist === 0) {
    center = points[0];
  } else {
    for (i = 0, dist = 0; i < len - 1; i++) {
      p1 = points[i];
      p2 = points[i + 1];
      segDist = p1.distanceTo(p2);
      dist += segDist;
      if (dist > halfDist) {
        ratio = (dist - halfDist) / segDist;
        center = [
          p2.x - ratio * (p2.x - p1.x),
          p2.y - ratio * (p2.y - p1.y)
        ];
        break;
      }
    }
  }
  var latlngCenter = crs.unproject(toPoint(center));
  return toLatLng([latlngCenter.lat + centroidLatLng.lat, latlngCenter.lng + centroidLatLng.lng]);
}
var LonLat = {
  project: function(latlng) {
    return new Point(latlng.lng, latlng.lat);
  },
  unproject: function(point) {
    return new LatLng(point.y, point.x);
  },
  bounds: new Bounds([-180, -90], [180, 90])
};
var Mercator = {
  R: 6378137,
  R_MINOR: 6356752314245179e-9,
  bounds: new Bounds([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
  project: function(latlng) {
    var d = Math.PI / 180, r = this.R, y = latlng.lat * d, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), con = e * Math.sin(y);
    var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
    y = -r * Math.log(Math.max(ts, 1e-10));
    return new Point(latlng.lng * d * r, y);
  },
  unproject: function(point) {
    var d = 180 / Math.PI, r = this.R, tmp = this.R_MINOR / r, e = Math.sqrt(1 - tmp * tmp), ts = Math.exp(-point.y / r), phi = Math.PI / 2 - 2 * Math.atan(ts);
    for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
      con = e * Math.sin(phi);
      con = Math.pow((1 - con) / (1 + con), e / 2);
      dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
      phi += dphi;
    }
    return new LatLng(phi * d, point.x * d / r);
  }
};
var EPSG3395 = extend({}, Earth, {
  code: "EPSG:3395",
  projection: Mercator,
  transformation: function() {
    var scale2 = 0.5 / (Math.PI * Mercator.R);
    return toTransformation(scale2, 0.5, -scale2, 0.5);
  }()
});
var EPSG4326 = extend({}, Earth, {
  code: "EPSG:4326",
  projection: LonLat,
  transformation: toTransformation(1 / 180, 1, -1 / 180, 0.5)
});
var Simple = extend({}, CRS, {
  projection: LonLat,
  transformation: toTransformation(1, 0, -1, 0),
  scale: function(zoom2) {
    return Math.pow(2, zoom2);
  },
  zoom: function(scale2) {
    return Math.log(scale2) / Math.LN2;
  },
  distance: function(latlng1, latlng2) {
    var dx = latlng2.lng - latlng1.lng, dy = latlng2.lat - latlng1.lat;
    return Math.sqrt(dx * dx + dy * dy);
  },
  infinite: true
});
CRS.Earth = Earth;
CRS.EPSG3395 = EPSG3395;
CRS.EPSG3857 = EPSG3857;
CRS.EPSG900913 = EPSG900913;
CRS.EPSG4326 = EPSG4326;
CRS.Simple = Simple;
var Layer = Evented.extend({
  // Classes extending `L.Layer` will inherit the following options:
  options: {
    // @option pane: String = 'overlayPane'
    // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
    pane: "overlayPane",
    // @option attribution: String = null
    // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
    attribution: null,
    bubblingMouseEvents: true
  },
  /* @section
   * Classes extending `L.Layer` will inherit the following methods:
   *
   * @method addTo(map: Map|LayerGroup): this
   * Adds the layer to the given map or layer group.
   */
  addTo: function(map) {
    map.addLayer(this);
    return this;
  },
  // @method remove: this
  // Removes the layer from the map it is currently active on.
  remove: function() {
    return this.removeFrom(this._map || this._mapToAdd);
  },
  // @method removeFrom(map: Map): this
  // Removes the layer from the given map
  //
  // @alternative
  // @method removeFrom(group: LayerGroup): this
  // Removes the layer from the given `LayerGroup`
  removeFrom: function(obj) {
    if (obj) {
      obj.removeLayer(this);
    }
    return this;
  },
  // @method getPane(name? : String): HTMLElement
  // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
  getPane: function(name) {
    return this._map.getPane(name ? this.options[name] || name : this.options.pane);
  },
  addInteractiveTarget: function(targetEl) {
    this._map._targets[stamp(targetEl)] = this;
    return this;
  },
  removeInteractiveTarget: function(targetEl) {
    delete this._map._targets[stamp(targetEl)];
    return this;
  },
  // @method getAttribution: String
  // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
  getAttribution: function() {
    return this.options.attribution;
  },
  _layerAdd: function(e) {
    var map = e.target;
    if (!map.hasLayer(this)) {
      return;
    }
    this._map = map;
    this._zoomAnimated = map._zoomAnimated;
    if (this.getEvents) {
      var events = this.getEvents();
      map.on(events, this);
      this.once("remove", function() {
        map.off(events, this);
      }, this);
    }
    this.onAdd(map);
    this.fire("add");
    map.fire("layeradd", { layer: this });
  }
});
Map2.include({
  // @method addLayer(layer: Layer): this
  // Adds the given layer to the map
  addLayer: function(layer) {
    if (!layer._layerAdd) {
      throw new Error("The provided object is not a Layer.");
    }
    var id = stamp(layer);
    if (this._layers[id]) {
      return this;
    }
    this._layers[id] = layer;
    layer._mapToAdd = this;
    if (layer.beforeAdd) {
      layer.beforeAdd(this);
    }
    this.whenReady(layer._layerAdd, layer);
    return this;
  },
  // @method removeLayer(layer: Layer): this
  // Removes the given layer from the map.
  removeLayer: function(layer) {
    var id = stamp(layer);
    if (!this._layers[id]) {
      return this;
    }
    if (this._loaded) {
      layer.onRemove(this);
    }
    delete this._layers[id];
    if (this._loaded) {
      this.fire("layerremove", { layer });
      layer.fire("remove");
    }
    layer._map = layer._mapToAdd = null;
    return this;
  },
  // @method hasLayer(layer: Layer): Boolean
  // Returns `true` if the given layer is currently added to the map
  hasLayer: function(layer) {
    return stamp(layer) in this._layers;
  },
  /* @method eachLayer(fn: Function, context?: Object): this
   * Iterates over the layers of the map, optionally specifying context of the iterator function.
   * ```
   * map.eachLayer(function(layer){
   *     layer.bindPopup('Hello');
   * });
   * ```
   */
  eachLayer: function(method, context) {
    for (var i in this._layers) {
      method.call(context, this._layers[i]);
    }
    return this;
  },
  _addLayers: function(layers2) {
    layers2 = layers2 ? isArray2(layers2) ? layers2 : [layers2] : [];
    for (var i = 0, len = layers2.length; i < len; i++) {
      this.addLayer(layers2[i]);
    }
  },
  _addZoomLimit: function(layer) {
    if (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
      this._zoomBoundLayers[stamp(layer)] = layer;
      this._updateZoomLevels();
    }
  },
  _removeZoomLimit: function(layer) {
    var id = stamp(layer);
    if (this._zoomBoundLayers[id]) {
      delete this._zoomBoundLayers[id];
      this._updateZoomLevels();
    }
  },
  _updateZoomLevels: function() {
    var minZoom = Infinity, maxZoom = -Infinity, oldZoomSpan = this._getZoomSpan();
    for (var i in this._zoomBoundLayers) {
      var options = this._zoomBoundLayers[i].options;
      minZoom = options.minZoom === void 0 ? minZoom : Math.min(minZoom, options.minZoom);
      maxZoom = options.maxZoom === void 0 ? maxZoom : Math.max(maxZoom, options.maxZoom);
    }
    this._layersMaxZoom = maxZoom === -Infinity ? void 0 : maxZoom;
    this._layersMinZoom = minZoom === Infinity ? void 0 : minZoom;
    if (oldZoomSpan !== this._getZoomSpan()) {
      this.fire("zoomlevelschange");
    }
    if (this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
      this.setZoom(this._layersMaxZoom);
    }
    if (this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
      this.setZoom(this._layersMinZoom);
    }
  }
});
var LayerGroup = Layer.extend({
  initialize: function(layers2, options) {
    setOptions(this, options);
    this._layers = {};
    var i, len;
    if (layers2) {
      for (i = 0, len = layers2.length; i < len; i++) {
        this.addLayer(layers2[i]);
      }
    }
  },
  // @method addLayer(layer: Layer): this
  // Adds the given layer to the group.
  addLayer: function(layer) {
    var id = this.getLayerId(layer);
    this._layers[id] = layer;
    if (this._map) {
      this._map.addLayer(layer);
    }
    return this;
  },
  // @method removeLayer(layer: Layer): this
  // Removes the given layer from the group.
  // @alternative
  // @method removeLayer(id: Number): this
  // Removes the layer with the given internal ID from the group.
  removeLayer: function(layer) {
    var id = layer in this._layers ? layer : this.getLayerId(layer);
    if (this._map && this._layers[id]) {
      this._map.removeLayer(this._layers[id]);
    }
    delete this._layers[id];
    return this;
  },
  // @method hasLayer(layer: Layer): Boolean
  // Returns `true` if the given layer is currently added to the group.
  // @alternative
  // @method hasLayer(id: Number): Boolean
  // Returns `true` if the given internal ID is currently added to the group.
  hasLayer: function(layer) {
    var layerId = typeof layer === "number" ? layer : this.getLayerId(layer);
    return layerId in this._layers;
  },
  // @method clearLayers(): this
  // Removes all the layers from the group.
  clearLayers: function() {
    return this.eachLayer(this.removeLayer, this);
  },
  // @method invoke(methodName: String, …): this
  // Calls `methodName` on every layer contained in this group, passing any
  // additional parameters. Has no effect if the layers contained do not
  // implement `methodName`.
  invoke: function(methodName) {
    var args = Array.prototype.slice.call(arguments, 1), i, layer;
    for (i in this._layers) {
      layer = this._layers[i];
      if (layer[methodName]) {
        layer[methodName].apply(layer, args);
      }
    }
    return this;
  },
  onAdd: function(map) {
    this.eachLayer(map.addLayer, map);
  },
  onRemove: function(map) {
    this.eachLayer(map.removeLayer, map);
  },
  // @method eachLayer(fn: Function, context?: Object): this
  // Iterates over the layers of the group, optionally specifying context of the iterator function.
  // ```js
  // group.eachLayer(function (layer) {
  // 	layer.bindPopup('Hello');
  // });
  // ```
  eachLayer: function(method, context) {
    for (var i in this._layers) {
      method.call(context, this._layers[i]);
    }
    return this;
  },
  // @method getLayer(id: Number): Layer
  // Returns the layer with the given internal ID.
  getLayer: function(id) {
    return this._layers[id];
  },
  // @method getLayers(): Layer[]
  // Returns an array of all the layers added to the group.
  getLayers: function() {
    var layers2 = [];
    this.eachLayer(layers2.push, layers2);
    return layers2;
  },
  // @method setZIndex(zIndex: Number): this
  // Calls `setZIndex` on every layer contained in this group, passing the z-index.
  setZIndex: function(zIndex) {
    return this.invoke("setZIndex", zIndex);
  },
  // @method getLayerId(layer: Layer): Number
  // Returns the internal ID for a layer
  getLayerId: function(layer) {
    return stamp(layer);
  }
});
var FeatureGroup = LayerGroup.extend({
  addLayer: function(layer) {
    if (this.hasLayer(layer)) {
      return this;
    }
    layer.addEventParent(this);
    LayerGroup.prototype.addLayer.call(this, layer);
    return this.fire("layeradd", { layer });
  },
  removeLayer: function(layer) {
    if (!this.hasLayer(layer)) {
      return this;
    }
    if (layer in this._layers) {
      layer = this._layers[layer];
    }
    layer.removeEventParent(this);
    LayerGroup.prototype.removeLayer.call(this, layer);
    return this.fire("layerremove", { layer });
  },
  // @method setStyle(style: Path options): this
  // Sets the given path options to each layer of the group that has a `setStyle` method.
  setStyle: function(style2) {
    return this.invoke("setStyle", style2);
  },
  // @method bringToFront(): this
  // Brings the layer group to the top of all other layers
  bringToFront: function() {
    return this.invoke("bringToFront");
  },
  // @method bringToBack(): this
  // Brings the layer group to the back of all other layers
  bringToBack: function() {
    return this.invoke("bringToBack");
  },
  // @method getBounds(): LatLngBounds
  // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
  getBounds: function() {
    var bounds = new LatLngBounds();
    for (var id in this._layers) {
      var layer = this._layers[id];
      bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
    }
    return bounds;
  }
});
var Icon = Class.extend({
  /* @section
   * @aka Icon options
   *
   * @option iconUrl: String = null
   * **(required)** The URL to the icon image (absolute or relative to your script path).
   *
   * @option iconRetinaUrl: String = null
   * The URL to a retina sized version of the icon image (absolute or relative to your
   * script path). Used for Retina screen devices.
   *
   * @option iconSize: Point = null
   * Size of the icon image in pixels.
   *
   * @option iconAnchor: Point = null
   * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
   * will be aligned so that this point is at the marker's geographical location. Centered
   * by default if size is specified, also can be set in CSS with negative margins.
   *
   * @option popupAnchor: Point = [0, 0]
   * The coordinates of the point from which popups will "open", relative to the icon anchor.
   *
   * @option tooltipAnchor: Point = [0, 0]
   * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
   *
   * @option shadowUrl: String = null
   * The URL to the icon shadow image. If not specified, no shadow image will be created.
   *
   * @option shadowRetinaUrl: String = null
   *
   * @option shadowSize: Point = null
   * Size of the shadow image in pixels.
   *
   * @option shadowAnchor: Point = null
   * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
   * as iconAnchor if not specified).
   *
   * @option className: String = ''
   * A custom class name to assign to both icon and shadow images. Empty by default.
   */
  options: {
    popupAnchor: [0, 0],
    tooltipAnchor: [0, 0],
    // @option crossOrigin: Boolean|String = false
    // Whether the crossOrigin attribute will be added to the tiles.
    // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
    // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
    crossOrigin: false
  },
  initialize: function(options) {
    setOptions(this, options);
  },
  // @method createIcon(oldIcon?: HTMLElement): HTMLElement
  // Called internally when the icon has to be shown, returns a `<img>` HTML element
  // styled according to the options.
  createIcon: function(oldIcon) {
    return this._createIcon("icon", oldIcon);
  },
  // @method createShadow(oldIcon?: HTMLElement): HTMLElement
  // As `createIcon`, but for the shadow beneath it.
  createShadow: function(oldIcon) {
    return this._createIcon("shadow", oldIcon);
  },
  _createIcon: function(name, oldIcon) {
    var src = this._getIconUrl(name);
    if (!src) {
      if (name === "icon") {
        throw new Error("iconUrl not set in Icon options (see the docs).");
      }
      return null;
    }
    var img = this._createImg(src, oldIcon && oldIcon.tagName === "IMG" ? oldIcon : null);
    this._setIconStyles(img, name);
    if (this.options.crossOrigin || this.options.crossOrigin === "") {
      img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
    }
    return img;
  },
  _setIconStyles: function(img, name) {
    var options = this.options;
    var sizeOption = options[name + "Size"];
    if (typeof sizeOption === "number") {
      sizeOption = [sizeOption, sizeOption];
    }
    var size2 = toPoint(sizeOption), anchor = toPoint(name === "shadow" && options.shadowAnchor || options.iconAnchor || size2 && size2.divideBy(2, true));
    img.className = "leaflet-marker-" + name + " " + (options.className || "");
    if (anchor) {
      img.style.marginLeft = -anchor.x + "px";
      img.style.marginTop = -anchor.y + "px";
    }
    if (size2) {
      img.style.width = size2.x + "px";
      img.style.height = size2.y + "px";
    }
  },
  _createImg: function(src, el) {
    el = el || document.createElement("img");
    el.src = src;
    return el;
  },
  _getIconUrl: function(name) {
    return Browser.retina && this.options[name + "RetinaUrl"] || this.options[name + "Url"];
  }
});
function icon(options) {
  return new Icon(options);
}
var IconDefault = Icon.extend({
  options: {
    iconUrl: "marker-icon.png",
    iconRetinaUrl: "marker-icon-2x.png",
    shadowUrl: "marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  },
  _getIconUrl: function(name) {
    if (typeof IconDefault.imagePath !== "string") {
      IconDefault.imagePath = this._detectIconPath();
    }
    return (this.options.imagePath || IconDefault.imagePath) + Icon.prototype._getIconUrl.call(this, name);
  },
  _stripUrl: function(path) {
    var strip = function(str, re, idx) {
      var match = re.exec(str);
      return match && match[idx];
    };
    path = strip(path, /^url\((['"])?(.+)\1\)$/, 2);
    return path && strip(path, /^(.*)marker-icon\.png$/, 1);
  },
  _detectIconPath: function() {
    var el = create$1("div", "leaflet-default-icon-path", document.body);
    var path = getStyle(el, "background-image") || getStyle(el, "backgroundImage");
    document.body.removeChild(el);
    path = this._stripUrl(path);
    if (path) {
      return path;
    }
    var link = document.querySelector('link[href$="leaflet.css"]');
    if (!link) {
      return "";
    }
    return link.href.substring(0, link.href.length - "leaflet.css".length - 1);
  }
});
var MarkerDrag = Handler.extend({
  initialize: function(marker) {
    this._marker = marker;
  },
  addHooks: function() {
    var icon2 = this._marker._icon;
    if (!this._draggable) {
      this._draggable = new Draggable(icon2, icon2, true);
    }
    this._draggable.on({
      dragstart: this._onDragStart,
      predrag: this._onPreDrag,
      drag: this._onDrag,
      dragend: this._onDragEnd
    }, this).enable();
    addClass(icon2, "leaflet-marker-draggable");
  },
  removeHooks: function() {
    this._draggable.off({
      dragstart: this._onDragStart,
      predrag: this._onPreDrag,
      drag: this._onDrag,
      dragend: this._onDragEnd
    }, this).disable();
    if (this._marker._icon) {
      removeClass(this._marker._icon, "leaflet-marker-draggable");
    }
  },
  moved: function() {
    return this._draggable && this._draggable._moved;
  },
  _adjustPan: function(e) {
    var marker = this._marker, map = marker._map, speed = this._marker.options.autoPanSpeed, padding = this._marker.options.autoPanPadding, iconPos = getPosition(marker._icon), bounds = map.getPixelBounds(), origin = map.getPixelOrigin();
    var panBounds = toBounds(
      bounds.min._subtract(origin).add(padding),
      bounds.max._subtract(origin).subtract(padding)
    );
    if (!panBounds.contains(iconPos)) {
      var movement = toPoint(
        (Math.max(panBounds.max.x, iconPos.x) - panBounds.max.x) / (bounds.max.x - panBounds.max.x) - (Math.min(panBounds.min.x, iconPos.x) - panBounds.min.x) / (bounds.min.x - panBounds.min.x),
        (Math.max(panBounds.max.y, iconPos.y) - panBounds.max.y) / (bounds.max.y - panBounds.max.y) - (Math.min(panBounds.min.y, iconPos.y) - panBounds.min.y) / (bounds.min.y - panBounds.min.y)
      ).multiplyBy(speed);
      map.panBy(movement, { animate: false });
      this._draggable._newPos._add(movement);
      this._draggable._startPos._add(movement);
      setPosition(marker._icon, this._draggable._newPos);
      this._onDrag(e);
      this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
    }
  },
  _onDragStart: function() {
    this._oldLatLng = this._marker.getLatLng();
    this._marker.closePopup && this._marker.closePopup();
    this._marker.fire("movestart").fire("dragstart");
  },
  _onPreDrag: function(e) {
    if (this._marker.options.autoPan) {
      cancelAnimFrame(this._panRequest);
      this._panRequest = requestAnimFrame(this._adjustPan.bind(this, e));
    }
  },
  _onDrag: function(e) {
    var marker = this._marker, shadow = marker._shadow, iconPos = getPosition(marker._icon), latlng = marker._map.layerPointToLatLng(iconPos);
    if (shadow) {
      setPosition(shadow, iconPos);
    }
    marker._latlng = latlng;
    e.latlng = latlng;
    e.oldLatLng = this._oldLatLng;
    marker.fire("move", e).fire("drag", e);
  },
  _onDragEnd: function(e) {
    cancelAnimFrame(this._panRequest);
    delete this._oldLatLng;
    this._marker.fire("moveend").fire("dragend", e);
  }
});
var Marker = Layer.extend({
  // @section
  // @aka Marker options
  options: {
    // @option icon: Icon = *
    // Icon instance to use for rendering the marker.
    // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
    // If not specified, a common instance of `L.Icon.Default` is used.
    icon: new IconDefault(),
    // Option inherited from "Interactive layer" abstract class
    interactive: true,
    // @option keyboard: Boolean = true
    // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
    keyboard: true,
    // @option title: String = ''
    // Text for the browser tooltip that appear on marker hover (no tooltip by default).
    // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
    title: "",
    // @option alt: String = 'Marker'
    // Text for the `alt` attribute of the icon image.
    // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
    alt: "Marker",
    // @option zIndexOffset: Number = 0
    // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
    zIndexOffset: 0,
    // @option opacity: Number = 1.0
    // The opacity of the marker.
    opacity: 1,
    // @option riseOnHover: Boolean = false
    // If `true`, the marker will get on top of others when you hover the mouse over it.
    riseOnHover: false,
    // @option riseOffset: Number = 250
    // The z-index offset used for the `riseOnHover` feature.
    riseOffset: 250,
    // @option pane: String = 'markerPane'
    // `Map pane` where the markers icon will be added.
    pane: "markerPane",
    // @option shadowPane: String = 'shadowPane'
    // `Map pane` where the markers shadow will be added.
    shadowPane: "shadowPane",
    // @option bubblingMouseEvents: Boolean = false
    // When `true`, a mouse event on this marker will trigger the same event on the map
    // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
    bubblingMouseEvents: false,
    // @option autoPanOnFocus: Boolean = true
    // When `true`, the map will pan whenever the marker is focused (via
    // e.g. pressing `tab` on the keyboard) to ensure the marker is
    // visible within the map's bounds
    autoPanOnFocus: true,
    // @section Draggable marker options
    // @option draggable: Boolean = false
    // Whether the marker is draggable with mouse/touch or not.
    draggable: false,
    // @option autoPan: Boolean = false
    // Whether to pan the map when dragging this marker near its edge or not.
    autoPan: false,
    // @option autoPanPadding: Point = Point(50, 50)
    // Distance (in pixels to the left/right and to the top/bottom) of the
    // map edge to start panning the map.
    autoPanPadding: [50, 50],
    // @option autoPanSpeed: Number = 10
    // Number of pixels the map should pan by.
    autoPanSpeed: 10
  },
  /* @section
   *
   * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
   */
  initialize: function(latlng, options) {
    setOptions(this, options);
    this._latlng = toLatLng(latlng);
  },
  onAdd: function(map) {
    this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;
    if (this._zoomAnimated) {
      map.on("zoomanim", this._animateZoom, this);
    }
    this._initIcon();
    this.update();
  },
  onRemove: function(map) {
    if (this.dragging && this.dragging.enabled()) {
      this.options.draggable = true;
      this.dragging.removeHooks();
    }
    delete this.dragging;
    if (this._zoomAnimated) {
      map.off("zoomanim", this._animateZoom, this);
    }
    this._removeIcon();
    this._removeShadow();
  },
  getEvents: function() {
    return {
      zoom: this.update,
      viewreset: this.update
    };
  },
  // @method getLatLng: LatLng
  // Returns the current geographical position of the marker.
  getLatLng: function() {
    return this._latlng;
  },
  // @method setLatLng(latlng: LatLng): this
  // Changes the marker position to the given point.
  setLatLng: function(latlng) {
    var oldLatLng = this._latlng;
    this._latlng = toLatLng(latlng);
    this.update();
    return this.fire("move", { oldLatLng, latlng: this._latlng });
  },
  // @method setZIndexOffset(offset: Number): this
  // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
  setZIndexOffset: function(offset) {
    this.options.zIndexOffset = offset;
    return this.update();
  },
  // @method getIcon: Icon
  // Returns the current icon used by the marker
  getIcon: function() {
    return this.options.icon;
  },
  // @method setIcon(icon: Icon): this
  // Changes the marker icon.
  setIcon: function(icon2) {
    this.options.icon = icon2;
    if (this._map) {
      this._initIcon();
      this.update();
    }
    if (this._popup) {
      this.bindPopup(this._popup, this._popup.options);
    }
    return this;
  },
  getElement: function() {
    return this._icon;
  },
  update: function() {
    if (this._icon && this._map) {
      var pos = this._map.latLngToLayerPoint(this._latlng).round();
      this._setPos(pos);
    }
    return this;
  },
  _initIcon: function() {
    var options = this.options, classToAdd = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
    var icon2 = options.icon.createIcon(this._icon), addIcon = false;
    if (icon2 !== this._icon) {
      if (this._icon) {
        this._removeIcon();
      }
      addIcon = true;
      if (options.title) {
        icon2.title = options.title;
      }
      if (icon2.tagName === "IMG") {
        icon2.alt = options.alt || "";
      }
    }
    addClass(icon2, classToAdd);
    if (options.keyboard) {
      icon2.tabIndex = "0";
      icon2.setAttribute("role", "button");
    }
    this._icon = icon2;
    if (options.riseOnHover) {
      this.on({
        mouseover: this._bringToFront,
        mouseout: this._resetZIndex
      });
    }
    if (this.options.autoPanOnFocus) {
      on2(icon2, "focus", this._panOnFocus, this);
    }
    var newShadow = options.icon.createShadow(this._shadow), addShadow = false;
    if (newShadow !== this._shadow) {
      this._removeShadow();
      addShadow = true;
    }
    if (newShadow) {
      addClass(newShadow, classToAdd);
      newShadow.alt = "";
    }
    this._shadow = newShadow;
    if (options.opacity < 1) {
      this._updateOpacity();
    }
    if (addIcon) {
      this.getPane().appendChild(this._icon);
    }
    this._initInteraction();
    if (newShadow && addShadow) {
      this.getPane(options.shadowPane).appendChild(this._shadow);
    }
  },
  _removeIcon: function() {
    if (this.options.riseOnHover) {
      this.off({
        mouseover: this._bringToFront,
        mouseout: this._resetZIndex
      });
    }
    if (this.options.autoPanOnFocus) {
      off(this._icon, "focus", this._panOnFocus, this);
    }
    remove(this._icon);
    this.removeInteractiveTarget(this._icon);
    this._icon = null;
  },
  _removeShadow: function() {
    if (this._shadow) {
      remove(this._shadow);
    }
    this._shadow = null;
  },
  _setPos: function(pos) {
    if (this._icon) {
      setPosition(this._icon, pos);
    }
    if (this._shadow) {
      setPosition(this._shadow, pos);
    }
    this._zIndex = pos.y + this.options.zIndexOffset;
    this._resetZIndex();
  },
  _updateZIndex: function(offset) {
    if (this._icon) {
      this._icon.style.zIndex = this._zIndex + offset;
    }
  },
  _animateZoom: function(opt) {
    var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
    this._setPos(pos);
  },
  _initInteraction: function() {
    if (!this.options.interactive) {
      return;
    }
    addClass(this._icon, "leaflet-interactive");
    this.addInteractiveTarget(this._icon);
    if (MarkerDrag) {
      var draggable = this.options.draggable;
      if (this.dragging) {
        draggable = this.dragging.enabled();
        this.dragging.disable();
      }
      this.dragging = new MarkerDrag(this);
      if (draggable) {
        this.dragging.enable();
      }
    }
  },
  // @method setOpacity(opacity: Number): this
  // Changes the opacity of the marker.
  setOpacity: function(opacity) {
    this.options.opacity = opacity;
    if (this._map) {
      this._updateOpacity();
    }
    return this;
  },
  _updateOpacity: function() {
    var opacity = this.options.opacity;
    if (this._icon) {
      setOpacity(this._icon, opacity);
    }
    if (this._shadow) {
      setOpacity(this._shadow, opacity);
    }
  },
  _bringToFront: function() {
    this._updateZIndex(this.options.riseOffset);
  },
  _resetZIndex: function() {
    this._updateZIndex(0);
  },
  _panOnFocus: function() {
    var map = this._map;
    if (!map) {
      return;
    }
    var iconOpts = this.options.icon.options;
    var size2 = iconOpts.iconSize ? toPoint(iconOpts.iconSize) : toPoint(0, 0);
    var anchor = iconOpts.iconAnchor ? toPoint(iconOpts.iconAnchor) : toPoint(0, 0);
    map.panInside(this._latlng, {
      paddingTopLeft: anchor,
      paddingBottomRight: size2.subtract(anchor)
    });
  },
  _getPopupAnchor: function() {
    return this.options.icon.options.popupAnchor;
  },
  _getTooltipAnchor: function() {
    return this.options.icon.options.tooltipAnchor;
  }
});
var Path = Layer.extend({
  // @section
  // @aka Path options
  options: {
    // @option stroke: Boolean = true
    // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
    stroke: true,
    // @option color: String = '#3388ff'
    // Stroke color
    color: "#3388ff",
    // @option weight: Number = 3
    // Stroke width in pixels
    weight: 3,
    // @option opacity: Number = 1.0
    // Stroke opacity
    opacity: 1,
    // @option lineCap: String= 'round'
    // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
    lineCap: "round",
    // @option lineJoin: String = 'round'
    // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
    lineJoin: "round",
    // @option dashArray: String = null
    // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
    dashArray: null,
    // @option dashOffset: String = null
    // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
    dashOffset: null,
    // @option fill: Boolean = depends
    // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
    fill: false,
    // @option fillColor: String = *
    // Fill color. Defaults to the value of the [`color`](#path-color) option
    fillColor: null,
    // @option fillOpacity: Number = 0.2
    // Fill opacity.
    fillOpacity: 0.2,
    // @option fillRule: String = 'evenodd'
    // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
    fillRule: "evenodd",
    // className: '',
    // Option inherited from "Interactive layer" abstract class
    interactive: true,
    // @option bubblingMouseEvents: Boolean = true
    // When `true`, a mouse event on this path will trigger the same event on the map
    // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
    bubblingMouseEvents: true
  },
  beforeAdd: function(map) {
    this._renderer = map.getRenderer(this);
  },
  onAdd: function() {
    this._renderer._initPath(this);
    this._reset();
    this._renderer._addPath(this);
  },
  onRemove: function() {
    this._renderer._removePath(this);
  },
  // @method redraw(): this
  // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
  redraw: function() {
    if (this._map) {
      this._renderer._updatePath(this);
    }
    return this;
  },
  // @method setStyle(style: Path options): this
  // Changes the appearance of a Path based on the options in the `Path options` object.
  setStyle: function(style2) {
    setOptions(this, style2);
    if (this._renderer) {
      this._renderer._updateStyle(this);
      if (this.options.stroke && style2 && Object.prototype.hasOwnProperty.call(style2, "weight")) {
        this._updateBounds();
      }
    }
    return this;
  },
  // @method bringToFront(): this
  // Brings the layer to the top of all path layers.
  bringToFront: function() {
    if (this._renderer) {
      this._renderer._bringToFront(this);
    }
    return this;
  },
  // @method bringToBack(): this
  // Brings the layer to the bottom of all path layers.
  bringToBack: function() {
    if (this._renderer) {
      this._renderer._bringToBack(this);
    }
    return this;
  },
  getElement: function() {
    return this._path;
  },
  _reset: function() {
    this._project();
    this._update();
  },
  _clickTolerance: function() {
    return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
  }
});
var CircleMarker = Path.extend({
  // @section
  // @aka CircleMarker options
  options: {
    fill: true,
    // @option radius: Number = 10
    // Radius of the circle marker, in pixels
    radius: 10
  },
  initialize: function(latlng, options) {
    setOptions(this, options);
    this._latlng = toLatLng(latlng);
    this._radius = this.options.radius;
  },
  // @method setLatLng(latLng: LatLng): this
  // Sets the position of a circle marker to a new location.
  setLatLng: function(latlng) {
    var oldLatLng = this._latlng;
    this._latlng = toLatLng(latlng);
    this.redraw();
    return this.fire("move", { oldLatLng, latlng: this._latlng });
  },
  // @method getLatLng(): LatLng
  // Returns the current geographical position of the circle marker
  getLatLng: function() {
    return this._latlng;
  },
  // @method setRadius(radius: Number): this
  // Sets the radius of a circle marker. Units are in pixels.
  setRadius: function(radius) {
    this.options.radius = this._radius = radius;
    return this.redraw();
  },
  // @method getRadius(): Number
  // Returns the current radius of the circle
  getRadius: function() {
    return this._radius;
  },
  setStyle: function(options) {
    var radius = options && options.radius || this._radius;
    Path.prototype.setStyle.call(this, options);
    this.setRadius(radius);
    return this;
  },
  _project: function() {
    this._point = this._map.latLngToLayerPoint(this._latlng);
    this._updateBounds();
  },
  _updateBounds: function() {
    var r = this._radius, r2 = this._radiusY || r, w = this._clickTolerance(), p = [r + w, r2 + w];
    this._pxBounds = new Bounds(this._point.subtract(p), this._point.add(p));
  },
  _update: function() {
    if (this._map) {
      this._updatePath();
    }
  },
  _updatePath: function() {
    this._renderer._updateCircle(this);
  },
  _empty: function() {
    return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
  },
  // Needed by the `Canvas` renderer for interactivity
  _containsPoint: function(p) {
    return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
  }
});
var Circle = CircleMarker.extend({
  initialize: function(latlng, options, legacyOptions) {
    if (typeof options === "number") {
      options = extend({}, legacyOptions, { radius: options });
    }
    setOptions(this, options);
    this._latlng = toLatLng(latlng);
    if (isNaN(this.options.radius)) {
      throw new Error("Circle radius cannot be NaN");
    }
    this._mRadius = this.options.radius;
  },
  // @method setRadius(radius: Number): this
  // Sets the radius of a circle. Units are in meters.
  setRadius: function(radius) {
    this._mRadius = radius;
    return this.redraw();
  },
  // @method getRadius(): Number
  // Returns the current radius of a circle. Units are in meters.
  getRadius: function() {
    return this._mRadius;
  },
  // @method getBounds(): LatLngBounds
  // Returns the `LatLngBounds` of the path.
  getBounds: function() {
    var half = [this._radius, this._radiusY || this._radius];
    return new LatLngBounds(
      this._map.layerPointToLatLng(this._point.subtract(half)),
      this._map.layerPointToLatLng(this._point.add(half))
    );
  },
  setStyle: Path.prototype.setStyle,
  _project: function() {
    var lng = this._latlng.lng, lat = this._latlng.lat, map = this._map, crs = map.options.crs;
    if (crs.distance === Earth.distance) {
      var d = Math.PI / 180, latR = this._mRadius / Earth.R / d, top = map.project([lat + latR, lng]), bottom = map.project([lat - latR, lng]), p = top.add(bottom).divideBy(2), lat2 = map.unproject(p).lat, lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) / (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;
      if (isNaN(lngR) || lngR === 0) {
        lngR = latR / Math.cos(Math.PI / 180 * lat);
      }
      this._point = p.subtract(map.getPixelOrigin());
      this._radius = isNaN(lngR) ? 0 : p.x - map.project([lat2, lng - lngR]).x;
      this._radiusY = p.y - top.y;
    } else {
      var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));
      this._point = map.latLngToLayerPoint(this._latlng);
      this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
    }
    this._updateBounds();
  }
});
var Polyline = Path.extend({
  // @section
  // @aka Polyline options
  options: {
    // @option smoothFactor: Number = 1.0
    // How much to simplify the polyline on each zoom level. More means
    // better performance and smoother look, and less means more accurate representation.
    smoothFactor: 1,
    // @option noClip: Boolean = false
    // Disable polyline clipping.
    noClip: false
  },
  initialize: function(latlngs, options) {
    setOptions(this, options);
    this._setLatLngs(latlngs);
  },
  // @method getLatLngs(): LatLng[]
  // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
  getLatLngs: function() {
    return this._latlngs;
  },
  // @method setLatLngs(latlngs: LatLng[]): this
  // Replaces all the points in the polyline with the given array of geographical points.
  setLatLngs: function(latlngs) {
    this._setLatLngs(latlngs);
    return this.redraw();
  },
  // @method isEmpty(): Boolean
  // Returns `true` if the Polyline has no LatLngs.
  isEmpty: function() {
    return !this._latlngs.length;
  },
  // @method closestLayerPoint(p: Point): Point
  // Returns the point closest to `p` on the Polyline.
  closestLayerPoint: function(p) {
    var minDistance = Infinity, minPoint = null, closest = _sqClosestPointOnSegment, p1, p2;
    for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
      var points = this._parts[j];
      for (var i = 1, len = points.length; i < len; i++) {
        p1 = points[i - 1];
        p2 = points[i];
        var sqDist = closest(p, p1, p2, true);
        if (sqDist < minDistance) {
          minDistance = sqDist;
          minPoint = closest(p, p1, p2);
        }
      }
    }
    if (minPoint) {
      minPoint.distance = Math.sqrt(minDistance);
    }
    return minPoint;
  },
  // @method getCenter(): LatLng
  // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
  getCenter: function() {
    if (!this._map) {
      throw new Error("Must add layer to map before using getCenter()");
    }
    return polylineCenter(this._defaultShape(), this._map.options.crs);
  },
  // @method getBounds(): LatLngBounds
  // Returns the `LatLngBounds` of the path.
  getBounds: function() {
    return this._bounds;
  },
  // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
  // Adds a given point to the polyline. By default, adds to the first ring of
  // the polyline in case of a multi-polyline, but can be overridden by passing
  // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
  addLatLng: function(latlng, latlngs) {
    latlngs = latlngs || this._defaultShape();
    latlng = toLatLng(latlng);
    latlngs.push(latlng);
    this._bounds.extend(latlng);
    return this.redraw();
  },
  _setLatLngs: function(latlngs) {
    this._bounds = new LatLngBounds();
    this._latlngs = this._convertLatLngs(latlngs);
  },
  _defaultShape: function() {
    return isFlat(this._latlngs) ? this._latlngs : this._latlngs[0];
  },
  // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
  _convertLatLngs: function(latlngs) {
    var result = [], flat = isFlat(latlngs);
    for (var i = 0, len = latlngs.length; i < len; i++) {
      if (flat) {
        result[i] = toLatLng(latlngs[i]);
        this._bounds.extend(result[i]);
      } else {
        result[i] = this._convertLatLngs(latlngs[i]);
      }
    }
    return result;
  },
  _project: function() {
    var pxBounds = new Bounds();
    this._rings = [];
    this._projectLatlngs(this._latlngs, this._rings, pxBounds);
    if (this._bounds.isValid() && pxBounds.isValid()) {
      this._rawPxBounds = pxBounds;
      this._updateBounds();
    }
  },
  _updateBounds: function() {
    var w = this._clickTolerance(), p = new Point(w, w);
    if (!this._rawPxBounds) {
      return;
    }
    this._pxBounds = new Bounds([
      this._rawPxBounds.min.subtract(p),
      this._rawPxBounds.max.add(p)
    ]);
  },
  // recursively turns latlngs into a set of rings with projected coordinates
  _projectLatlngs: function(latlngs, result, projectedBounds) {
    var flat = latlngs[0] instanceof LatLng, len = latlngs.length, i, ring;
    if (flat) {
      ring = [];
      for (i = 0; i < len; i++) {
        ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
        projectedBounds.extend(ring[i]);
      }
      result.push(ring);
    } else {
      for (i = 0; i < len; i++) {
        this._projectLatlngs(latlngs[i], result, projectedBounds);
      }
    }
  },
  // clip polyline by renderer bounds so that we have less to render for performance
  _clipPoints: function() {
    var bounds = this._renderer._bounds;
    this._parts = [];
    if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
      return;
    }
    if (this.options.noClip) {
      this._parts = this._rings;
      return;
    }
    var parts = this._parts, i, j, k, len, len2, segment, points;
    for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
      points = this._rings[i];
      for (j = 0, len2 = points.length; j < len2 - 1; j++) {
        segment = clipSegment(points[j], points[j + 1], bounds, j, true);
        if (!segment) {
          continue;
        }
        parts[k] = parts[k] || [];
        parts[k].push(segment[0]);
        if (segment[1] !== points[j + 1] || j === len2 - 2) {
          parts[k].push(segment[1]);
          k++;
        }
      }
    }
  },
  // simplify each clipped part of the polyline for performance
  _simplifyPoints: function() {
    var parts = this._parts, tolerance = this.options.smoothFactor;
    for (var i = 0, len = parts.length; i < len; i++) {
      parts[i] = simplify(parts[i], tolerance);
    }
  },
  _update: function() {
    if (!this._map) {
      return;
    }
    this._clipPoints();
    this._simplifyPoints();
    this._updatePath();
  },
  _updatePath: function() {
    this._renderer._updatePoly(this);
  },
  // Needed by the `Canvas` renderer for interactivity
  _containsPoint: function(p, closed) {
    var i, j, k, len, len2, part, w = this._clickTolerance();
    if (!this._pxBounds || !this._pxBounds.contains(p)) {
      return false;
    }
    for (i = 0, len = this._parts.length; i < len; i++) {
      part = this._parts[i];
      for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
        if (!closed && j === 0) {
          continue;
        }
        if (pointToSegmentDistance(p, part[k], part[j]) <= w) {
          return true;
        }
      }
    }
    return false;
  }
});
Polyline._flat = _flat;
var Polygon = Polyline.extend({
  options: {
    fill: true
  },
  isEmpty: function() {
    return !this._latlngs.length || !this._latlngs[0].length;
  },
  // @method getCenter(): LatLng
  // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
  getCenter: function() {
    if (!this._map) {
      throw new Error("Must add layer to map before using getCenter()");
    }
    return polygonCenter(this._defaultShape(), this._map.options.crs);
  },
  _convertLatLngs: function(latlngs) {
    var result = Polyline.prototype._convertLatLngs.call(this, latlngs), len = result.length;
    if (len >= 2 && result[0] instanceof LatLng && result[0].equals(result[len - 1])) {
      result.pop();
    }
    return result;
  },
  _setLatLngs: function(latlngs) {
    Polyline.prototype._setLatLngs.call(this, latlngs);
    if (isFlat(this._latlngs)) {
      this._latlngs = [this._latlngs];
    }
  },
  _defaultShape: function() {
    return isFlat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
  },
  _clipPoints: function() {
    var bounds = this._renderer._bounds, w = this.options.weight, p = new Point(w, w);
    bounds = new Bounds(bounds.min.subtract(p), bounds.max.add(p));
    this._parts = [];
    if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
      return;
    }
    if (this.options.noClip) {
      this._parts = this._rings;
      return;
    }
    for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
      clipped = clipPolygon(this._rings[i], bounds, true);
      if (clipped.length) {
        this._parts.push(clipped);
      }
    }
  },
  _updatePath: function() {
    this._renderer._updatePoly(this, true);
  },
  // Needed by the `Canvas` renderer for interactivity
  _containsPoint: function(p) {
    var inside = false, part, p1, p2, i, j, k, len, len2;
    if (!this._pxBounds || !this._pxBounds.contains(p)) {
      return false;
    }
    for (i = 0, len = this._parts.length; i < len; i++) {
      part = this._parts[i];
      for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
        p1 = part[j];
        p2 = part[k];
        if (p1.y > p.y !== p2.y > p.y && p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x) {
          inside = !inside;
        }
      }
    }
    return inside || Polyline.prototype._containsPoint.call(this, p, true);
  }
});
var GeoJSON = FeatureGroup.extend({
  /* @section
   * @aka GeoJSON options
   *
   * @option pointToLayer: Function = *
   * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
   * called when data is added, passing the GeoJSON point feature and its `LatLng`.
   * The default is to spawn a default `Marker`:
   * ```js
   * function(geoJsonPoint, latlng) {
   * 	return L.marker(latlng);
   * }
   * ```
   *
   * @option style: Function = *
   * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
   * called internally when data is added.
   * The default value is to not override any defaults:
   * ```js
   * function (geoJsonFeature) {
   * 	return {}
   * }
   * ```
   *
   * @option onEachFeature: Function = *
   * A `Function` that will be called once for each created `Feature`, after it has
   * been created and styled. Useful for attaching events and popups to features.
   * The default is to do nothing with the newly created layers:
   * ```js
   * function (feature, layer) {}
   * ```
   *
   * @option filter: Function = *
   * A `Function` that will be used to decide whether to include a feature or not.
   * The default is to include all features:
   * ```js
   * function (geoJsonFeature) {
   * 	return true;
   * }
   * ```
   * Note: dynamically changing the `filter` option will have effect only on newly
   * added data. It will _not_ re-evaluate already included features.
   *
   * @option coordsToLatLng: Function = *
   * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
   * The default is the `coordsToLatLng` static method.
   *
   * @option markersInheritOptions: Boolean = false
   * Whether default Markers for "Point" type Features inherit from group options.
   */
  initialize: function(geojson, options) {
    setOptions(this, options);
    this._layers = {};
    if (geojson) {
      this.addData(geojson);
    }
  },
  // @method addData( <GeoJSON> data ): this
  // Adds a GeoJSON object to the layer.
  addData: function(geojson) {
    var features = isArray2(geojson) ? geojson : geojson.features, i, len, feature;
    if (features) {
      for (i = 0, len = features.length; i < len; i++) {
        feature = features[i];
        if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
          this.addData(feature);
        }
      }
      return this;
    }
    var options = this.options;
    if (options.filter && !options.filter(geojson)) {
      return this;
    }
    var layer = geometryToLayer(geojson, options);
    if (!layer) {
      return this;
    }
    layer.feature = asFeature(geojson);
    layer.defaultOptions = layer.options;
    this.resetStyle(layer);
    if (options.onEachFeature) {
      options.onEachFeature(geojson, layer);
    }
    return this.addLayer(layer);
  },
  // @method resetStyle( <Path> layer? ): this
  // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
  // If `layer` is omitted, the style of all features in the current layer is reset.
  resetStyle: function(layer) {
    if (layer === void 0) {
      return this.eachLayer(this.resetStyle, this);
    }
    layer.options = extend({}, layer.defaultOptions);
    this._setLayerStyle(layer, this.options.style);
    return this;
  },
  // @method setStyle( <Function> style ): this
  // Changes styles of GeoJSON vector layers with the given style function.
  setStyle: function(style2) {
    return this.eachLayer(function(layer) {
      this._setLayerStyle(layer, style2);
    }, this);
  },
  _setLayerStyle: function(layer, style2) {
    if (layer.setStyle) {
      if (typeof style2 === "function") {
        style2 = style2(layer.feature);
      }
      layer.setStyle(style2);
    }
  }
});
function geometryToLayer(geojson, options) {
  var geometry = geojson.type === "Feature" ? geojson.geometry : geojson, coords = geometry ? geometry.coordinates : null, layers2 = [], pointToLayer = options && options.pointToLayer, _coordsToLatLng = options && options.coordsToLatLng || coordsToLatLng, latlng, latlngs, i, len;
  if (!coords && !geometry) {
    return null;
  }
  switch (geometry.type) {
    case "Point":
      latlng = _coordsToLatLng(coords);
      return _pointToLayer(pointToLayer, geojson, latlng, options);
    case "MultiPoint":
      for (i = 0, len = coords.length; i < len; i++) {
        latlng = _coordsToLatLng(coords[i]);
        layers2.push(_pointToLayer(pointToLayer, geojson, latlng, options));
      }
      return new FeatureGroup(layers2);
    case "LineString":
    case "MultiLineString":
      latlngs = coordsToLatLngs(coords, geometry.type === "LineString" ? 0 : 1, _coordsToLatLng);
      return new Polyline(latlngs, options);
    case "Polygon":
    case "MultiPolygon":
      latlngs = coordsToLatLngs(coords, geometry.type === "Polygon" ? 1 : 2, _coordsToLatLng);
      return new Polygon(latlngs, options);
    case "GeometryCollection":
      for (i = 0, len = geometry.geometries.length; i < len; i++) {
        var geoLayer = geometryToLayer({
          geometry: geometry.geometries[i],
          type: "Feature",
          properties: geojson.properties
        }, options);
        if (geoLayer) {
          layers2.push(geoLayer);
        }
      }
      return new FeatureGroup(layers2);
    case "FeatureCollection":
      for (i = 0, len = geometry.features.length; i < len; i++) {
        var featureLayer = geometryToLayer(geometry.features[i], options);
        if (featureLayer) {
          layers2.push(featureLayer);
        }
      }
      return new FeatureGroup(layers2);
    default:
      throw new Error("Invalid GeoJSON object.");
  }
}
function _pointToLayer(pointToLayerFn, geojson, latlng, options) {
  return pointToLayerFn ? pointToLayerFn(geojson, latlng) : new Marker(latlng, options && options.markersInheritOptions && options);
}
function coordsToLatLng(coords) {
  return new LatLng(coords[1], coords[0], coords[2]);
}
function coordsToLatLngs(coords, levelsDeep, _coordsToLatLng) {
  var latlngs = [];
  for (var i = 0, len = coords.length, latlng; i < len; i++) {
    latlng = levelsDeep ? coordsToLatLngs(coords[i], levelsDeep - 1, _coordsToLatLng) : (_coordsToLatLng || coordsToLatLng)(coords[i]);
    latlngs.push(latlng);
  }
  return latlngs;
}
function latLngToCoords(latlng, precision) {
  latlng = toLatLng(latlng);
  return latlng.alt !== void 0 ? [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision), formatNum(latlng.alt, precision)] : [formatNum(latlng.lng, precision), formatNum(latlng.lat, precision)];
}
function latLngsToCoords(latlngs, levelsDeep, closed, precision) {
  var coords = [];
  for (var i = 0, len = latlngs.length; i < len; i++) {
    coords.push(levelsDeep ? latLngsToCoords(latlngs[i], isFlat(latlngs[i]) ? 0 : levelsDeep - 1, closed, precision) : latLngToCoords(latlngs[i], precision));
  }
  if (!levelsDeep && closed && coords.length > 0) {
    coords.push(coords[0].slice());
  }
  return coords;
}
function getFeature(layer, newGeometry) {
  return layer.feature ? extend({}, layer.feature, { geometry: newGeometry }) : asFeature(newGeometry);
}
function asFeature(geojson) {
  if (geojson.type === "Feature" || geojson.type === "FeatureCollection") {
    return geojson;
  }
  return {
    type: "Feature",
    properties: {},
    geometry: geojson
  };
}
var PointToGeoJSON = {
  toGeoJSON: function(precision) {
    return getFeature(this, {
      type: "Point",
      coordinates: latLngToCoords(this.getLatLng(), precision)
    });
  }
};
Marker.include(PointToGeoJSON);
Circle.include(PointToGeoJSON);
CircleMarker.include(PointToGeoJSON);
Polyline.include({
  toGeoJSON: function(precision) {
    var multi = !isFlat(this._latlngs);
    var coords = latLngsToCoords(this._latlngs, multi ? 1 : 0, false, precision);
    return getFeature(this, {
      type: (multi ? "Multi" : "") + "LineString",
      coordinates: coords
    });
  }
});
Polygon.include({
  toGeoJSON: function(precision) {
    var holes = !isFlat(this._latlngs), multi = holes && !isFlat(this._latlngs[0]);
    var coords = latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true, precision);
    if (!holes) {
      coords = [coords];
    }
    return getFeature(this, {
      type: (multi ? "Multi" : "") + "Polygon",
      coordinates: coords
    });
  }
});
LayerGroup.include({
  toMultiPoint: function(precision) {
    var coords = [];
    this.eachLayer(function(layer) {
      coords.push(layer.toGeoJSON(precision).geometry.coordinates);
    });
    return getFeature(this, {
      type: "MultiPoint",
      coordinates: coords
    });
  },
  // @method toGeoJSON(precision?: Number|false): Object
  // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
  // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
  toGeoJSON: function(precision) {
    var type = this.feature && this.feature.geometry && this.feature.geometry.type;
    if (type === "MultiPoint") {
      return this.toMultiPoint(precision);
    }
    var isGeometryCollection = type === "GeometryCollection", jsons = [];
    this.eachLayer(function(layer) {
      if (layer.toGeoJSON) {
        var json = layer.toGeoJSON(precision);
        if (isGeometryCollection) {
          jsons.push(json.geometry);
        } else {
          var feature = asFeature(json);
          if (feature.type === "FeatureCollection") {
            jsons.push.apply(jsons, feature.features);
          } else {
            jsons.push(feature);
          }
        }
      }
    });
    if (isGeometryCollection) {
      return getFeature(this, {
        geometries: jsons,
        type: "GeometryCollection"
      });
    }
    return {
      type: "FeatureCollection",
      features: jsons
    };
  }
});
function geoJSON(geojson, options) {
  return new GeoJSON(geojson, options);
}
var geoJson = geoJSON;
var ImageOverlay = Layer.extend({
  // @section
  // @aka ImageOverlay options
  options: {
    // @option opacity: Number = 1.0
    // The opacity of the image overlay.
    opacity: 1,
    // @option alt: String = ''
    // Text for the `alt` attribute of the image (useful for accessibility).
    alt: "",
    // @option interactive: Boolean = false
    // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
    interactive: false,
    // @option crossOrigin: Boolean|String = false
    // Whether the crossOrigin attribute will be added to the image.
    // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
    // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
    crossOrigin: false,
    // @option errorOverlayUrl: String = ''
    // URL to the overlay image to show in place of the overlay that failed to load.
    errorOverlayUrl: "",
    // @option zIndex: Number = 1
    // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
    zIndex: 1,
    // @option className: String = ''
    // A custom class name to assign to the image. Empty by default.
    className: ""
  },
  initialize: function(url, bounds, options) {
    this._url = url;
    this._bounds = toLatLngBounds(bounds);
    setOptions(this, options);
  },
  onAdd: function() {
    if (!this._image) {
      this._initImage();
      if (this.options.opacity < 1) {
        this._updateOpacity();
      }
    }
    if (this.options.interactive) {
      addClass(this._image, "leaflet-interactive");
      this.addInteractiveTarget(this._image);
    }
    this.getPane().appendChild(this._image);
    this._reset();
  },
  onRemove: function() {
    remove(this._image);
    if (this.options.interactive) {
      this.removeInteractiveTarget(this._image);
    }
  },
  // @method setOpacity(opacity: Number): this
  // Sets the opacity of the overlay.
  setOpacity: function(opacity) {
    this.options.opacity = opacity;
    if (this._image) {
      this._updateOpacity();
    }
    return this;
  },
  setStyle: function(styleOpts) {
    if (styleOpts.opacity) {
      this.setOpacity(styleOpts.opacity);
    }
    return this;
  },
  // @method bringToFront(): this
  // Brings the layer to the top of all overlays.
  bringToFront: function() {
    if (this._map) {
      toFront(this._image);
    }
    return this;
  },
  // @method bringToBack(): this
  // Brings the layer to the bottom of all overlays.
  bringToBack: function() {
    if (this._map) {
      toBack(this._image);
    }
    return this;
  },
  // @method setUrl(url: String): this
  // Changes the URL of the image.
  setUrl: function(url) {
    this._url = url;
    if (this._image) {
      this._image.src = url;
    }
    return this;
  },
  // @method setBounds(bounds: LatLngBounds): this
  // Update the bounds that this ImageOverlay covers
  setBounds: function(bounds) {
    this._bounds = toLatLngBounds(bounds);
    if (this._map) {
      this._reset();
    }
    return this;
  },
  getEvents: function() {
    var events = {
      zoom: this._reset,
      viewreset: this._reset
    };
    if (this._zoomAnimated) {
      events.zoomanim = this._animateZoom;
    }
    return events;
  },
  // @method setZIndex(value: Number): this
  // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
  setZIndex: function(value) {
    this.options.zIndex = value;
    this._updateZIndex();
    return this;
  },
  // @method getBounds(): LatLngBounds
  // Get the bounds that this ImageOverlay covers
  getBounds: function() {
    return this._bounds;
  },
  // @method getElement(): HTMLElement
  // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
  // used by this overlay.
  getElement: function() {
    return this._image;
  },
  _initImage: function() {
    var wasElementSupplied = this._url.tagName === "IMG";
    var img = this._image = wasElementSupplied ? this._url : create$1("img");
    addClass(img, "leaflet-image-layer");
    if (this._zoomAnimated) {
      addClass(img, "leaflet-zoom-animated");
    }
    if (this.options.className) {
      addClass(img, this.options.className);
    }
    img.onselectstart = falseFn;
    img.onmousemove = falseFn;
    img.onload = bind3(this.fire, this, "load");
    img.onerror = bind3(this._overlayOnError, this, "error");
    if (this.options.crossOrigin || this.options.crossOrigin === "") {
      img.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
    }
    if (this.options.zIndex) {
      this._updateZIndex();
    }
    if (wasElementSupplied) {
      this._url = img.src;
      return;
    }
    img.src = this._url;
    img.alt = this.options.alt;
  },
  _animateZoom: function(e) {
    var scale2 = this._map.getZoomScale(e.zoom), offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;
    setTransform(this._image, offset, scale2);
  },
  _reset: function() {
    var image = this._image, bounds = new Bounds(
      this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
      this._map.latLngToLayerPoint(this._bounds.getSouthEast())
    ), size2 = bounds.getSize();
    setPosition(image, bounds.min);
    image.style.width = size2.x + "px";
    image.style.height = size2.y + "px";
  },
  _updateOpacity: function() {
    setOpacity(this._image, this.options.opacity);
  },
  _updateZIndex: function() {
    if (this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
      this._image.style.zIndex = this.options.zIndex;
    }
  },
  _overlayOnError: function() {
    this.fire("error");
    var errorUrl = this.options.errorOverlayUrl;
    if (errorUrl && this._url !== errorUrl) {
      this._url = errorUrl;
      this._image.src = errorUrl;
    }
  },
  // @method getCenter(): LatLng
  // Returns the center of the ImageOverlay.
  getCenter: function() {
    return this._bounds.getCenter();
  }
});
var VideoOverlay = ImageOverlay.extend({
  // @section
  // @aka VideoOverlay options
  options: {
    // @option autoplay: Boolean = true
    // Whether the video starts playing automatically when loaded.
    // On some browsers autoplay will only work with `muted: true`
    autoplay: true,
    // @option loop: Boolean = true
    // Whether the video will loop back to the beginning when played.
    loop: true,
    // @option keepAspectRatio: Boolean = true
    // Whether the video will save aspect ratio after the projection.
    // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
    keepAspectRatio: true,
    // @option muted: Boolean = false
    // Whether the video starts on mute when loaded.
    muted: false,
    // @option playsInline: Boolean = true
    // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
    playsInline: true
  },
  _initImage: function() {
    var wasElementSupplied = this._url.tagName === "VIDEO";
    var vid = this._image = wasElementSupplied ? this._url : create$1("video");
    addClass(vid, "leaflet-image-layer");
    if (this._zoomAnimated) {
      addClass(vid, "leaflet-zoom-animated");
    }
    if (this.options.className) {
      addClass(vid, this.options.className);
    }
    vid.onselectstart = falseFn;
    vid.onmousemove = falseFn;
    vid.onloadeddata = bind3(this.fire, this, "load");
    if (wasElementSupplied) {
      var sourceElements = vid.getElementsByTagName("source");
      var sources = [];
      for (var j = 0; j < sourceElements.length; j++) {
        sources.push(sourceElements[j].src);
      }
      this._url = sourceElements.length > 0 ? sources : [vid.src];
      return;
    }
    if (!isArray2(this._url)) {
      this._url = [this._url];
    }
    if (!this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(vid.style, "objectFit")) {
      vid.style["objectFit"] = "fill";
    }
    vid.autoplay = !!this.options.autoplay;
    vid.loop = !!this.options.loop;
    vid.muted = !!this.options.muted;
    vid.playsInline = !!this.options.playsInline;
    for (var i = 0; i < this._url.length; i++) {
      var source = create$1("source");
      source.src = this._url[i];
      vid.appendChild(source);
    }
  }
  // @method getElement(): HTMLVideoElement
  // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
  // used by this overlay.
});
var SVGOverlay = ImageOverlay.extend({
  _initImage: function() {
    var el = this._image = this._url;
    addClass(el, "leaflet-image-layer");
    if (this._zoomAnimated) {
      addClass(el, "leaflet-zoom-animated");
    }
    if (this.options.className) {
      addClass(el, this.options.className);
    }
    el.onselectstart = falseFn;
    el.onmousemove = falseFn;
  }
  // @method getElement(): SVGElement
  // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
  // used by this overlay.
});
var DivOverlay = Layer.extend({
  // @section
  // @aka DivOverlay options
  options: {
    // @option interactive: Boolean = false
    // If true, the popup/tooltip will listen to the mouse events.
    interactive: false,
    // @option offset: Point = Point(0, 0)
    // The offset of the overlay position.
    offset: [0, 0],
    // @option className: String = ''
    // A custom CSS class name to assign to the overlay.
    className: "",
    // @option pane: String = undefined
    // `Map pane` where the overlay will be added.
    pane: void 0,
    // @option content: String|HTMLElement|Function = ''
    // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
    // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
    content: ""
  },
  initialize: function(options, source) {
    if (options && (options instanceof LatLng || isArray2(options))) {
      this._latlng = toLatLng(options);
      setOptions(this, source);
    } else {
      setOptions(this, options);
      this._source = source;
    }
    if (this.options.content) {
      this._content = this.options.content;
    }
  },
  // @method openOn(map: Map): this
  // Adds the overlay to the map.
  // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
  openOn: function(map) {
    map = arguments.length ? map : this._source._map;
    if (!map.hasLayer(this)) {
      map.addLayer(this);
    }
    return this;
  },
  // @method close(): this
  // Closes the overlay.
  // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
  // and `layer.closePopup()`/`.closeTooltip()`.
  close: function() {
    if (this._map) {
      this._map.removeLayer(this);
    }
    return this;
  },
  // @method toggle(layer?: Layer): this
  // Opens or closes the overlay bound to layer depending on its current state.
  // Argument may be omitted only for overlay bound to layer.
  // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
  toggle: function(layer) {
    if (this._map) {
      this.close();
    } else {
      if (arguments.length) {
        this._source = layer;
      } else {
        layer = this._source;
      }
      this._prepareOpen();
      this.openOn(layer._map);
    }
    return this;
  },
  onAdd: function(map) {
    this._zoomAnimated = map._zoomAnimated;
    if (!this._container) {
      this._initLayout();
    }
    if (map._fadeAnimated) {
      setOpacity(this._container, 0);
    }
    clearTimeout(this._removeTimeout);
    this.getPane().appendChild(this._container);
    this.update();
    if (map._fadeAnimated) {
      setOpacity(this._container, 1);
    }
    this.bringToFront();
    if (this.options.interactive) {
      addClass(this._container, "leaflet-interactive");
      this.addInteractiveTarget(this._container);
    }
  },
  onRemove: function(map) {
    if (map._fadeAnimated) {
      setOpacity(this._container, 0);
      this._removeTimeout = setTimeout(bind3(remove, void 0, this._container), 200);
    } else {
      remove(this._container);
    }
    if (this.options.interactive) {
      removeClass(this._container, "leaflet-interactive");
      this.removeInteractiveTarget(this._container);
    }
  },
  // @namespace DivOverlay
  // @method getLatLng: LatLng
  // Returns the geographical point of the overlay.
  getLatLng: function() {
    return this._latlng;
  },
  // @method setLatLng(latlng: LatLng): this
  // Sets the geographical point where the overlay will open.
  setLatLng: function(latlng) {
    this._latlng = toLatLng(latlng);
    if (this._map) {
      this._updatePosition();
      this._adjustPan();
    }
    return this;
  },
  // @method getContent: String|HTMLElement
  // Returns the content of the overlay.
  getContent: function() {
    return this._content;
  },
  // @method setContent(htmlContent: String|HTMLElement|Function): this
  // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
  // The function should return a `String` or `HTMLElement` to be used in the overlay.
  setContent: function(content) {
    this._content = content;
    this.update();
    return this;
  },
  // @method getElement: String|HTMLElement
  // Returns the HTML container of the overlay.
  getElement: function() {
    return this._container;
  },
  // @method update: null
  // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
  update: function() {
    if (!this._map) {
      return;
    }
    this._container.style.visibility = "hidden";
    this._updateContent();
    this._updateLayout();
    this._updatePosition();
    this._container.style.visibility = "";
    this._adjustPan();
  },
  getEvents: function() {
    var events = {
      zoom: this._updatePosition,
      viewreset: this._updatePosition
    };
    if (this._zoomAnimated) {
      events.zoomanim = this._animateZoom;
    }
    return events;
  },
  // @method isOpen: Boolean
  // Returns `true` when the overlay is visible on the map.
  isOpen: function() {
    return !!this._map && this._map.hasLayer(this);
  },
  // @method bringToFront: this
  // Brings this overlay in front of other overlays (in the same map pane).
  bringToFront: function() {
    if (this._map) {
      toFront(this._container);
    }
    return this;
  },
  // @method bringToBack: this
  // Brings this overlay to the back of other overlays (in the same map pane).
  bringToBack: function() {
    if (this._map) {
      toBack(this._container);
    }
    return this;
  },
  // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
  _prepareOpen: function(latlng) {
    var source = this._source;
    if (!source._map) {
      return false;
    }
    if (source instanceof FeatureGroup) {
      source = null;
      var layers2 = this._source._layers;
      for (var id in layers2) {
        if (layers2[id]._map) {
          source = layers2[id];
          break;
        }
      }
      if (!source) {
        return false;
      }
      this._source = source;
    }
    if (!latlng) {
      if (source.getCenter) {
        latlng = source.getCenter();
      } else if (source.getLatLng) {
        latlng = source.getLatLng();
      } else if (source.getBounds) {
        latlng = source.getBounds().getCenter();
      } else {
        throw new Error("Unable to get source layer LatLng.");
      }
    }
    this.setLatLng(latlng);
    if (this._map) {
      this.update();
    }
    return true;
  },
  _updateContent: function() {
    if (!this._content) {
      return;
    }
    var node = this._contentNode;
    var content = typeof this._content === "function" ? this._content(this._source || this) : this._content;
    if (typeof content === "string") {
      node.innerHTML = content;
    } else {
      while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
      }
      node.appendChild(content);
    }
    this.fire("contentupdate");
  },
  _updatePosition: function() {
    if (!this._map) {
      return;
    }
    var pos = this._map.latLngToLayerPoint(this._latlng), offset = toPoint(this.options.offset), anchor = this._getAnchor();
    if (this._zoomAnimated) {
      setPosition(this._container, pos.add(anchor));
    } else {
      offset = offset.add(pos).add(anchor);
    }
    var bottom = this._containerBottom = -offset.y, left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;
    this._container.style.bottom = bottom + "px";
    this._container.style.left = left + "px";
  },
  _getAnchor: function() {
    return [0, 0];
  }
});
Map2.include({
  _initOverlay: function(OverlayClass, content, latlng, options) {
    var overlay = content;
    if (!(overlay instanceof OverlayClass)) {
      overlay = new OverlayClass(options).setContent(content);
    }
    if (latlng) {
      overlay.setLatLng(latlng);
    }
    return overlay;
  }
});
Layer.include({
  _initOverlay: function(OverlayClass, old, content, options) {
    var overlay = content;
    if (overlay instanceof OverlayClass) {
      setOptions(overlay, options);
      overlay._source = this;
    } else {
      overlay = old && !options ? old : new OverlayClass(options, this);
      overlay.setContent(content);
    }
    return overlay;
  }
});
var Popup = DivOverlay.extend({
  // @section
  // @aka Popup options
  options: {
    // @option pane: String = 'popupPane'
    // `Map pane` where the popup will be added.
    pane: "popupPane",
    // @option offset: Point = Point(0, 7)
    // The offset of the popup position.
    offset: [0, 7],
    // @option maxWidth: Number = 300
    // Max width of the popup, in pixels.
    maxWidth: 300,
    // @option minWidth: Number = 50
    // Min width of the popup, in pixels.
    minWidth: 50,
    // @option maxHeight: Number = null
    // If set, creates a scrollable container of the given height
    // inside a popup if its content exceeds it.
    // The scrollable container can be styled using the
    // `leaflet-popup-scrolled` CSS class selector.
    maxHeight: null,
    // @option autoPan: Boolean = true
    // Set it to `false` if you don't want the map to do panning animation
    // to fit the opened popup.
    autoPan: true,
    // @option autoPanPaddingTopLeft: Point = null
    // The margin between the popup and the top left corner of the map
    // view after autopanning was performed.
    autoPanPaddingTopLeft: null,
    // @option autoPanPaddingBottomRight: Point = null
    // The margin between the popup and the bottom right corner of the map
    // view after autopanning was performed.
    autoPanPaddingBottomRight: null,
    // @option autoPanPadding: Point = Point(5, 5)
    // Equivalent of setting both top left and bottom right autopan padding to the same value.
    autoPanPadding: [5, 5],
    // @option keepInView: Boolean = false
    // Set it to `true` if you want to prevent users from panning the popup
    // off of the screen while it is open.
    keepInView: false,
    // @option closeButton: Boolean = true
    // Controls the presence of a close button in the popup.
    closeButton: true,
    // @option autoClose: Boolean = true
    // Set it to `false` if you want to override the default behavior of
    // the popup closing when another popup is opened.
    autoClose: true,
    // @option closeOnEscapeKey: Boolean = true
    // Set it to `false` if you want to override the default behavior of
    // the ESC key for closing of the popup.
    closeOnEscapeKey: true,
    // @option closeOnClick: Boolean = *
    // Set it if you want to override the default behavior of the popup closing when user clicks
    // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
    // @option className: String = ''
    // A custom CSS class name to assign to the popup.
    className: ""
  },
  // @namespace Popup
  // @method openOn(map: Map): this
  // Alternative to `map.openPopup(popup)`.
  // Adds the popup to the map and closes the previous one.
  openOn: function(map) {
    map = arguments.length ? map : this._source._map;
    if (!map.hasLayer(this) && map._popup && map._popup.options.autoClose) {
      map.removeLayer(map._popup);
    }
    map._popup = this;
    return DivOverlay.prototype.openOn.call(this, map);
  },
  onAdd: function(map) {
    DivOverlay.prototype.onAdd.call(this, map);
    map.fire("popupopen", { popup: this });
    if (this._source) {
      this._source.fire("popupopen", { popup: this }, true);
      if (!(this._source instanceof Path)) {
        this._source.on("preclick", stopPropagation);
      }
    }
  },
  onRemove: function(map) {
    DivOverlay.prototype.onRemove.call(this, map);
    map.fire("popupclose", { popup: this });
    if (this._source) {
      this._source.fire("popupclose", { popup: this }, true);
      if (!(this._source instanceof Path)) {
        this._source.off("preclick", stopPropagation);
      }
    }
  },
  getEvents: function() {
    var events = DivOverlay.prototype.getEvents.call(this);
    if (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
      events.preclick = this.close;
    }
    if (this.options.keepInView) {
      events.moveend = this._adjustPan;
    }
    return events;
  },
  _initLayout: function() {
    var prefix2 = "leaflet-popup", container = this._container = create$1(
      "div",
      prefix2 + " " + (this.options.className || "") + " leaflet-zoom-animated"
    );
    var wrapper = this._wrapper = create$1("div", prefix2 + "-content-wrapper", container);
    this._contentNode = create$1("div", prefix2 + "-content", wrapper);
    disableClickPropagation(container);
    disableScrollPropagation(this._contentNode);
    on2(container, "contextmenu", stopPropagation);
    this._tipContainer = create$1("div", prefix2 + "-tip-container", container);
    this._tip = create$1("div", prefix2 + "-tip", this._tipContainer);
    if (this.options.closeButton) {
      var closeButton = this._closeButton = create$1("a", prefix2 + "-close-button", container);
      closeButton.setAttribute("role", "button");
      closeButton.setAttribute("aria-label", "Close popup");
      closeButton.href = "#close";
      closeButton.innerHTML = '<span aria-hidden="true">&#215;</span>';
      on2(closeButton, "click", function(ev) {
        preventDefault(ev);
        this.close();
      }, this);
    }
  },
  _updateLayout: function() {
    var container = this._contentNode, style2 = container.style;
    style2.width = "";
    style2.whiteSpace = "nowrap";
    var width = container.offsetWidth;
    width = Math.min(width, this.options.maxWidth);
    width = Math.max(width, this.options.minWidth);
    style2.width = width + 1 + "px";
    style2.whiteSpace = "";
    style2.height = "";
    var height = container.offsetHeight, maxHeight = this.options.maxHeight, scrolledClass = "leaflet-popup-scrolled";
    if (maxHeight && height > maxHeight) {
      style2.height = maxHeight + "px";
      addClass(container, scrolledClass);
    } else {
      removeClass(container, scrolledClass);
    }
    this._containerWidth = this._container.offsetWidth;
  },
  _animateZoom: function(e) {
    var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center), anchor = this._getAnchor();
    setPosition(this._container, pos.add(anchor));
  },
  _adjustPan: function() {
    if (!this.options.autoPan) {
      return;
    }
    if (this._map._panAnim) {
      this._map._panAnim.stop();
    }
    if (this._autopanning) {
      this._autopanning = false;
      return;
    }
    var map = this._map, marginBottom = parseInt(getStyle(this._container, "marginBottom"), 10) || 0, containerHeight = this._container.offsetHeight + marginBottom, containerWidth = this._containerWidth, layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);
    layerPos._add(getPosition(this._container));
    var containerPos = map.layerPointToContainerPoint(layerPos), padding = toPoint(this.options.autoPanPadding), paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding), paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding), size2 = map.getSize(), dx = 0, dy = 0;
    if (containerPos.x + containerWidth + paddingBR.x > size2.x) {
      dx = containerPos.x + containerWidth - size2.x + paddingBR.x;
    }
    if (containerPos.x - dx - paddingTL.x < 0) {
      dx = containerPos.x - paddingTL.x;
    }
    if (containerPos.y + containerHeight + paddingBR.y > size2.y) {
      dy = containerPos.y + containerHeight - size2.y + paddingBR.y;
    }
    if (containerPos.y - dy - paddingTL.y < 0) {
      dy = containerPos.y - paddingTL.y;
    }
    if (dx || dy) {
      if (this.options.keepInView) {
        this._autopanning = true;
      }
      map.fire("autopanstart").panBy([dx, dy]);
    }
  },
  _getAnchor: function() {
    return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
  }
});
Map2.mergeOptions({
  closePopupOnClick: true
});
Map2.include({
  // @method openPopup(popup: Popup): this
  // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
  // @alternative
  // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
  // Creates a popup with the specified content and options and opens it in the given point on a map.
  openPopup: function(popup, latlng, options) {
    this._initOverlay(Popup, popup, latlng, options).openOn(this);
    return this;
  },
  // @method closePopup(popup?: Popup): this
  // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
  closePopup: function(popup) {
    popup = arguments.length ? popup : this._popup;
    if (popup) {
      popup.close();
    }
    return this;
  }
});
Layer.include({
  // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
  // Binds a popup to the layer with the passed `content` and sets up the
  // necessary event listeners. If a `Function` is passed it will receive
  // the layer as the first argument and should return a `String` or `HTMLElement`.
  bindPopup: function(content, options) {
    this._popup = this._initOverlay(Popup, this._popup, content, options);
    if (!this._popupHandlersAdded) {
      this.on({
        click: this._openPopup,
        keypress: this._onKeyPress,
        remove: this.closePopup,
        move: this._movePopup
      });
      this._popupHandlersAdded = true;
    }
    return this;
  },
  // @method unbindPopup(): this
  // Removes the popup previously bound with `bindPopup`.
  unbindPopup: function() {
    if (this._popup) {
      this.off({
        click: this._openPopup,
        keypress: this._onKeyPress,
        remove: this.closePopup,
        move: this._movePopup
      });
      this._popupHandlersAdded = false;
      this._popup = null;
    }
    return this;
  },
  // @method openPopup(latlng?: LatLng): this
  // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
  openPopup: function(latlng) {
    if (this._popup) {
      if (!(this instanceof FeatureGroup)) {
        this._popup._source = this;
      }
      if (this._popup._prepareOpen(latlng || this._latlng)) {
        this._popup.openOn(this._map);
      }
    }
    return this;
  },
  // @method closePopup(): this
  // Closes the popup bound to this layer if it is open.
  closePopup: function() {
    if (this._popup) {
      this._popup.close();
    }
    return this;
  },
  // @method togglePopup(): this
  // Opens or closes the popup bound to this layer depending on its current state.
  togglePopup: function() {
    if (this._popup) {
      this._popup.toggle(this);
    }
    return this;
  },
  // @method isPopupOpen(): boolean
  // Returns `true` if the popup bound to this layer is currently open.
  isPopupOpen: function() {
    return this._popup ? this._popup.isOpen() : false;
  },
  // @method setPopupContent(content: String|HTMLElement|Popup): this
  // Sets the content of the popup bound to this layer.
  setPopupContent: function(content) {
    if (this._popup) {
      this._popup.setContent(content);
    }
    return this;
  },
  // @method getPopup(): Popup
  // Returns the popup bound to this layer.
  getPopup: function() {
    return this._popup;
  },
  _openPopup: function(e) {
    if (!this._popup || !this._map) {
      return;
    }
    stop2(e);
    var target = e.layer || e.target;
    if (this._popup._source === target && !(target instanceof Path)) {
      if (this._map.hasLayer(this._popup)) {
        this.closePopup();
      } else {
        this.openPopup(e.latlng);
      }
      return;
    }
    this._popup._source = target;
    this.openPopup(e.latlng);
  },
  _movePopup: function(e) {
    this._popup.setLatLng(e.latlng);
  },
  _onKeyPress: function(e) {
    if (e.originalEvent.keyCode === 13) {
      this._openPopup(e);
    }
  }
});
var Tooltip = DivOverlay.extend({
  // @section
  // @aka Tooltip options
  options: {
    // @option pane: String = 'tooltipPane'
    // `Map pane` where the tooltip will be added.
    pane: "tooltipPane",
    // @option offset: Point = Point(0, 0)
    // Optional offset of the tooltip position.
    offset: [0, 0],
    // @option direction: String = 'auto'
    // Direction where to open the tooltip. Possible values are: `right`, `left`,
    // `top`, `bottom`, `center`, `auto`.
    // `auto` will dynamically switch between `right` and `left` according to the tooltip
    // position on the map.
    direction: "auto",
    // @option permanent: Boolean = false
    // Whether to open the tooltip permanently or only on mouseover.
    permanent: false,
    // @option sticky: Boolean = false
    // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
    sticky: false,
    // @option opacity: Number = 0.9
    // Tooltip container opacity.
    opacity: 0.9
  },
  onAdd: function(map) {
    DivOverlay.prototype.onAdd.call(this, map);
    this.setOpacity(this.options.opacity);
    map.fire("tooltipopen", { tooltip: this });
    if (this._source) {
      this.addEventParent(this._source);
      this._source.fire("tooltipopen", { tooltip: this }, true);
    }
  },
  onRemove: function(map) {
    DivOverlay.prototype.onRemove.call(this, map);
    map.fire("tooltipclose", { tooltip: this });
    if (this._source) {
      this.removeEventParent(this._source);
      this._source.fire("tooltipclose", { tooltip: this }, true);
    }
  },
  getEvents: function() {
    var events = DivOverlay.prototype.getEvents.call(this);
    if (!this.options.permanent) {
      events.preclick = this.close;
    }
    return events;
  },
  _initLayout: function() {
    var prefix2 = "leaflet-tooltip", className = prefix2 + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
    this._contentNode = this._container = create$1("div", className);
    this._container.setAttribute("role", "tooltip");
    this._container.setAttribute("id", "leaflet-tooltip-" + stamp(this));
  },
  _updateLayout: function() {
  },
  _adjustPan: function() {
  },
  _setPosition: function(pos) {
    var subX, subY, map = this._map, container = this._container, centerPoint = map.latLngToContainerPoint(map.getCenter()), tooltipPoint = map.layerPointToContainerPoint(pos), direction = this.options.direction, tooltipWidth = container.offsetWidth, tooltipHeight = container.offsetHeight, offset = toPoint(this.options.offset), anchor = this._getAnchor();
    if (direction === "top") {
      subX = tooltipWidth / 2;
      subY = tooltipHeight;
    } else if (direction === "bottom") {
      subX = tooltipWidth / 2;
      subY = 0;
    } else if (direction === "center") {
      subX = tooltipWidth / 2;
      subY = tooltipHeight / 2;
    } else if (direction === "right") {
      subX = 0;
      subY = tooltipHeight / 2;
    } else if (direction === "left") {
      subX = tooltipWidth;
      subY = tooltipHeight / 2;
    } else if (tooltipPoint.x < centerPoint.x) {
      direction = "right";
      subX = 0;
      subY = tooltipHeight / 2;
    } else {
      direction = "left";
      subX = tooltipWidth + (offset.x + anchor.x) * 2;
      subY = tooltipHeight / 2;
    }
    pos = pos.subtract(toPoint(subX, subY, true)).add(offset).add(anchor);
    removeClass(container, "leaflet-tooltip-right");
    removeClass(container, "leaflet-tooltip-left");
    removeClass(container, "leaflet-tooltip-top");
    removeClass(container, "leaflet-tooltip-bottom");
    addClass(container, "leaflet-tooltip-" + direction);
    setPosition(container, pos);
  },
  _updatePosition: function() {
    var pos = this._map.latLngToLayerPoint(this._latlng);
    this._setPosition(pos);
  },
  setOpacity: function(opacity) {
    this.options.opacity = opacity;
    if (this._container) {
      setOpacity(this._container, opacity);
    }
  },
  _animateZoom: function(e) {
    var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
    this._setPosition(pos);
  },
  _getAnchor: function() {
    return toPoint(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
  }
});
Map2.include({
  // @method openTooltip(tooltip: Tooltip): this
  // Opens the specified tooltip.
  // @alternative
  // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
  // Creates a tooltip with the specified content and options and open it.
  openTooltip: function(tooltip, latlng, options) {
    this._initOverlay(Tooltip, tooltip, latlng, options).openOn(this);
    return this;
  },
  // @method closeTooltip(tooltip: Tooltip): this
  // Closes the tooltip given as parameter.
  closeTooltip: function(tooltip) {
    tooltip.close();
    return this;
  }
});
Layer.include({
  // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
  // Binds a tooltip to the layer with the passed `content` and sets up the
  // necessary event listeners. If a `Function` is passed it will receive
  // the layer as the first argument and should return a `String` or `HTMLElement`.
  bindTooltip: function(content, options) {
    if (this._tooltip && this.isTooltipOpen()) {
      this.unbindTooltip();
    }
    this._tooltip = this._initOverlay(Tooltip, this._tooltip, content, options);
    this._initTooltipInteractions();
    if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
      this.openTooltip();
    }
    return this;
  },
  // @method unbindTooltip(): this
  // Removes the tooltip previously bound with `bindTooltip`.
  unbindTooltip: function() {
    if (this._tooltip) {
      this._initTooltipInteractions(true);
      this.closeTooltip();
      this._tooltip = null;
    }
    return this;
  },
  _initTooltipInteractions: function(remove2) {
    if (!remove2 && this._tooltipHandlersAdded) {
      return;
    }
    var onOff = remove2 ? "off" : "on", events = {
      remove: this.closeTooltip,
      move: this._moveTooltip
    };
    if (!this._tooltip.options.permanent) {
      events.mouseover = this._openTooltip;
      events.mouseout = this.closeTooltip;
      events.click = this._openTooltip;
      if (this._map) {
        this._addFocusListeners();
      } else {
        events.add = this._addFocusListeners;
      }
    } else {
      events.add = this._openTooltip;
    }
    if (this._tooltip.options.sticky) {
      events.mousemove = this._moveTooltip;
    }
    this[onOff](events);
    this._tooltipHandlersAdded = !remove2;
  },
  // @method openTooltip(latlng?: LatLng): this
  // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
  openTooltip: function(latlng) {
    if (this._tooltip) {
      if (!(this instanceof FeatureGroup)) {
        this._tooltip._source = this;
      }
      if (this._tooltip._prepareOpen(latlng)) {
        this._tooltip.openOn(this._map);
        if (this.getElement) {
          this._setAriaDescribedByOnLayer(this);
        } else if (this.eachLayer) {
          this.eachLayer(this._setAriaDescribedByOnLayer, this);
        }
      }
    }
    return this;
  },
  // @method closeTooltip(): this
  // Closes the tooltip bound to this layer if it is open.
  closeTooltip: function() {
    if (this._tooltip) {
      return this._tooltip.close();
    }
  },
  // @method toggleTooltip(): this
  // Opens or closes the tooltip bound to this layer depending on its current state.
  toggleTooltip: function() {
    if (this._tooltip) {
      this._tooltip.toggle(this);
    }
    return this;
  },
  // @method isTooltipOpen(): boolean
  // Returns `true` if the tooltip bound to this layer is currently open.
  isTooltipOpen: function() {
    return this._tooltip.isOpen();
  },
  // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
  // Sets the content of the tooltip bound to this layer.
  setTooltipContent: function(content) {
    if (this._tooltip) {
      this._tooltip.setContent(content);
    }
    return this;
  },
  // @method getTooltip(): Tooltip
  // Returns the tooltip bound to this layer.
  getTooltip: function() {
    return this._tooltip;
  },
  _addFocusListeners: function() {
    if (this.getElement) {
      this._addFocusListenersOnLayer(this);
    } else if (this.eachLayer) {
      this.eachLayer(this._addFocusListenersOnLayer, this);
    }
  },
  _addFocusListenersOnLayer: function(layer) {
    var el = typeof layer.getElement === "function" && layer.getElement();
    if (el) {
      on2(el, "focus", function() {
        this._tooltip._source = layer;
        this.openTooltip();
      }, this);
      on2(el, "blur", this.closeTooltip, this);
    }
  },
  _setAriaDescribedByOnLayer: function(layer) {
    var el = typeof layer.getElement === "function" && layer.getElement();
    if (el) {
      el.setAttribute("aria-describedby", this._tooltip._container.id);
    }
  },
  _openTooltip: function(e) {
    if (!this._tooltip || !this._map) {
      return;
    }
    if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
      this._openOnceFlag = true;
      var that = this;
      this._map.once("moveend", function() {
        that._openOnceFlag = false;
        that._openTooltip(e);
      });
      return;
    }
    this._tooltip._source = e.layer || e.target;
    this.openTooltip(this._tooltip.options.sticky ? e.latlng : void 0);
  },
  _moveTooltip: function(e) {
    var latlng = e.latlng, containerPoint, layerPoint;
    if (this._tooltip.options.sticky && e.originalEvent) {
      containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
      layerPoint = this._map.containerPointToLayerPoint(containerPoint);
      latlng = this._map.layerPointToLatLng(layerPoint);
    }
    this._tooltip.setLatLng(latlng);
  }
});
var DivIcon = Icon.extend({
  options: {
    // @section
    // @aka DivIcon options
    iconSize: [12, 12],
    // also can be set through CSS
    // iconAnchor: (Point),
    // popupAnchor: (Point),
    // @option html: String|HTMLElement = ''
    // Custom HTML code to put inside the div element, empty by default. Alternatively,
    // an instance of `HTMLElement`.
    html: false,
    // @option bgPos: Point = [0, 0]
    // Optional relative position of the background, in pixels
    bgPos: null,
    className: "leaflet-div-icon"
  },
  createIcon: function(oldIcon) {
    var div = oldIcon && oldIcon.tagName === "DIV" ? oldIcon : document.createElement("div"), options = this.options;
    if (options.html instanceof Element) {
      empty(div);
      div.appendChild(options.html);
    } else {
      div.innerHTML = options.html !== false ? options.html : "";
    }
    if (options.bgPos) {
      var bgPos = toPoint(options.bgPos);
      div.style.backgroundPosition = -bgPos.x + "px " + -bgPos.y + "px";
    }
    this._setIconStyles(div, "icon");
    return div;
  },
  createShadow: function() {
    return null;
  }
});
Icon.Default = IconDefault;
var GridLayer = Layer.extend({
  // @section
  // @aka GridLayer options
  options: {
    // @option tileSize: Number|Point = 256
    // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
    tileSize: 256,
    // @option opacity: Number = 1.0
    // Opacity of the tiles. Can be used in the `createTile()` function.
    opacity: 1,
    // @option updateWhenIdle: Boolean = (depends)
    // Load new tiles only when panning ends.
    // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
    // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
    // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
    updateWhenIdle: Browser.mobile,
    // @option updateWhenZooming: Boolean = true
    // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
    updateWhenZooming: true,
    // @option updateInterval: Number = 200
    // Tiles will not update more than once every `updateInterval` milliseconds when panning.
    updateInterval: 200,
    // @option zIndex: Number = 1
    // The explicit zIndex of the tile layer.
    zIndex: 1,
    // @option bounds: LatLngBounds = undefined
    // If set, tiles will only be loaded inside the set `LatLngBounds`.
    bounds: null,
    // @option minZoom: Number = 0
    // The minimum zoom level down to which this layer will be displayed (inclusive).
    minZoom: 0,
    // @option maxZoom: Number = undefined
    // The maximum zoom level up to which this layer will be displayed (inclusive).
    maxZoom: void 0,
    // @option maxNativeZoom: Number = undefined
    // Maximum zoom number the tile source has available. If it is specified,
    // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
    // from `maxNativeZoom` level and auto-scaled.
    maxNativeZoom: void 0,
    // @option minNativeZoom: Number = undefined
    // Minimum zoom number the tile source has available. If it is specified,
    // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
    // from `minNativeZoom` level and auto-scaled.
    minNativeZoom: void 0,
    // @option noWrap: Boolean = false
    // Whether the layer is wrapped around the antimeridian. If `true`, the
    // GridLayer will only be displayed once at low zoom levels. Has no
    // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
    // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
    // tiles outside the CRS limits.
    noWrap: false,
    // @option pane: String = 'tilePane'
    // `Map pane` where the grid layer will be added.
    pane: "tilePane",
    // @option className: String = ''
    // A custom class name to assign to the tile layer. Empty by default.
    className: "",
    // @option keepBuffer: Number = 2
    // When panning the map, keep this many rows and columns of tiles before unloading them.
    keepBuffer: 2
  },
  initialize: function(options) {
    setOptions(this, options);
  },
  onAdd: function() {
    this._initContainer();
    this._levels = {};
    this._tiles = {};
    this._resetView();
  },
  beforeAdd: function(map) {
    map._addZoomLimit(this);
  },
  onRemove: function(map) {
    this._removeAllTiles();
    remove(this._container);
    map._removeZoomLimit(this);
    this._container = null;
    this._tileZoom = void 0;
  },
  // @method bringToFront: this
  // Brings the tile layer to the top of all tile layers.
  bringToFront: function() {
    if (this._map) {
      toFront(this._container);
      this._setAutoZIndex(Math.max);
    }
    return this;
  },
  // @method bringToBack: this
  // Brings the tile layer to the bottom of all tile layers.
  bringToBack: function() {
    if (this._map) {
      toBack(this._container);
      this._setAutoZIndex(Math.min);
    }
    return this;
  },
  // @method getContainer: HTMLElement
  // Returns the HTML element that contains the tiles for this layer.
  getContainer: function() {
    return this._container;
  },
  // @method setOpacity(opacity: Number): this
  // Changes the [opacity](#gridlayer-opacity) of the grid layer.
  setOpacity: function(opacity) {
    this.options.opacity = opacity;
    this._updateOpacity();
    return this;
  },
  // @method setZIndex(zIndex: Number): this
  // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
  setZIndex: function(zIndex) {
    this.options.zIndex = zIndex;
    this._updateZIndex();
    return this;
  },
  // @method isLoading: Boolean
  // Returns `true` if any tile in the grid layer has not finished loading.
  isLoading: function() {
    return this._loading;
  },
  // @method redraw: this
  // Causes the layer to clear all the tiles and request them again.
  redraw: function() {
    if (this._map) {
      this._removeAllTiles();
      var tileZoom = this._clampZoom(this._map.getZoom());
      if (tileZoom !== this._tileZoom) {
        this._tileZoom = tileZoom;
        this._updateLevels();
      }
      this._update();
    }
    return this;
  },
  getEvents: function() {
    var events = {
      viewprereset: this._invalidateAll,
      viewreset: this._resetView,
      zoom: this._resetView,
      moveend: this._onMoveEnd
    };
    if (!this.options.updateWhenIdle) {
      if (!this._onMove) {
        this._onMove = throttle2(this._onMoveEnd, this.options.updateInterval, this);
      }
      events.move = this._onMove;
    }
    if (this._zoomAnimated) {
      events.zoomanim = this._animateZoom;
    }
    return events;
  },
  // @section Extension methods
  // Layers extending `GridLayer` shall reimplement the following method.
  // @method createTile(coords: Object, done?: Function): HTMLElement
  // Called only internally, must be overridden by classes extending `GridLayer`.
  // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
  // is specified, it must be called when the tile has finished loading and drawing.
  createTile: function() {
    return document.createElement("div");
  },
  // @section
  // @method getTileSize: Point
  // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
  getTileSize: function() {
    var s = this.options.tileSize;
    return s instanceof Point ? s : new Point(s, s);
  },
  _updateZIndex: function() {
    if (this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null) {
      this._container.style.zIndex = this.options.zIndex;
    }
  },
  _setAutoZIndex: function(compare) {
    var layers2 = this.getPane().children, edgeZIndex = -compare(-Infinity, Infinity);
    for (var i = 0, len = layers2.length, zIndex; i < len; i++) {
      zIndex = layers2[i].style.zIndex;
      if (layers2[i] !== this._container && zIndex) {
        edgeZIndex = compare(edgeZIndex, +zIndex);
      }
    }
    if (isFinite(edgeZIndex)) {
      this.options.zIndex = edgeZIndex + compare(-1, 1);
      this._updateZIndex();
    }
  },
  _updateOpacity: function() {
    if (!this._map) {
      return;
    }
    if (Browser.ielt9) {
      return;
    }
    setOpacity(this._container, this.options.opacity);
    var now = +/* @__PURE__ */ new Date(), nextFrame = false, willPrune = false;
    for (var key in this._tiles) {
      var tile = this._tiles[key];
      if (!tile.current || !tile.loaded) {
        continue;
      }
      var fade = Math.min(1, (now - tile.loaded) / 200);
      setOpacity(tile.el, fade);
      if (fade < 1) {
        nextFrame = true;
      } else {
        if (tile.active) {
          willPrune = true;
        } else {
          this._onOpaqueTile(tile);
        }
        tile.active = true;
      }
    }
    if (willPrune && !this._noPrune) {
      this._pruneTiles();
    }
    if (nextFrame) {
      cancelAnimFrame(this._fadeFrame);
      this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
    }
  },
  _onOpaqueTile: falseFn,
  _initContainer: function() {
    if (this._container) {
      return;
    }
    this._container = create$1("div", "leaflet-layer " + (this.options.className || ""));
    this._updateZIndex();
    if (this.options.opacity < 1) {
      this._updateOpacity();
    }
    this.getPane().appendChild(this._container);
  },
  _updateLevels: function() {
    var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom;
    if (zoom2 === void 0) {
      return void 0;
    }
    for (var z in this._levels) {
      z = Number(z);
      if (this._levels[z].el.children.length || z === zoom2) {
        this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom2 - z);
        this._onUpdateLevel(z);
      } else {
        remove(this._levels[z].el);
        this._removeTilesAtZoom(z);
        this._onRemoveLevel(z);
        delete this._levels[z];
      }
    }
    var level = this._levels[zoom2], map = this._map;
    if (!level) {
      level = this._levels[zoom2] = {};
      level.el = create$1("div", "leaflet-tile-container leaflet-zoom-animated", this._container);
      level.el.style.zIndex = maxZoom;
      level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom2).round();
      level.zoom = zoom2;
      this._setZoomTransform(level, map.getCenter(), map.getZoom());
      falseFn(level.el.offsetWidth);
      this._onCreateLevel(level);
    }
    this._level = level;
    return level;
  },
  _onUpdateLevel: falseFn,
  _onRemoveLevel: falseFn,
  _onCreateLevel: falseFn,
  _pruneTiles: function() {
    if (!this._map) {
      return;
    }
    var key, tile;
    var zoom2 = this._map.getZoom();
    if (zoom2 > this.options.maxZoom || zoom2 < this.options.minZoom) {
      this._removeAllTiles();
      return;
    }
    for (key in this._tiles) {
      tile = this._tiles[key];
      tile.retain = tile.current;
    }
    for (key in this._tiles) {
      tile = this._tiles[key];
      if (tile.current && !tile.active) {
        var coords = tile.coords;
        if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
          this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
        }
      }
    }
    for (key in this._tiles) {
      if (!this._tiles[key].retain) {
        this._removeTile(key);
      }
    }
  },
  _removeTilesAtZoom: function(zoom2) {
    for (var key in this._tiles) {
      if (this._tiles[key].coords.z !== zoom2) {
        continue;
      }
      this._removeTile(key);
    }
  },
  _removeAllTiles: function() {
    for (var key in this._tiles) {
      this._removeTile(key);
    }
  },
  _invalidateAll: function() {
    for (var z in this._levels) {
      remove(this._levels[z].el);
      this._onRemoveLevel(Number(z));
      delete this._levels[z];
    }
    this._removeAllTiles();
    this._tileZoom = void 0;
  },
  _retainParent: function(x, y, z, minZoom) {
    var x2 = Math.floor(x / 2), y2 = Math.floor(y / 2), z2 = z - 1, coords2 = new Point(+x2, +y2);
    coords2.z = +z2;
    var key = this._tileCoordsToKey(coords2), tile = this._tiles[key];
    if (tile && tile.active) {
      tile.retain = true;
      return true;
    } else if (tile && tile.loaded) {
      tile.retain = true;
    }
    if (z2 > minZoom) {
      return this._retainParent(x2, y2, z2, minZoom);
    }
    return false;
  },
  _retainChildren: function(x, y, z, maxZoom) {
    for (var i = 2 * x; i < 2 * x + 2; i++) {
      for (var j = 2 * y; j < 2 * y + 2; j++) {
        var coords = new Point(i, j);
        coords.z = z + 1;
        var key = this._tileCoordsToKey(coords), tile = this._tiles[key];
        if (tile && tile.active) {
          tile.retain = true;
          continue;
        } else if (tile && tile.loaded) {
          tile.retain = true;
        }
        if (z + 1 < maxZoom) {
          this._retainChildren(i, j, z + 1, maxZoom);
        }
      }
    }
  },
  _resetView: function(e) {
    var animating = e && (e.pinch || e.flyTo);
    this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
  },
  _animateZoom: function(e) {
    this._setView(e.center, e.zoom, true, e.noUpdate);
  },
  _clampZoom: function(zoom2) {
    var options = this.options;
    if (void 0 !== options.minNativeZoom && zoom2 < options.minNativeZoom) {
      return options.minNativeZoom;
    }
    if (void 0 !== options.maxNativeZoom && options.maxNativeZoom < zoom2) {
      return options.maxNativeZoom;
    }
    return zoom2;
  },
  _setView: function(center, zoom2, noPrune, noUpdate) {
    var tileZoom = Math.round(zoom2);
    if (this.options.maxZoom !== void 0 && tileZoom > this.options.maxZoom || this.options.minZoom !== void 0 && tileZoom < this.options.minZoom) {
      tileZoom = void 0;
    } else {
      tileZoom = this._clampZoom(tileZoom);
    }
    var tileZoomChanged = this.options.updateWhenZooming && tileZoom !== this._tileZoom;
    if (!noUpdate || tileZoomChanged) {
      this._tileZoom = tileZoom;
      if (this._abortLoading) {
        this._abortLoading();
      }
      this._updateLevels();
      this._resetGrid();
      if (tileZoom !== void 0) {
        this._update(center);
      }
      if (!noPrune) {
        this._pruneTiles();
      }
      this._noPrune = !!noPrune;
    }
    this._setZoomTransforms(center, zoom2);
  },
  _setZoomTransforms: function(center, zoom2) {
    for (var i in this._levels) {
      this._setZoomTransform(this._levels[i], center, zoom2);
    }
  },
  _setZoomTransform: function(level, center, zoom2) {
    var scale2 = this._map.getZoomScale(zoom2, level.zoom), translate = level.origin.multiplyBy(scale2).subtract(this._map._getNewPixelOrigin(center, zoom2)).round();
    if (Browser.any3d) {
      setTransform(level.el, translate, scale2);
    } else {
      setPosition(level.el, translate);
    }
  },
  _resetGrid: function() {
    var map = this._map, crs = map.options.crs, tileSize = this._tileSize = this.getTileSize(), tileZoom = this._tileZoom;
    var bounds = this._map.getPixelWorldBounds(this._tileZoom);
    if (bounds) {
      this._globalTileRange = this._pxBoundsToTileRange(bounds);
    }
    this._wrapX = crs.wrapLng && !this.options.noWrap && [
      Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
      Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
    ];
    this._wrapY = crs.wrapLat && !this.options.noWrap && [
      Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
      Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
    ];
  },
  _onMoveEnd: function() {
    if (!this._map || this._map._animatingZoom) {
      return;
    }
    this._update();
  },
  _getTiledPixelBounds: function(center) {
    var map = this._map, mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(), scale2 = map.getZoomScale(mapZoom, this._tileZoom), pixelCenter = map.project(center, this._tileZoom).floor(), halfSize = map.getSize().divideBy(scale2 * 2);
    return new Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
  },
  // Private method to load tiles in the grid's active zoom level according to map bounds
  _update: function(center) {
    var map = this._map;
    if (!map) {
      return;
    }
    var zoom2 = this._clampZoom(map.getZoom());
    if (center === void 0) {
      center = map.getCenter();
    }
    if (this._tileZoom === void 0) {
      return;
    }
    var pixelBounds = this._getTiledPixelBounds(center), tileRange = this._pxBoundsToTileRange(pixelBounds), tileCenter = tileRange.getCenter(), queue2 = [], margin = this.options.keepBuffer, noPruneRange = new Bounds(
      tileRange.getBottomLeft().subtract([margin, -margin]),
      tileRange.getTopRight().add([margin, -margin])
    );
    if (!(isFinite(tileRange.min.x) && isFinite(tileRange.min.y) && isFinite(tileRange.max.x) && isFinite(tileRange.max.y))) {
      throw new Error("Attempted to load an infinite number of tiles");
    }
    for (var key in this._tiles) {
      var c = this._tiles[key].coords;
      if (c.z !== this._tileZoom || !noPruneRange.contains(new Point(c.x, c.y))) {
        this._tiles[key].current = false;
      }
    }
    if (Math.abs(zoom2 - this._tileZoom) > 1) {
      this._setView(center, zoom2);
      return;
    }
    for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
      for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
        var coords = new Point(i, j);
        coords.z = this._tileZoom;
        if (!this._isValidTile(coords)) {
          continue;
        }
        var tile = this._tiles[this._tileCoordsToKey(coords)];
        if (tile) {
          tile.current = true;
        } else {
          queue2.push(coords);
        }
      }
    }
    queue2.sort(function(a, b) {
      return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
    });
    if (queue2.length !== 0) {
      if (!this._loading) {
        this._loading = true;
        this.fire("loading");
      }
      var fragment = document.createDocumentFragment();
      for (i = 0; i < queue2.length; i++) {
        this._addTile(queue2[i], fragment);
      }
      this._level.el.appendChild(fragment);
    }
  },
  _isValidTile: function(coords) {
    var crs = this._map.options.crs;
    if (!crs.infinite) {
      var bounds = this._globalTileRange;
      if (!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x) || !crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y)) {
        return false;
      }
    }
    if (!this.options.bounds) {
      return true;
    }
    var tileBounds = this._tileCoordsToBounds(coords);
    return toLatLngBounds(this.options.bounds).overlaps(tileBounds);
  },
  _keyToBounds: function(key) {
    return this._tileCoordsToBounds(this._keyToTileCoords(key));
  },
  _tileCoordsToNwSe: function(coords) {
    var map = this._map, tileSize = this.getTileSize(), nwPoint = coords.scaleBy(tileSize), sePoint = nwPoint.add(tileSize), nw = map.unproject(nwPoint, coords.z), se = map.unproject(sePoint, coords.z);
    return [nw, se];
  },
  // converts tile coordinates to its geographical bounds
  _tileCoordsToBounds: function(coords) {
    var bp = this._tileCoordsToNwSe(coords), bounds = new LatLngBounds(bp[0], bp[1]);
    if (!this.options.noWrap) {
      bounds = this._map.wrapLatLngBounds(bounds);
    }
    return bounds;
  },
  // converts tile coordinates to key for the tile cache
  _tileCoordsToKey: function(coords) {
    return coords.x + ":" + coords.y + ":" + coords.z;
  },
  // converts tile cache key to coordinates
  _keyToTileCoords: function(key) {
    var k = key.split(":"), coords = new Point(+k[0], +k[1]);
    coords.z = +k[2];
    return coords;
  },
  _removeTile: function(key) {
    var tile = this._tiles[key];
    if (!tile) {
      return;
    }
    remove(tile.el);
    delete this._tiles[key];
    this.fire("tileunload", {
      tile: tile.el,
      coords: this._keyToTileCoords(key)
    });
  },
  _initTile: function(tile) {
    addClass(tile, "leaflet-tile");
    var tileSize = this.getTileSize();
    tile.style.width = tileSize.x + "px";
    tile.style.height = tileSize.y + "px";
    tile.onselectstart = falseFn;
    tile.onmousemove = falseFn;
    if (Browser.ielt9 && this.options.opacity < 1) {
      setOpacity(tile, this.options.opacity);
    }
  },
  _addTile: function(coords, container) {
    var tilePos = this._getTilePos(coords), key = this._tileCoordsToKey(coords);
    var tile = this.createTile(this._wrapCoords(coords), bind3(this._tileReady, this, coords));
    this._initTile(tile);
    if (this.createTile.length < 2) {
      requestAnimFrame(bind3(this._tileReady, this, coords, null, tile));
    }
    setPosition(tile, tilePos);
    this._tiles[key] = {
      el: tile,
      coords,
      current: true
    };
    container.appendChild(tile);
    this.fire("tileloadstart", {
      tile,
      coords
    });
  },
  _tileReady: function(coords, err, tile) {
    if (err) {
      this.fire("tileerror", {
        error: err,
        tile,
        coords
      });
    }
    var key = this._tileCoordsToKey(coords);
    tile = this._tiles[key];
    if (!tile) {
      return;
    }
    tile.loaded = +/* @__PURE__ */ new Date();
    if (this._map._fadeAnimated) {
      setOpacity(tile.el, 0);
      cancelAnimFrame(this._fadeFrame);
      this._fadeFrame = requestAnimFrame(this._updateOpacity, this);
    } else {
      tile.active = true;
      this._pruneTiles();
    }
    if (!err) {
      addClass(tile.el, "leaflet-tile-loaded");
      this.fire("tileload", {
        tile: tile.el,
        coords
      });
    }
    if (this._noTilesToLoad()) {
      this._loading = false;
      this.fire("load");
      if (Browser.ielt9 || !this._map._fadeAnimated) {
        requestAnimFrame(this._pruneTiles, this);
      } else {
        setTimeout(bind3(this._pruneTiles, this), 250);
      }
    }
  },
  _getTilePos: function(coords) {
    return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
  },
  _wrapCoords: function(coords) {
    var newCoords = new Point(
      this._wrapX ? wrapNum(coords.x, this._wrapX) : coords.x,
      this._wrapY ? wrapNum(coords.y, this._wrapY) : coords.y
    );
    newCoords.z = coords.z;
    return newCoords;
  },
  _pxBoundsToTileRange: function(bounds) {
    var tileSize = this.getTileSize();
    return new Bounds(
      bounds.min.unscaleBy(tileSize).floor(),
      bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1])
    );
  },
  _noTilesToLoad: function() {
    for (var key in this._tiles) {
      if (!this._tiles[key].loaded) {
        return false;
      }
    }
    return true;
  }
});
var TileLayer = GridLayer.extend({
  // @section
  // @aka TileLayer options
  options: {
    // @option minZoom: Number = 0
    // The minimum zoom level down to which this layer will be displayed (inclusive).
    minZoom: 0,
    // @option maxZoom: Number = 18
    // The maximum zoom level up to which this layer will be displayed (inclusive).
    maxZoom: 18,
    // @option subdomains: String|String[] = 'abc'
    // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
    subdomains: "abc",
    // @option errorTileUrl: String = ''
    // URL to the tile image to show in place of the tile that failed to load.
    errorTileUrl: "",
    // @option zoomOffset: Number = 0
    // The zoom number used in tile URLs will be offset with this value.
    zoomOffset: 0,
    // @option tms: Boolean = false
    // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
    tms: false,
    // @option zoomReverse: Boolean = false
    // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
    zoomReverse: false,
    // @option detectRetina: Boolean = false
    // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
    detectRetina: false,
    // @option crossOrigin: Boolean|String = false
    // Whether the crossOrigin attribute will be added to the tiles.
    // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
    // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
    crossOrigin: false,
    // @option referrerPolicy: Boolean|String = false
    // Whether the referrerPolicy attribute will be added to the tiles.
    // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
    // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
    // (e.g. to validate an API token).
    // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
    referrerPolicy: false
  },
  initialize: function(url, options) {
    this._url = url;
    options = setOptions(this, options);
    if (options.detectRetina && Browser.retina && options.maxZoom > 0) {
      options.tileSize = Math.floor(options.tileSize / 2);
      if (!options.zoomReverse) {
        options.zoomOffset++;
        options.maxZoom = Math.max(options.minZoom, options.maxZoom - 1);
      } else {
        options.zoomOffset--;
        options.minZoom = Math.min(options.maxZoom, options.minZoom + 1);
      }
      options.minZoom = Math.max(0, options.minZoom);
    } else if (!options.zoomReverse) {
      options.maxZoom = Math.max(options.minZoom, options.maxZoom);
    } else {
      options.minZoom = Math.min(options.maxZoom, options.minZoom);
    }
    if (typeof options.subdomains === "string") {
      options.subdomains = options.subdomains.split("");
    }
    this.on("tileunload", this._onTileRemove);
  },
  // @method setUrl(url: String, noRedraw?: Boolean): this
  // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
  // If the URL does not change, the layer will not be redrawn unless
  // the noRedraw parameter is set to false.
  setUrl: function(url, noRedraw) {
    if (this._url === url && noRedraw === void 0) {
      noRedraw = true;
    }
    this._url = url;
    if (!noRedraw) {
      this.redraw();
    }
    return this;
  },
  // @method createTile(coords: Object, done?: Function): HTMLElement
  // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
  // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
  // callback is called when the tile has been loaded.
  createTile: function(coords, done) {
    var tile = document.createElement("img");
    on2(tile, "load", bind3(this._tileOnLoad, this, done, tile));
    on2(tile, "error", bind3(this._tileOnError, this, done, tile));
    if (this.options.crossOrigin || this.options.crossOrigin === "") {
      tile.crossOrigin = this.options.crossOrigin === true ? "" : this.options.crossOrigin;
    }
    if (typeof this.options.referrerPolicy === "string") {
      tile.referrerPolicy = this.options.referrerPolicy;
    }
    tile.alt = "";
    tile.src = this.getTileUrl(coords);
    return tile;
  },
  // @section Extension methods
  // @uninheritable
  // Layers extending `TileLayer` might reimplement the following method.
  // @method getTileUrl(coords: Object): String
  // Called only internally, returns the URL for a tile given its coordinates.
  // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
  getTileUrl: function(coords) {
    var data2 = {
      r: Browser.retina ? "@2x" : "",
      s: this._getSubdomain(coords),
      x: coords.x,
      y: coords.y,
      z: this._getZoomForUrl()
    };
    if (this._map && !this._map.options.crs.infinite) {
      var invertedY = this._globalTileRange.max.y - coords.y;
      if (this.options.tms) {
        data2["y"] = invertedY;
      }
      data2["-y"] = invertedY;
    }
    return template(this._url, extend(data2, this.options));
  },
  _tileOnLoad: function(done, tile) {
    if (Browser.ielt9) {
      setTimeout(bind3(done, this, null, tile), 0);
    } else {
      done(null, tile);
    }
  },
  _tileOnError: function(done, tile, e) {
    var errorUrl = this.options.errorTileUrl;
    if (errorUrl && tile.getAttribute("src") !== errorUrl) {
      tile.src = errorUrl;
    }
    done(e, tile);
  },
  _onTileRemove: function(e) {
    e.tile.onload = null;
  },
  _getZoomForUrl: function() {
    var zoom2 = this._tileZoom, maxZoom = this.options.maxZoom, zoomReverse = this.options.zoomReverse, zoomOffset = this.options.zoomOffset;
    if (zoomReverse) {
      zoom2 = maxZoom - zoom2;
    }
    return zoom2 + zoomOffset;
  },
  _getSubdomain: function(tilePoint) {
    var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
    return this.options.subdomains[index];
  },
  // stops loading all tiles in the background layer
  _abortLoading: function() {
    var i, tile;
    for (i in this._tiles) {
      if (this._tiles[i].coords.z !== this._tileZoom) {
        tile = this._tiles[i].el;
        tile.onload = falseFn;
        tile.onerror = falseFn;
        if (!tile.complete) {
          tile.src = emptyImageUrl;
          var coords = this._tiles[i].coords;
          remove(tile);
          delete this._tiles[i];
          this.fire("tileabort", {
            tile,
            coords
          });
        }
      }
    }
  },
  _removeTile: function(key) {
    var tile = this._tiles[key];
    if (!tile) {
      return;
    }
    tile.el.setAttribute("src", emptyImageUrl);
    return GridLayer.prototype._removeTile.call(this, key);
  },
  _tileReady: function(coords, err, tile) {
    if (!this._map || tile && tile.getAttribute("src") === emptyImageUrl) {
      return;
    }
    return GridLayer.prototype._tileReady.call(this, coords, err, tile);
  }
});
function tileLayer(url, options) {
  return new TileLayer(url, options);
}
var TileLayerWMS = TileLayer.extend({
  // @section
  // @aka TileLayer.WMS options
  // If any custom options not documented here are used, they will be sent to the
  // WMS server as extra parameters in each request URL. This can be useful for
  // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
  defaultWmsParams: {
    service: "WMS",
    request: "GetMap",
    // @option layers: String = ''
    // **(required)** Comma-separated list of WMS layers to show.
    layers: "",
    // @option styles: String = ''
    // Comma-separated list of WMS styles.
    styles: "",
    // @option format: String = 'image/jpeg'
    // WMS image format (use `'image/png'` for layers with transparency).
    format: "image/jpeg",
    // @option transparent: Boolean = false
    // If `true`, the WMS service will return images with transparency.
    transparent: false,
    // @option version: String = '1.1.1'
    // Version of the WMS service to use
    version: "1.1.1"
  },
  options: {
    // @option crs: CRS = null
    // Coordinate Reference System to use for the WMS requests, defaults to
    // map CRS. Don't change this if you're not sure what it means.
    crs: null,
    // @option uppercase: Boolean = false
    // If `true`, WMS request parameter keys will be uppercase.
    uppercase: false
  },
  initialize: function(url, options) {
    this._url = url;
    var wmsParams = extend({}, this.defaultWmsParams);
    for (var i in options) {
      if (!(i in this.options)) {
        wmsParams[i] = options[i];
      }
    }
    options = setOptions(this, options);
    var realRetina = options.detectRetina && Browser.retina ? 2 : 1;
    var tileSize = this.getTileSize();
    wmsParams.width = tileSize.x * realRetina;
    wmsParams.height = tileSize.y * realRetina;
    this.wmsParams = wmsParams;
  },
  onAdd: function(map) {
    this._crs = this.options.crs || map.options.crs;
    this._wmsVersion = parseFloat(this.wmsParams.version);
    var projectionKey = this._wmsVersion >= 1.3 ? "crs" : "srs";
    this.wmsParams[projectionKey] = this._crs.code;
    TileLayer.prototype.onAdd.call(this, map);
  },
  getTileUrl: function(coords) {
    var tileBounds = this._tileCoordsToNwSe(coords), crs = this._crs, bounds = toBounds(crs.project(tileBounds[0]), crs.project(tileBounds[1])), min = bounds.min, max = bounds.max, bbox = (this._wmsVersion >= 1.3 && this._crs === EPSG4326 ? [min.y, min.x, max.y, max.x] : [min.x, min.y, max.x, max.y]).join(","), url = TileLayer.prototype.getTileUrl.call(this, coords);
    return url + getParamString(this.wmsParams, url, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + bbox;
  },
  // @method setParams(params: Object, noRedraw?: Boolean): this
  // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
  setParams: function(params, noRedraw) {
    extend(this.wmsParams, params);
    if (!noRedraw) {
      this.redraw();
    }
    return this;
  }
});
function tileLayerWMS(url, options) {
  return new TileLayerWMS(url, options);
}
TileLayer.WMS = TileLayerWMS;
tileLayer.wms = tileLayerWMS;
var Renderer = Layer.extend({
  // @section
  // @aka Renderer options
  options: {
    // @option padding: Number = 0.1
    // How much to extend the clip area around the map view (relative to its size)
    // e.g. 0.1 would be 10% of map view in each direction
    padding: 0.1
  },
  initialize: function(options) {
    setOptions(this, options);
    stamp(this);
    this._layers = this._layers || {};
  },
  onAdd: function() {
    if (!this._container) {
      this._initContainer();
      addClass(this._container, "leaflet-zoom-animated");
    }
    this.getPane().appendChild(this._container);
    this._update();
    this.on("update", this._updatePaths, this);
  },
  onRemove: function() {
    this.off("update", this._updatePaths, this);
    this._destroyContainer();
  },
  getEvents: function() {
    var events = {
      viewreset: this._reset,
      zoom: this._onZoom,
      moveend: this._update,
      zoomend: this._onZoomEnd
    };
    if (this._zoomAnimated) {
      events.zoomanim = this._onAnimZoom;
    }
    return events;
  },
  _onAnimZoom: function(ev) {
    this._updateTransform(ev.center, ev.zoom);
  },
  _onZoom: function() {
    this._updateTransform(this._map.getCenter(), this._map.getZoom());
  },
  _updateTransform: function(center, zoom2) {
    var scale2 = this._map.getZoomScale(zoom2, this._zoom), viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding), currentCenterPoint = this._map.project(this._center, zoom2), topLeftOffset = viewHalf.multiplyBy(-scale2).add(currentCenterPoint).subtract(this._map._getNewPixelOrigin(center, zoom2));
    if (Browser.any3d) {
      setTransform(this._container, topLeftOffset, scale2);
    } else {
      setPosition(this._container, topLeftOffset);
    }
  },
  _reset: function() {
    this._update();
    this._updateTransform(this._center, this._zoom);
    for (var id in this._layers) {
      this._layers[id]._reset();
    }
  },
  _onZoomEnd: function() {
    for (var id in this._layers) {
      this._layers[id]._project();
    }
  },
  _updatePaths: function() {
    for (var id in this._layers) {
      this._layers[id]._update();
    }
  },
  _update: function() {
    var p = this.options.padding, size2 = this._map.getSize(), min = this._map.containerPointToLayerPoint(size2.multiplyBy(-p)).round();
    this._bounds = new Bounds(min, min.add(size2.multiplyBy(1 + p * 2)).round());
    this._center = this._map.getCenter();
    this._zoom = this._map.getZoom();
  }
});
var Canvas = Renderer.extend({
  // @section
  // @aka Canvas options
  options: {
    // @option tolerance: Number = 0
    // How much to extend the click tolerance around a path/object on the map.
    tolerance: 0
  },
  getEvents: function() {
    var events = Renderer.prototype.getEvents.call(this);
    events.viewprereset = this._onViewPreReset;
    return events;
  },
  _onViewPreReset: function() {
    this._postponeUpdatePaths = true;
  },
  onAdd: function() {
    Renderer.prototype.onAdd.call(this);
    this._draw();
  },
  _initContainer: function() {
    var container = this._container = document.createElement("canvas");
    on2(container, "mousemove", this._onMouseMove, this);
    on2(container, "click dblclick mousedown mouseup contextmenu", this._onClick, this);
    on2(container, "mouseout", this._handleMouseOut, this);
    container["_leaflet_disable_events"] = true;
    this._ctx = container.getContext("2d");
  },
  _destroyContainer: function() {
    cancelAnimFrame(this._redrawRequest);
    delete this._ctx;
    remove(this._container);
    off(this._container);
    delete this._container;
  },
  _updatePaths: function() {
    if (this._postponeUpdatePaths) {
      return;
    }
    var layer;
    this._redrawBounds = null;
    for (var id in this._layers) {
      layer = this._layers[id];
      layer._update();
    }
    this._redraw();
  },
  _update: function() {
    if (this._map._animatingZoom && this._bounds) {
      return;
    }
    Renderer.prototype._update.call(this);
    var b = this._bounds, container = this._container, size2 = b.getSize(), m = Browser.retina ? 2 : 1;
    setPosition(container, b.min);
    container.width = m * size2.x;
    container.height = m * size2.y;
    container.style.width = size2.x + "px";
    container.style.height = size2.y + "px";
    if (Browser.retina) {
      this._ctx.scale(2, 2);
    }
    this._ctx.translate(-b.min.x, -b.min.y);
    this.fire("update");
  },
  _reset: function() {
    Renderer.prototype._reset.call(this);
    if (this._postponeUpdatePaths) {
      this._postponeUpdatePaths = false;
      this._updatePaths();
    }
  },
  _initPath: function(layer) {
    this._updateDashArray(layer);
    this._layers[stamp(layer)] = layer;
    var order = layer._order = {
      layer,
      prev: this._drawLast,
      next: null
    };
    if (this._drawLast) {
      this._drawLast.next = order;
    }
    this._drawLast = order;
    this._drawFirst = this._drawFirst || this._drawLast;
  },
  _addPath: function(layer) {
    this._requestRedraw(layer);
  },
  _removePath: function(layer) {
    var order = layer._order;
    var next = order.next;
    var prev = order.prev;
    if (next) {
      next.prev = prev;
    } else {
      this._drawLast = prev;
    }
    if (prev) {
      prev.next = next;
    } else {
      this._drawFirst = next;
    }
    delete layer._order;
    delete this._layers[stamp(layer)];
    this._requestRedraw(layer);
  },
  _updatePath: function(layer) {
    this._extendRedrawBounds(layer);
    layer._project();
    layer._update();
    this._requestRedraw(layer);
  },
  _updateStyle: function(layer) {
    this._updateDashArray(layer);
    this._requestRedraw(layer);
  },
  _updateDashArray: function(layer) {
    if (typeof layer.options.dashArray === "string") {
      var parts = layer.options.dashArray.split(/[, ]+/), dashArray = [], dashValue, i;
      for (i = 0; i < parts.length; i++) {
        dashValue = Number(parts[i]);
        if (isNaN(dashValue)) {
          return;
        }
        dashArray.push(dashValue);
      }
      layer.options._dashArray = dashArray;
    } else {
      layer.options._dashArray = layer.options.dashArray;
    }
  },
  _requestRedraw: function(layer) {
    if (!this._map) {
      return;
    }
    this._extendRedrawBounds(layer);
    this._redrawRequest = this._redrawRequest || requestAnimFrame(this._redraw, this);
  },
  _extendRedrawBounds: function(layer) {
    if (layer._pxBounds) {
      var padding = (layer.options.weight || 0) + 1;
      this._redrawBounds = this._redrawBounds || new Bounds();
      this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
      this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
    }
  },
  _redraw: function() {
    this._redrawRequest = null;
    if (this._redrawBounds) {
      this._redrawBounds.min._floor();
      this._redrawBounds.max._ceil();
    }
    this._clear();
    this._draw();
    this._redrawBounds = null;
  },
  _clear: function() {
    var bounds = this._redrawBounds;
    if (bounds) {
      var size2 = bounds.getSize();
      this._ctx.clearRect(bounds.min.x, bounds.min.y, size2.x, size2.y);
    } else {
      this._ctx.save();
      this._ctx.setTransform(1, 0, 0, 1, 0, 0);
      this._ctx.clearRect(0, 0, this._container.width, this._container.height);
      this._ctx.restore();
    }
  },
  _draw: function() {
    var layer, bounds = this._redrawBounds;
    this._ctx.save();
    if (bounds) {
      var size2 = bounds.getSize();
      this._ctx.beginPath();
      this._ctx.rect(bounds.min.x, bounds.min.y, size2.x, size2.y);
      this._ctx.clip();
    }
    this._drawing = true;
    for (var order = this._drawFirst; order; order = order.next) {
      layer = order.layer;
      if (!bounds || layer._pxBounds && layer._pxBounds.intersects(bounds)) {
        layer._updatePath();
      }
    }
    this._drawing = false;
    this._ctx.restore();
  },
  _updatePoly: function(layer, closed) {
    if (!this._drawing) {
      return;
    }
    var i, j, len2, p, parts = layer._parts, len = parts.length, ctx = this._ctx;
    if (!len) {
      return;
    }
    ctx.beginPath();
    for (i = 0; i < len; i++) {
      for (j = 0, len2 = parts[i].length; j < len2; j++) {
        p = parts[i][j];
        ctx[j ? "lineTo" : "moveTo"](p.x, p.y);
      }
      if (closed) {
        ctx.closePath();
      }
    }
    this._fillStroke(ctx, layer);
  },
  _updateCircle: function(layer) {
    if (!this._drawing || layer._empty()) {
      return;
    }
    var p = layer._point, ctx = this._ctx, r = Math.max(Math.round(layer._radius), 1), s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
    if (s !== 1) {
      ctx.save();
      ctx.scale(1, s);
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);
    if (s !== 1) {
      ctx.restore();
    }
    this._fillStroke(ctx, layer);
  },
  _fillStroke: function(ctx, layer) {
    var options = layer.options;
    if (options.fill) {
      ctx.globalAlpha = options.fillOpacity;
      ctx.fillStyle = options.fillColor || options.color;
      ctx.fill(options.fillRule || "evenodd");
    }
    if (options.stroke && options.weight !== 0) {
      if (ctx.setLineDash) {
        ctx.setLineDash(layer.options && layer.options._dashArray || []);
      }
      ctx.globalAlpha = options.opacity;
      ctx.lineWidth = options.weight;
      ctx.strokeStyle = options.color;
      ctx.lineCap = options.lineCap;
      ctx.lineJoin = options.lineJoin;
      ctx.stroke();
    }
  },
  // Canvas obviously doesn't have mouse events for individual drawn objects,
  // so we emulate that by calculating what's under the mouse on mousemove/click manually
  _onClick: function(e) {
    var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;
    for (var order = this._drawFirst; order; order = order.next) {
      layer = order.layer;
      if (layer.options.interactive && layer._containsPoint(point)) {
        if (!(e.type === "click" || e.type === "preclick") || !this._map._draggableMoved(layer)) {
          clickedLayer = layer;
        }
      }
    }
    this._fireEvent(clickedLayer ? [clickedLayer] : false, e);
  },
  _onMouseMove: function(e) {
    if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) {
      return;
    }
    var point = this._map.mouseEventToLayerPoint(e);
    this._handleMouseHover(e, point);
  },
  _handleMouseOut: function(e) {
    var layer = this._hoveredLayer;
    if (layer) {
      removeClass(this._container, "leaflet-interactive");
      this._fireEvent([layer], e, "mouseout");
      this._hoveredLayer = null;
      this._mouseHoverThrottled = false;
    }
  },
  _handleMouseHover: function(e, point) {
    if (this._mouseHoverThrottled) {
      return;
    }
    var layer, candidateHoveredLayer;
    for (var order = this._drawFirst; order; order = order.next) {
      layer = order.layer;
      if (layer.options.interactive && layer._containsPoint(point)) {
        candidateHoveredLayer = layer;
      }
    }
    if (candidateHoveredLayer !== this._hoveredLayer) {
      this._handleMouseOut(e);
      if (candidateHoveredLayer) {
        addClass(this._container, "leaflet-interactive");
        this._fireEvent([candidateHoveredLayer], e, "mouseover");
        this._hoveredLayer = candidateHoveredLayer;
      }
    }
    this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : false, e);
    this._mouseHoverThrottled = true;
    setTimeout(bind3(function() {
      this._mouseHoverThrottled = false;
    }, this), 32);
  },
  _fireEvent: function(layers2, e, type) {
    this._map._fireDOMEvent(e, type || e.type, layers2);
  },
  _bringToFront: function(layer) {
    var order = layer._order;
    if (!order) {
      return;
    }
    var next = order.next;
    var prev = order.prev;
    if (next) {
      next.prev = prev;
    } else {
      return;
    }
    if (prev) {
      prev.next = next;
    } else if (next) {
      this._drawFirst = next;
    }
    order.prev = this._drawLast;
    this._drawLast.next = order;
    order.next = null;
    this._drawLast = order;
    this._requestRedraw(layer);
  },
  _bringToBack: function(layer) {
    var order = layer._order;
    if (!order) {
      return;
    }
    var next = order.next;
    var prev = order.prev;
    if (prev) {
      prev.next = next;
    } else {
      return;
    }
    if (next) {
      next.prev = prev;
    } else if (prev) {
      this._drawLast = prev;
    }
    order.prev = null;
    order.next = this._drawFirst;
    this._drawFirst.prev = order;
    this._drawFirst = order;
    this._requestRedraw(layer);
  }
});
function canvas(options) {
  return Browser.canvas ? new Canvas(options) : null;
}
var vmlCreate = function() {
  try {
    document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml");
    return function(name) {
      return document.createElement("<lvml:" + name + ' class="lvml">');
    };
  } catch (e) {
  }
  return function(name) {
    return document.createElement("<" + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
  };
}();
var vmlMixin = {
  _initContainer: function() {
    this._container = create$1("div", "leaflet-vml-container");
  },
  _update: function() {
    if (this._map._animatingZoom) {
      return;
    }
    Renderer.prototype._update.call(this);
    this.fire("update");
  },
  _initPath: function(layer) {
    var container = layer._container = vmlCreate("shape");
    addClass(container, "leaflet-vml-shape " + (this.options.className || ""));
    container.coordsize = "1 1";
    layer._path = vmlCreate("path");
    container.appendChild(layer._path);
    this._updateStyle(layer);
    this._layers[stamp(layer)] = layer;
  },
  _addPath: function(layer) {
    var container = layer._container;
    this._container.appendChild(container);
    if (layer.options.interactive) {
      layer.addInteractiveTarget(container);
    }
  },
  _removePath: function(layer) {
    var container = layer._container;
    remove(container);
    layer.removeInteractiveTarget(container);
    delete this._layers[stamp(layer)];
  },
  _updateStyle: function(layer) {
    var stroke = layer._stroke, fill = layer._fill, options = layer.options, container = layer._container;
    container.stroked = !!options.stroke;
    container.filled = !!options.fill;
    if (options.stroke) {
      if (!stroke) {
        stroke = layer._stroke = vmlCreate("stroke");
      }
      container.appendChild(stroke);
      stroke.weight = options.weight + "px";
      stroke.color = options.color;
      stroke.opacity = options.opacity;
      if (options.dashArray) {
        stroke.dashStyle = isArray2(options.dashArray) ? options.dashArray.join(" ") : options.dashArray.replace(/( *, *)/g, " ");
      } else {
        stroke.dashStyle = "";
      }
      stroke.endcap = options.lineCap.replace("butt", "flat");
      stroke.joinstyle = options.lineJoin;
    } else if (stroke) {
      container.removeChild(stroke);
      layer._stroke = null;
    }
    if (options.fill) {
      if (!fill) {
        fill = layer._fill = vmlCreate("fill");
      }
      container.appendChild(fill);
      fill.color = options.fillColor || options.color;
      fill.opacity = options.fillOpacity;
    } else if (fill) {
      container.removeChild(fill);
      layer._fill = null;
    }
  },
  _updateCircle: function(layer) {
    var p = layer._point.round(), r = Math.round(layer._radius), r2 = Math.round(layer._radiusY || r);
    this._setPath(layer, layer._empty() ? "M0 0" : "AL " + p.x + "," + p.y + " " + r + "," + r2 + " 0," + 65535 * 360);
  },
  _setPath: function(layer, path) {
    layer._path.v = path;
  },
  _bringToFront: function(layer) {
    toFront(layer._container);
  },
  _bringToBack: function(layer) {
    toBack(layer._container);
  }
};
var create = Browser.vml ? vmlCreate : svgCreate;
var SVG = Renderer.extend({
  _initContainer: function() {
    this._container = create("svg");
    this._container.setAttribute("pointer-events", "none");
    this._rootGroup = create("g");
    this._container.appendChild(this._rootGroup);
  },
  _destroyContainer: function() {
    remove(this._container);
    off(this._container);
    delete this._container;
    delete this._rootGroup;
    delete this._svgSize;
  },
  _update: function() {
    if (this._map._animatingZoom && this._bounds) {
      return;
    }
    Renderer.prototype._update.call(this);
    var b = this._bounds, size2 = b.getSize(), container = this._container;
    if (!this._svgSize || !this._svgSize.equals(size2)) {
      this._svgSize = size2;
      container.setAttribute("width", size2.x);
      container.setAttribute("height", size2.y);
    }
    setPosition(container, b.min);
    container.setAttribute("viewBox", [b.min.x, b.min.y, size2.x, size2.y].join(" "));
    this.fire("update");
  },
  // methods below are called by vector layers implementations
  _initPath: function(layer) {
    var path = layer._path = create("path");
    if (layer.options.className) {
      addClass(path, layer.options.className);
    }
    if (layer.options.interactive) {
      addClass(path, "leaflet-interactive");
    }
    this._updateStyle(layer);
    this._layers[stamp(layer)] = layer;
  },
  _addPath: function(layer) {
    if (!this._rootGroup) {
      this._initContainer();
    }
    this._rootGroup.appendChild(layer._path);
    layer.addInteractiveTarget(layer._path);
  },
  _removePath: function(layer) {
    remove(layer._path);
    layer.removeInteractiveTarget(layer._path);
    delete this._layers[stamp(layer)];
  },
  _updatePath: function(layer) {
    layer._project();
    layer._update();
  },
  _updateStyle: function(layer) {
    var path = layer._path, options = layer.options;
    if (!path) {
      return;
    }
    if (options.stroke) {
      path.setAttribute("stroke", options.color);
      path.setAttribute("stroke-opacity", options.opacity);
      path.setAttribute("stroke-width", options.weight);
      path.setAttribute("stroke-linecap", options.lineCap);
      path.setAttribute("stroke-linejoin", options.lineJoin);
      if (options.dashArray) {
        path.setAttribute("stroke-dasharray", options.dashArray);
      } else {
        path.removeAttribute("stroke-dasharray");
      }
      if (options.dashOffset) {
        path.setAttribute("stroke-dashoffset", options.dashOffset);
      } else {
        path.removeAttribute("stroke-dashoffset");
      }
    } else {
      path.setAttribute("stroke", "none");
    }
    if (options.fill) {
      path.setAttribute("fill", options.fillColor || options.color);
      path.setAttribute("fill-opacity", options.fillOpacity);
      path.setAttribute("fill-rule", options.fillRule || "evenodd");
    } else {
      path.setAttribute("fill", "none");
    }
  },
  _updatePoly: function(layer, closed) {
    this._setPath(layer, pointsToPath(layer._parts, closed));
  },
  _updateCircle: function(layer) {
    var p = layer._point, r = Math.max(Math.round(layer._radius), 1), r2 = Math.max(Math.round(layer._radiusY), 1) || r, arc = "a" + r + "," + r2 + " 0 1,0 ";
    var d = layer._empty() ? "M0 0" : "M" + (p.x - r) + "," + p.y + arc + r * 2 + ",0 " + arc + -r * 2 + ",0 ";
    this._setPath(layer, d);
  },
  _setPath: function(layer, path) {
    layer._path.setAttribute("d", path);
  },
  // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
  _bringToFront: function(layer) {
    toFront(layer._path);
  },
  _bringToBack: function(layer) {
    toBack(layer._path);
  }
});
if (Browser.vml) {
  SVG.include(vmlMixin);
}
function svg(options) {
  return Browser.svg || Browser.vml ? new SVG(options) : null;
}
Map2.include({
  // @namespace Map; @method getRenderer(layer: Path): Renderer
  // Returns the instance of `Renderer` that should be used to render the given
  // `Path`. It will ensure that the `renderer` options of the map and paths
  // are respected, and that the renderers do exist on the map.
  getRenderer: function(layer) {
    var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;
    if (!renderer) {
      renderer = this._renderer = this._createRenderer();
    }
    if (!this.hasLayer(renderer)) {
      this.addLayer(renderer);
    }
    return renderer;
  },
  _getPaneRenderer: function(name) {
    if (name === "overlayPane" || name === void 0) {
      return false;
    }
    var renderer = this._paneRenderers[name];
    if (renderer === void 0) {
      renderer = this._createRenderer({ pane: name });
      this._paneRenderers[name] = renderer;
    }
    return renderer;
  },
  _createRenderer: function(options) {
    return this.options.preferCanvas && canvas(options) || svg(options);
  }
});
var Rectangle = Polygon.extend({
  initialize: function(latLngBounds, options) {
    Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
  },
  // @method setBounds(latLngBounds: LatLngBounds): this
  // Redraws the rectangle with the passed bounds.
  setBounds: function(latLngBounds) {
    return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
  },
  _boundsToLatLngs: function(latLngBounds) {
    latLngBounds = toLatLngBounds(latLngBounds);
    return [
      latLngBounds.getSouthWest(),
      latLngBounds.getNorthWest(),
      latLngBounds.getNorthEast(),
      latLngBounds.getSouthEast()
    ];
  }
});
SVG.create = create;
SVG.pointsToPath = pointsToPath;
GeoJSON.geometryToLayer = geometryToLayer;
GeoJSON.coordsToLatLng = coordsToLatLng;
GeoJSON.coordsToLatLngs = coordsToLatLngs;
GeoJSON.latLngToCoords = latLngToCoords;
GeoJSON.latLngsToCoords = latLngsToCoords;
GeoJSON.getFeature = getFeature;
GeoJSON.asFeature = asFeature;
Map2.mergeOptions({
  // @option boxZoom: Boolean = true
  // Whether the map can be zoomed to a rectangular area specified by
  // dragging the mouse while pressing the shift key.
  boxZoom: true
});
var BoxZoom = Handler.extend({
  initialize: function(map) {
    this._map = map;
    this._container = map._container;
    this._pane = map._panes.overlayPane;
    this._resetStateTimeout = 0;
    map.on("unload", this._destroy, this);
  },
  addHooks: function() {
    on2(this._container, "mousedown", this._onMouseDown, this);
  },
  removeHooks: function() {
    off(this._container, "mousedown", this._onMouseDown, this);
  },
  moved: function() {
    return this._moved;
  },
  _destroy: function() {
    remove(this._pane);
    delete this._pane;
  },
  _resetState: function() {
    this._resetStateTimeout = 0;
    this._moved = false;
  },
  _clearDeferredResetState: function() {
    if (this._resetStateTimeout !== 0) {
      clearTimeout(this._resetStateTimeout);
      this._resetStateTimeout = 0;
    }
  },
  _onMouseDown: function(e) {
    if (!e.shiftKey || e.which !== 1 && e.button !== 1) {
      return false;
    }
    this._clearDeferredResetState();
    this._resetState();
    disableTextSelection();
    disableImageDrag();
    this._startPoint = this._map.mouseEventToContainerPoint(e);
    on2(document, {
      contextmenu: stop2,
      mousemove: this._onMouseMove,
      mouseup: this._onMouseUp,
      keydown: this._onKeyDown
    }, this);
  },
  _onMouseMove: function(e) {
    if (!this._moved) {
      this._moved = true;
      this._box = create$1("div", "leaflet-zoom-box", this._container);
      addClass(this._container, "leaflet-crosshair");
      this._map.fire("boxzoomstart");
    }
    this._point = this._map.mouseEventToContainerPoint(e);
    var bounds = new Bounds(this._point, this._startPoint), size2 = bounds.getSize();
    setPosition(this._box, bounds.min);
    this._box.style.width = size2.x + "px";
    this._box.style.height = size2.y + "px";
  },
  _finish: function() {
    if (this._moved) {
      remove(this._box);
      removeClass(this._container, "leaflet-crosshair");
    }
    enableTextSelection();
    enableImageDrag();
    off(document, {
      contextmenu: stop2,
      mousemove: this._onMouseMove,
      mouseup: this._onMouseUp,
      keydown: this._onKeyDown
    }, this);
  },
  _onMouseUp: function(e) {
    if (e.which !== 1 && e.button !== 1) {
      return;
    }
    this._finish();
    if (!this._moved) {
      return;
    }
    this._clearDeferredResetState();
    this._resetStateTimeout = setTimeout(bind3(this._resetState, this), 0);
    var bounds = new LatLngBounds(
      this._map.containerPointToLatLng(this._startPoint),
      this._map.containerPointToLatLng(this._point)
    );
    this._map.fitBounds(bounds).fire("boxzoomend", { boxZoomBounds: bounds });
  },
  _onKeyDown: function(e) {
    if (e.keyCode === 27) {
      this._finish();
      this._clearDeferredResetState();
      this._resetState();
    }
  }
});
Map2.addInitHook("addHandler", "boxZoom", BoxZoom);
Map2.mergeOptions({
  // @option doubleClickZoom: Boolean|String = true
  // Whether the map can be zoomed in by double clicking on it and
  // zoomed out by double clicking while holding shift. If passed
  // `'center'`, double-click zoom will zoom to the center of the
  //  view regardless of where the mouse was.
  doubleClickZoom: true
});
var DoubleClickZoom = Handler.extend({
  addHooks: function() {
    this._map.on("dblclick", this._onDoubleClick, this);
  },
  removeHooks: function() {
    this._map.off("dblclick", this._onDoubleClick, this);
  },
  _onDoubleClick: function(e) {
    var map = this._map, oldZoom = map.getZoom(), delta = map.options.zoomDelta, zoom2 = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;
    if (map.options.doubleClickZoom === "center") {
      map.setZoom(zoom2);
    } else {
      map.setZoomAround(e.containerPoint, zoom2);
    }
  }
});
Map2.addInitHook("addHandler", "doubleClickZoom", DoubleClickZoom);
Map2.mergeOptions({
  // @option dragging: Boolean = true
  // Whether the map is draggable with mouse/touch or not.
  dragging: true,
  // @section Panning Inertia Options
  // @option inertia: Boolean = *
  // If enabled, panning of the map will have an inertia effect where
  // the map builds momentum while dragging and continues moving in
  // the same direction for some time. Feels especially nice on touch
  // devices. Enabled by default.
  inertia: true,
  // @option inertiaDeceleration: Number = 3000
  // The rate with which the inertial movement slows down, in pixels/second².
  inertiaDeceleration: 3400,
  // px/s^2
  // @option inertiaMaxSpeed: Number = Infinity
  // Max speed of the inertial movement, in pixels/second.
  inertiaMaxSpeed: Infinity,
  // px/s
  // @option easeLinearity: Number = 0.2
  easeLinearity: 0.2,
  // TODO refactor, move to CRS
  // @option worldCopyJump: Boolean = false
  // With this option enabled, the map tracks when you pan to another "copy"
  // of the world and seamlessly jumps to the original one so that all overlays
  // like markers and vector layers are still visible.
  worldCopyJump: false,
  // @option maxBoundsViscosity: Number = 0.0
  // If `maxBounds` is set, this option will control how solid the bounds
  // are when dragging the map around. The default value of `0.0` allows the
  // user to drag outside the bounds at normal speed, higher values will
  // slow down map dragging outside bounds, and `1.0` makes the bounds fully
  // solid, preventing the user from dragging outside the bounds.
  maxBoundsViscosity: 0
});
var Drag = Handler.extend({
  addHooks: function() {
    if (!this._draggable) {
      var map = this._map;
      this._draggable = new Draggable(map._mapPane, map._container);
      this._draggable.on({
        dragstart: this._onDragStart,
        drag: this._onDrag,
        dragend: this._onDragEnd
      }, this);
      this._draggable.on("predrag", this._onPreDragLimit, this);
      if (map.options.worldCopyJump) {
        this._draggable.on("predrag", this._onPreDragWrap, this);
        map.on("zoomend", this._onZoomEnd, this);
        map.whenReady(this._onZoomEnd, this);
      }
    }
    addClass(this._map._container, "leaflet-grab leaflet-touch-drag");
    this._draggable.enable();
    this._positions = [];
    this._times = [];
  },
  removeHooks: function() {
    removeClass(this._map._container, "leaflet-grab");
    removeClass(this._map._container, "leaflet-touch-drag");
    this._draggable.disable();
  },
  moved: function() {
    return this._draggable && this._draggable._moved;
  },
  moving: function() {
    return this._draggable && this._draggable._moving;
  },
  _onDragStart: function() {
    var map = this._map;
    map._stop();
    if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
      var bounds = toLatLngBounds(this._map.options.maxBounds);
      this._offsetLimit = toBounds(
        this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
        this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
      );
      this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
    } else {
      this._offsetLimit = null;
    }
    map.fire("movestart").fire("dragstart");
    if (map.options.inertia) {
      this._positions = [];
      this._times = [];
    }
  },
  _onDrag: function(e) {
    if (this._map.options.inertia) {
      var time = this._lastTime = +/* @__PURE__ */ new Date(), pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;
      this._positions.push(pos);
      this._times.push(time);
      this._prunePositions(time);
    }
    this._map.fire("move", e).fire("drag", e);
  },
  _prunePositions: function(time) {
    while (this._positions.length > 1 && time - this._times[0] > 50) {
      this._positions.shift();
      this._times.shift();
    }
  },
  _onZoomEnd: function() {
    var pxCenter = this._map.getSize().divideBy(2), pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);
    this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
    this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
  },
  _viscousLimit: function(value, threshold) {
    return value - (value - threshold) * this._viscosity;
  },
  _onPreDragLimit: function() {
    if (!this._viscosity || !this._offsetLimit) {
      return;
    }
    var offset = this._draggable._newPos.subtract(this._draggable._startPos);
    var limit = this._offsetLimit;
    if (offset.x < limit.min.x) {
      offset.x = this._viscousLimit(offset.x, limit.min.x);
    }
    if (offset.y < limit.min.y) {
      offset.y = this._viscousLimit(offset.y, limit.min.y);
    }
    if (offset.x > limit.max.x) {
      offset.x = this._viscousLimit(offset.x, limit.max.x);
    }
    if (offset.y > limit.max.y) {
      offset.y = this._viscousLimit(offset.y, limit.max.y);
    }
    this._draggable._newPos = this._draggable._startPos.add(offset);
  },
  _onPreDragWrap: function() {
    var worldWidth = this._worldWidth, halfWidth = Math.round(worldWidth / 2), dx = this._initialWorldOffset, x = this._draggable._newPos.x, newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx, newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx, newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;
    this._draggable._absPos = this._draggable._newPos.clone();
    this._draggable._newPos.x = newX;
  },
  _onDragEnd: function(e) {
    var map = this._map, options = map.options, noInertia = !options.inertia || e.noInertia || this._times.length < 2;
    map.fire("dragend", e);
    if (noInertia) {
      map.fire("moveend");
    } else {
      this._prunePositions(+/* @__PURE__ */ new Date());
      var direction = this._lastPos.subtract(this._positions[0]), duration = (this._lastTime - this._times[0]) / 1e3, ease = options.easeLinearity, speedVector = direction.multiplyBy(ease / duration), speed = speedVector.distanceTo([0, 0]), limitedSpeed = Math.min(options.inertiaMaxSpeed, speed), limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed), decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease), offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
      if (!offset.x && !offset.y) {
        map.fire("moveend");
      } else {
        offset = map._limitOffset(offset, map.options.maxBounds);
        requestAnimFrame(function() {
          map.panBy(offset, {
            duration: decelerationDuration,
            easeLinearity: ease,
            noMoveStart: true,
            animate: true
          });
        });
      }
    }
  }
});
Map2.addInitHook("addHandler", "dragging", Drag);
Map2.mergeOptions({
  // @option keyboard: Boolean = true
  // Makes the map focusable and allows users to navigate the map with keyboard
  // arrows and `+`/`-` keys.
  keyboard: true,
  // @option keyboardPanDelta: Number = 80
  // Amount of pixels to pan when pressing an arrow key.
  keyboardPanDelta: 80
});
var Keyboard = Handler.extend({
  keyCodes: {
    left: [37],
    right: [39],
    down: [40],
    up: [38],
    zoomIn: [187, 107, 61, 171],
    zoomOut: [189, 109, 54, 173]
  },
  initialize: function(map) {
    this._map = map;
    this._setPanDelta(map.options.keyboardPanDelta);
    this._setZoomDelta(map.options.zoomDelta);
  },
  addHooks: function() {
    var container = this._map._container;
    if (container.tabIndex <= 0) {
      container.tabIndex = "0";
    }
    on2(container, {
      focus: this._onFocus,
      blur: this._onBlur,
      mousedown: this._onMouseDown
    }, this);
    this._map.on({
      focus: this._addHooks,
      blur: this._removeHooks
    }, this);
  },
  removeHooks: function() {
    this._removeHooks();
    off(this._map._container, {
      focus: this._onFocus,
      blur: this._onBlur,
      mousedown: this._onMouseDown
    }, this);
    this._map.off({
      focus: this._addHooks,
      blur: this._removeHooks
    }, this);
  },
  _onMouseDown: function() {
    if (this._focused) {
      return;
    }
    var body = document.body, docEl = document.documentElement, top = body.scrollTop || docEl.scrollTop, left = body.scrollLeft || docEl.scrollLeft;
    this._map._container.focus();
    window.scrollTo(left, top);
  },
  _onFocus: function() {
    this._focused = true;
    this._map.fire("focus");
  },
  _onBlur: function() {
    this._focused = false;
    this._map.fire("blur");
  },
  _setPanDelta: function(panDelta) {
    var keys = this._panKeys = {}, codes = this.keyCodes, i, len;
    for (i = 0, len = codes.left.length; i < len; i++) {
      keys[codes.left[i]] = [-1 * panDelta, 0];
    }
    for (i = 0, len = codes.right.length; i < len; i++) {
      keys[codes.right[i]] = [panDelta, 0];
    }
    for (i = 0, len = codes.down.length; i < len; i++) {
      keys[codes.down[i]] = [0, panDelta];
    }
    for (i = 0, len = codes.up.length; i < len; i++) {
      keys[codes.up[i]] = [0, -1 * panDelta];
    }
  },
  _setZoomDelta: function(zoomDelta) {
    var keys = this._zoomKeys = {}, codes = this.keyCodes, i, len;
    for (i = 0, len = codes.zoomIn.length; i < len; i++) {
      keys[codes.zoomIn[i]] = zoomDelta;
    }
    for (i = 0, len = codes.zoomOut.length; i < len; i++) {
      keys[codes.zoomOut[i]] = -zoomDelta;
    }
  },
  _addHooks: function() {
    on2(document, "keydown", this._onKeyDown, this);
  },
  _removeHooks: function() {
    off(document, "keydown", this._onKeyDown, this);
  },
  _onKeyDown: function(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }
    var key = e.keyCode, map = this._map, offset;
    if (key in this._panKeys) {
      if (!map._panAnim || !map._panAnim._inProgress) {
        offset = this._panKeys[key];
        if (e.shiftKey) {
          offset = toPoint(offset).multiplyBy(3);
        }
        if (map.options.maxBounds) {
          offset = map._limitOffset(toPoint(offset), map.options.maxBounds);
        }
        if (map.options.worldCopyJump) {
          var newLatLng = map.wrapLatLng(map.unproject(map.project(map.getCenter()).add(offset)));
          map.panTo(newLatLng);
        } else {
          map.panBy(offset);
        }
      }
    } else if (key in this._zoomKeys) {
      map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);
    } else if (key === 27 && map._popup && map._popup.options.closeOnEscapeKey) {
      map.closePopup();
    } else {
      return;
    }
    stop2(e);
  }
});
Map2.addInitHook("addHandler", "keyboard", Keyboard);
Map2.mergeOptions({
  // @section Mouse wheel options
  // @option scrollWheelZoom: Boolean|String = true
  // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
  // it will zoom to the center of the view regardless of where the mouse was.
  scrollWheelZoom: true,
  // @option wheelDebounceTime: Number = 40
  // Limits the rate at which a wheel can fire (in milliseconds). By default
  // user can't zoom via wheel more often than once per 40 ms.
  wheelDebounceTime: 40,
  // @option wheelPxPerZoomLevel: Number = 60
  // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
  // mean a change of one full zoom level. Smaller values will make wheel-zooming
  // faster (and vice versa).
  wheelPxPerZoomLevel: 60
});
var ScrollWheelZoom = Handler.extend({
  addHooks: function() {
    on2(this._map._container, "wheel", this._onWheelScroll, this);
    this._delta = 0;
  },
  removeHooks: function() {
    off(this._map._container, "wheel", this._onWheelScroll, this);
  },
  _onWheelScroll: function(e) {
    var delta = getWheelDelta(e);
    var debounce2 = this._map.options.wheelDebounceTime;
    this._delta += delta;
    this._lastMousePos = this._map.mouseEventToContainerPoint(e);
    if (!this._startTime) {
      this._startTime = +/* @__PURE__ */ new Date();
    }
    var left = Math.max(debounce2 - (+/* @__PURE__ */ new Date() - this._startTime), 0);
    clearTimeout(this._timer);
    this._timer = setTimeout(bind3(this._performZoom, this), left);
    stop2(e);
  },
  _performZoom: function() {
    var map = this._map, zoom2 = map.getZoom(), snap = this._map.options.zoomSnap || 0;
    map._stop();
    var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2, d4 = snap ? Math.ceil(d3 / snap) * snap : d3, delta = map._limitZoom(zoom2 + (this._delta > 0 ? d4 : -d4)) - zoom2;
    this._delta = 0;
    this._startTime = null;
    if (!delta) {
      return;
    }
    if (map.options.scrollWheelZoom === "center") {
      map.setZoom(zoom2 + delta);
    } else {
      map.setZoomAround(this._lastMousePos, zoom2 + delta);
    }
  }
});
Map2.addInitHook("addHandler", "scrollWheelZoom", ScrollWheelZoom);
var tapHoldDelay = 600;
Map2.mergeOptions({
  // @section Touch interaction options
  // @option tapHold: Boolean
  // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
  tapHold: Browser.touchNative && Browser.safari && Browser.mobile,
  // @option tapTolerance: Number = 15
  // The max number of pixels a user can shift his finger during touch
  // for it to be considered a valid tap.
  tapTolerance: 15
});
var TapHold = Handler.extend({
  addHooks: function() {
    on2(this._map._container, "touchstart", this._onDown, this);
  },
  removeHooks: function() {
    off(this._map._container, "touchstart", this._onDown, this);
  },
  _onDown: function(e) {
    clearTimeout(this._holdTimeout);
    if (e.touches.length !== 1) {
      return;
    }
    var first = e.touches[0];
    this._startPos = this._newPos = new Point(first.clientX, first.clientY);
    this._holdTimeout = setTimeout(bind3(function() {
      this._cancel();
      if (!this._isTapValid()) {
        return;
      }
      on2(document, "touchend", preventDefault);
      on2(document, "touchend touchcancel", this._cancelClickPrevent);
      this._simulateEvent("contextmenu", first);
    }, this), tapHoldDelay);
    on2(document, "touchend touchcancel contextmenu", this._cancel, this);
    on2(document, "touchmove", this._onMove, this);
  },
  _cancelClickPrevent: function cancelClickPrevent() {
    off(document, "touchend", preventDefault);
    off(document, "touchend touchcancel", cancelClickPrevent);
  },
  _cancel: function() {
    clearTimeout(this._holdTimeout);
    off(document, "touchend touchcancel contextmenu", this._cancel, this);
    off(document, "touchmove", this._onMove, this);
  },
  _onMove: function(e) {
    var first = e.touches[0];
    this._newPos = new Point(first.clientX, first.clientY);
  },
  _isTapValid: function() {
    return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
  },
  _simulateEvent: function(type, e) {
    var simulatedEvent = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window,
      // detail: 1,
      screenX: e.screenX,
      screenY: e.screenY,
      clientX: e.clientX,
      clientY: e.clientY
      // button: 2,
      // buttons: 2
    });
    simulatedEvent._simulated = true;
    e.target.dispatchEvent(simulatedEvent);
  }
});
Map2.addInitHook("addHandler", "tapHold", TapHold);
Map2.mergeOptions({
  // @section Touch interaction options
  // @option touchZoom: Boolean|String = *
  // Whether the map can be zoomed by touch-dragging with two fingers. If
  // passed `'center'`, it will zoom to the center of the view regardless of
  // where the touch events (fingers) were. Enabled for touch-capable web
  // browsers.
  touchZoom: Browser.touch,
  // @option bounceAtZoomLimits: Boolean = true
  // Set it to false if you don't want the map to zoom beyond min/max zoom
  // and then bounce back when pinch-zooming.
  bounceAtZoomLimits: true
});
var TouchZoom = Handler.extend({
  addHooks: function() {
    addClass(this._map._container, "leaflet-touch-zoom");
    on2(this._map._container, "touchstart", this._onTouchStart, this);
  },
  removeHooks: function() {
    removeClass(this._map._container, "leaflet-touch-zoom");
    off(this._map._container, "touchstart", this._onTouchStart, this);
  },
  _onTouchStart: function(e) {
    var map = this._map;
    if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) {
      return;
    }
    var p1 = map.mouseEventToContainerPoint(e.touches[0]), p2 = map.mouseEventToContainerPoint(e.touches[1]);
    this._centerPoint = map.getSize()._divideBy(2);
    this._startLatLng = map.containerPointToLatLng(this._centerPoint);
    if (map.options.touchZoom !== "center") {
      this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
    }
    this._startDist = p1.distanceTo(p2);
    this._startZoom = map.getZoom();
    this._moved = false;
    this._zooming = true;
    map._stop();
    on2(document, "touchmove", this._onTouchMove, this);
    on2(document, "touchend touchcancel", this._onTouchEnd, this);
    preventDefault(e);
  },
  _onTouchMove: function(e) {
    if (!e.touches || e.touches.length !== 2 || !this._zooming) {
      return;
    }
    var map = this._map, p1 = map.mouseEventToContainerPoint(e.touches[0]), p2 = map.mouseEventToContainerPoint(e.touches[1]), scale2 = p1.distanceTo(p2) / this._startDist;
    this._zoom = map.getScaleZoom(scale2, this._startZoom);
    if (!map.options.bounceAtZoomLimits && (this._zoom < map.getMinZoom() && scale2 < 1 || this._zoom > map.getMaxZoom() && scale2 > 1)) {
      this._zoom = map._limitZoom(this._zoom);
    }
    if (map.options.touchZoom === "center") {
      this._center = this._startLatLng;
      if (scale2 === 1) {
        return;
      }
    } else {
      var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
      if (scale2 === 1 && delta.x === 0 && delta.y === 0) {
        return;
      }
      this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
    }
    if (!this._moved) {
      map._moveStart(true, false);
      this._moved = true;
    }
    cancelAnimFrame(this._animRequest);
    var moveFn = bind3(map._move, map, this._center, this._zoom, { pinch: true, round: false }, void 0);
    this._animRequest = requestAnimFrame(moveFn, this, true);
    preventDefault(e);
  },
  _onTouchEnd: function() {
    if (!this._moved || !this._zooming) {
      this._zooming = false;
      return;
    }
    this._zooming = false;
    cancelAnimFrame(this._animRequest);
    off(document, "touchmove", this._onTouchMove, this);
    off(document, "touchend touchcancel", this._onTouchEnd, this);
    if (this._map.options.zoomAnimation) {
      this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
    } else {
      this._map._resetView(this._center, this._map._limitZoom(this._zoom));
    }
  }
});
Map2.addInitHook("addHandler", "touchZoom", TouchZoom);
Map2.BoxZoom = BoxZoom;
Map2.DoubleClickZoom = DoubleClickZoom;
Map2.Drag = Drag;
Map2.Keyboard = Keyboard;
Map2.ScrollWheelZoom = ScrollWheelZoom;
Map2.TapHold = TapHold;
Map2.TouchZoom = TouchZoom;

// src/js/leaflet/barrioInfo.ts
var barrioInfo = control();
barrioInfo.onAdd = function(map) {
  this._div = DomUtil.create("div", "transparent");
  this.update();
  return this._div;
};
barrioInfo.update = function(props) {
  this._div.innerHTML = props ? '<div class="info"><b>Barrio ' + props.Nombre_de_Barrio + "</b></div>" : "";
};
async function barriosLayer(map) {
  var geojson;
  function style2(feature) {
    return {
      fillColor: feature.properties.fillColor,
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.2
    };
  }
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    barrioInfo.update();
  }
  function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.3
    });
    layer.bringToFront();
    barrioInfo.update(layer.feature.properties);
  }
  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }
  barrioInfo.addTo(map);
  return fetch("../json/barrios_old.json").then((res) => res.json()).then((data2) => {
    globalThis.barrios = data2;
    geojson = geoJson(data2, { style: style2, onEachFeature });
    geojson.addTo(map);
    return geojson;
  });
}

// src/js/leaflet/metroInfo.ts
var metroInfo = control();
metroInfo.onAdd = function(map) {
  this._div = DomUtil.create("div", "transparent");
  this.update();
  return this._div;
};
metroInfo.update = function(props) {
  this._div.innerHTML = props ? '<div class="info"><b>Metro ' + props.Nombre + "</b><br><b>Linea: </b>" + props.L\u00EDnea + "</div>" : "";
};
var metroIcon = icon({
  iconUrl: "metro.png",
  iconSize: [26, 26],
  // size of the icon
  iconAnchor: [13, 26],
  // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76]
  // point from which the popup should open relative to the iconAnchor
});
var metrogeojson;
function resetMetroHighlight(e) {
  metrogeojson.resetStyle(e.target);
  metroInfo.update();
}
function highlightMetroFeature(e) {
  var layer = e.target;
  metroInfo.update(layer.feature.properties);
}
async function metroLayer(map) {
  metroInfo.addTo(map);
  return fetch("../json/capa_metro.geojson").then((res) => res.json()).then((data2) => {
    metrogeojson = geoJson(data2, {
      onEachFeature: function(feature, layer) {
        if (layer instanceof Marker) {
          layer.setIcon(metroIcon);
        }
        layer.on({
          mouseover: highlightMetroFeature,
          mouseout: resetMetroHighlight
        });
      }
    }).addTo(map);
    return metrogeojson;
  });
}

// src/js/leaflet/colegioInfo.ts
var colegioInfo = control();
colegioInfo.onAdd = function(map) {
  this._div = DomUtil.create("div", "transparent");
  this.update();
  return this._div;
};
colegioInfo.update = function(props) {
  this._div.innerHTML = props ? '<div class="info"><b>Colegio ' + props.Nombre + "</b></div>" : "";
};
var colegioIcon = icon({
  iconUrl: "colegios.png",
  iconSize: [26, 26],
  // size of the icon
  iconAnchor: [13, 26],
  // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76]
  // point from which the popup should open relative to the iconAnchor
});
var colegiogeojson;
function resetcolegioHighlight(e) {
  colegiogeojson.resetStyle(e.target);
  colegioInfo.update();
}
function highlightcolegioFeature(e) {
  var layer = e.target;
  colegioInfo.update(layer.feature.properties);
}
async function colegioLayer(map) {
  colegioInfo.addTo(map);
  return fetch("../json/capa_colegios.geojson").then((res) => res.json()).then((data2) => {
    colegiogeojson = geoJson(data2, {
      onEachFeature: function(feature, layer) {
        if (layer instanceof Marker) {
          layer.setIcon(colegioIcon);
        }
        layer.on({
          mouseover: highlightcolegioFeature,
          mouseout: resetcolegioHighlight
        });
      }
    }).addTo(map);
    return colegiogeojson;
  });
}

// src/js/leaflet/exampleLayers.ts
var exampleLayers = [
  {
    type: "deals",
    slug_name: "venta_departamentos",
    name: "Departamentos en Venta",
    checked: true,
    criteria: {
      id_tipo_propiedad: 1,
      id_tipo_negocio: 1
    },
    layer_options: {
      icon: {
        url: "data:image/png;base64,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"
      },
      name: "Departamentos en Venta",
      url_low_emphasis: "data:image/png;base64,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",
      text: "f1ad",
      type: "deals",
      scale: 0.7,
      criteria: {
        id_tipo_negocio: 1,
        id_tipo_propiedad: 1
      },
      className: "icon-building-filled",
      slug_name: "venta_departamentos",
      fontFamily: "fontello",
      checked: true,
      fillOpacity: 0.85,
      strokeColor: "#3060ff"
    }
  },
  {
    type: "deals",
    slug_name: "arriendo_departamentos",
    name: "Departamentos en Arriendo",
    checked: true,
    criteria: {
      id_tipo_propiedad: 1,
      id_tipo_negocio: 2
    },
    layer_options: {
      icon: {
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAAXNSR0IArs4c6QAACgJJREFUaEPtmXl8TFkWx3/3VVVWSWSVWBLEGjK2oWnS1mBsYxlbD6PDR7Slm7YMQsfSLW0JesaIQftg+KAbTSMGibY2zYxdYmkZkdARKqmsUklVvTOf+6qKhKh6lUpMT3/cf+pT75177vnec+95557L8Ctt7FfKhbdg/2+efeuxtx77hczA26X4C3GEbDPemMfarCcVt+rSBKaTbZ0dglUCFrA6tbVA6EpgYQSEMiJ/AnMAI25qESM8EkHXFIz9S2Q4kfFJ3ct2MJTbtVLBaq5InUIQJ4HBnxH0YPDiKIwxEJHxF2TiY7kiY9kCkSeBZTAS1we4Z6+/NOG3leLRSgELiL0XSSItAaAH4AspoZGQbPhFBgMcYTDMz5jbeIO9HrQLLCA2OQgGxXYCmgDwLAsCBHqoEOLngDruKrg5CpKt+cUi0vP0SH5SjLRc7hzzBDxHyWKgJCgMERkzQx5UFLDCYAGxye+JemE/CO5G44xY/m5KjGpZHf0bu6GRj6NFu+6qi3HwTj62X81BRj5fuc8xi6W9qKLBGTNDTlcErkJgfstuhEMvHBQYKY1IxjavSw181MGnInZgzXk1Yk5mmqbIrILpSSH2fzI7NMFWpTaD+Sy51lpBwhkCPXdHywBnrOpbG81qONk6fhn5pEwtpsc/xNWMoufPGVixgYlh6nktbIqctoGt/7fK74kqCaD65pHDG7hj+4h6dgG93HnUrvtIuJdnfEwAE1h6pk7RGIual8gdyCYw30VX/sYgDiMwLz5iWD137B3dQO5YNskN2fYTztwvMO06FDARu54savOhXCWywWrM+7E9OSgTSSQnHiZqeahwLLIpfF2lhEJqW8+n41GuVu7YUAoM4zoGwtvV4ZU+Twt16LnhNh7l8jgimakV9PoemUva/yhnANlgPp9eOMAIPYiRAxjD1hEN0aepZ5kxHCYfkjNmGZmtH7TCyLa1yu13+LYGY3bcNYMBjI6pF7fvI2cQWWBen15sJpDhPAAXrnRAc29sGt7wFf1mMO4JxgCdgeCkEqDViVApGEQCDOKLZ1zBljGt8H678sH4+3Ff/4QDN7OksRhDkd4gdtDEdLxpDU4WmM/8MwsJQgREkiw4POE3aBfo9lqwFUNCULu6Mybvuo7Hy3shKCoRywc3RWpWEQ5cf4w9kW0RFGWM4NbALqblo8/662awpwA2qJd0WlApYN5zT18HWAgPGK1quyFhUsty9Zo95qgUIPDp1RlQ3VmFnCIdnFUKGIigM4hwc1QiT8uzL+tgXCY87iquPMw3jklIyVr6XmO7wXxnnfA3CCwFpu/WrO51MSe8rkWwiHd5QFBh3alUbB/XGmO3XgV/9jhPiwv3czC/T0NEbL0qG2xpQipWHE81caFEoVAEq2Pey7AEZ3Upev05MRwQvgKMy3D3uJbo1sjLItjQNjXh5aLCtgsPsWZ4KKbvuQn+TF1QgstpuZjarT5m7EmSDfb93WwM3WScCABZAI3KXt7DYjZiFcxzxtFIMCEaIH8edq9FdUIdz/IzDPNS9HBWQikIyCosQZC3Cx5kPZNCOl+GhSUG+Ls74lGO8bNgbY9xmXSNFi1izphPC0UgmqFZ2cviCUAG2LEoBvqIpOMIkB3b87UrwAwW3bcRAjycELX/Fq5Hd0HbmNOY36cR0jVFOJr8FJv/1BKtlpySDcYFvWYeM41LekBYrFnZM8aupVh9evxCiGwqGKQwqFn1O6tg1jZ26fdyPMblPaf/0xw88iHQX3JW9V1oF5jnJweiRBKiGUHJEwDN6r5WwWb1DEYNdycsPnQHZ2d1QvfV5zAjPBg/52iReFuNtSND0XXVOZs85jktXkpAiNhTQaA1mtX97POYx8f7IgFFLIhcuOIbC8JRx8vZYvDo2dQXbs5KxN/IxNzeDbH86D30auYHzTMdbj/Oxx/b1UZsQopssPTsIoQuTDBlVngMiItz/zrIvj3mMfnbcBKEfzAiXw62d+K76N7UzyJYXW8X8G/ZnUyexJZtLg4KhNZyx4X7Gtlgx289wZC4c2awdIgUmbt2sH1R0SVyb4BCiRQGkjLV2X2aIKpvM4tgPPer5qjExrMPwEHMEUovEup4OmN8WBBmf5ssGywmPgnLDt+W5EWgmCAGF8YNe2zXHuOd3Sd+cwdAMJ+y1kGeODG7u0Uw80ufag74edmLKLoqMQVz9t0q01dO8Oi67DguP8iWkkUiSspfN6yFtQBlNdxLYBN2LCKwSIBJIT9hVne8E/xqCeDl7P5lsBXHUjDvO9vALqSoEb7iuMRBYI/AxM0Ffx9pMSJyWVlg1T7c1Ryi4TwDk6LGoDaB2BrZ8ZVJc/04XsroS7fSS1GrF6XsvnTbOa4NhrQOeK0Dxmz4AfsupRnfEz0jsA4FG983pi0Wmiww3r/a+G0nQehkLpbtnNQZ/VrVKaM6KSNfSpvkNn68aVfXUzrSlNcOXUnHiLhT5upVCQQkFm4YPUCOftlgLuM3t1WIikQR5Mo71fZyxan5feHnbl8B53VGPsnTovPn8UjPLgQD31vQKgRDj7yvIir3BM0NcInYEgeigYyRFO+7hATg0MzecibQZpl+sUdwMtmYwDMI2SLRN8+2REyRq0i2x8wKXcZsvMmY0MRc2uzVojb2Tnt9/ijXkNJyf/gyAUeu8X1lrPULwH8KHAzNsGGC7Lq+zWDOo+OGMijXEIOPVLklQpv6fogbG4bQQO+KcDzvcyMtCxM3ncaVVHWpSwwUM5HCnm2fUIV1RZMJrh+sG00GrJTKcPwWxTSznw1vjxn9yj9dWyOOPXgFC3ZfNAKZ9AFML0Dfv3D7lKqvBJsNdBy1tjcjxDGCKwBv43URUNOzGsZ2DcGgd4LRtFbZKtbLcLceabDvQgo2n0jGw+wCqT/xAqnxNw+ggdodU95c7d5soNPo9YFMX7KZAF6D8H/50qierzuaB/kgyMcN7i4OUtjOfVaCNHU+rj9Q48HTvHIum0jDINwmhlHaHVPe/G1L6dl3HLZyBRMUo0DwLf35NYOaZS39N73LB9js4q+n/m/vx0rDuY78soZBFM8TIVAOiDGMmy+g+PKjNIWg6FC4c1qmtf0o573NUdGSUqehSwNFUvzAwAKkK1lTELD2CyBDYIaO2t1zTLmTHNMty1QqGB/KceiqBiDdWSL+OTDdOZf7a/SYSKQWFKpOxbun37Mf54WGSgfjqh2GLG1GongKYNVffxctGZHD9LrOJQejrSa1tkJXCRg3QjXgi1YQxBMgVCv3jh0ogCh01R2Ye8VWo+XIVxmYBDfw83Yk0vcM5PQiWhqvhJjAuun2z78ox8iKyFQpGDdI+fvFYRDFBBBJVS6eTUAQwvXfRfMKaJW1KgeT4PpFdyeRjkhYAuutP7TYeCSuwvZGwLj9in5zpQs7w6EvDlchz3PV/wUUJ9RkRModogAAAABJRU5ErkJggg=="
        //url: 'data:image/png;base64,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',
        //url_alt_b:  data:image/png;base64,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
        //url: 'data:image/png;base64,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',
      },
      name: "Departamentos",
      url_low_emphasis: "data:image/png;base64,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",
      text: "f1ad",
      type: "deals",
      scale: 0.7,
      criteria: {
        id_tipo_negocio: 1,
        id_tipo_propiedad: 1
      },
      className: "icon-building-filled",
      slug_name: "departamentos",
      fontFamily: "fontello",
      checked: true,
      fillOpacity: 0.85,
      strokeColor: "#3060cf"
    }
  },
  {
    type: "deals",
    slug_name: "venta_casas",
    name: "Casas en Venta",
    checked: true,
    criteria: {
      id_tipo_propiedad: 2,
      id_tipo_negocio: 1
    },
    layer_options: {
      strokeColor: "#109010",
      scale: 0.7,
      clickable: true,
      fontSize: 32,
      className: "icon-home",
      text: "e800",
      fillOpacity: 0.85,
      checked: true,
      icon: {
        //url: 'data:image/png;base64,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',
        url_alt_c: "data:image/png;base64,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",
        url: "data:image/png;base64,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",
        url_alt_a: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAAAXNSR0IArs4c6QAACr5JREFUaEPtmXl4U1UWwM99Ly9pli5JmzRJW8oustO0IAiDWnG0DcX5/OBDlBkEWYZFqQjI4FK2YRukiMhiGccBLcqMn7SlOnQQUBChtGWnbNUWmnRvkzbN+t6d7z6kUGmblzblc/x4/2R5955zfufce8657yH4jV7oN8oFD8D+3yL7IGIPIvYr8cCDpfgrCYRgM+5bxAyGGQyxKi9vh1uwdR0Y2ClgOoMxBgN+HNH0KABqAOI4LQYs+dlOGwCYMOAzCMNJhKhDplMZBR1gaHGqX8H0sca5APRsRFNasVzFMnJlqEgiA5qRAlAU3w1wHAfYbQe3o8HitNVWu211SsRxJgzsdhPWbwc/RdQvYLqYxBmIFq0SyQJZqTJCI5aFAMYACIGgT4+9DhprSk2eRqsYc9xSc37Whx2NYIfAdEMSopE44BOaFveRa7qpGGkgYAA+MuQzUh0CvbtqICIsGBQyCf9/faMTTFUWKPypAkyVdc3Gs3YrNFT+WM25Xec41j3FnJdV0l7AdoNp48aOphH1pSREFyxTRTZFRqMMgvHxg9GYYQ9Dj8iwNu26frMKDpy4BP/+5jQuq7Y2Rdhec9PhsJjt2I3/YC7I+LY9cO0C08cmjQGALLmmOyMODG2KUPLzT6Bp40a0xw5I23cMNqUfxhgwL89ZXw22iiKSQY2mUxk5vgr1GYxkPISo7+Th3aViuZKPVP8eelg+ayx6KDrcV/3Nxl8uLoe3tmXii0UmXq6nsRbqy4scgLmR5rysfF+E+wZmmMFE0BUXpEp9T3GQhvfs7wy94YPFz/smx4uFs9em4yN5V3j5DmsFOGrNJVpW3cuXGuiTQfrYce+L5EETFepuKrJkhg/sCTvf+qNPMoR6feqKj/GJs0WAMYbGqpJ6j70uvfTkvllC5ws2Kjxm7CM0jQ4GRfWXUoiG8LBg2LtmJgoNUQjV5dO46roGmPDGDmyuquVrhqXknB1xOL40P/MHIYIEg+njxmUEhGifEitCxaQ+bV78Aoof2leIDmA5Dm6YyqFrpK5pfHllDdgdTpBKJRAepmpRzsGTl2Dumt2Y6HNaq8FuKf/anPtlghClgsC0cWP7URj9EBzVX06W4NOPDoSNCyYKmlteVQPTF66GggtX4Pejh0HqsmRQyKQw4MkXoc5aD2GqECj4+uNWbU3esAf/59hZvt5Zb1ywcQg/UpabecEbnCDjtDHGdwIUymkBqohIApa++s9oSJ9ob7Lh/OUieGnBSiirqIZQZTBU11qgd/cukLZuCRinvA7WBhsogwPhbM7uVmUVFBbDpCXb+DLgrDVVuGy120ynslK8KRcEpjMknZWro/uTvq9/r0jYu36u13n7D34PyctSweF0QfL0ifDcM4/Dhh2fwhdfHYagQDnY7U5wezxewQjAhIVb8NmrJcC5HGCrKr5qyt33UIfB1HEJWgZT1xX6PlIECOZMHAPznh/TJljqzs/g3R3pIBEz8O7br8K5wuuQticDVi2aCTV1Vli3dTdwHFlcIAjs/fQcvHnPASD6raZCpwex3Spzs8vagvPqedJlIBGTJld3jSKC01JeRiNjWnYYic5ryzdBZs5RCFerIPWd+bD9ky/h8PE7tXXK+EQYETsAXlu2CRoa7RCkkMOZnF0goulW7TyafxmmpXyIiX5b5U/VnMc1yVs34hVMF2OcLpIFpgQo9Voy+Ju0pVSERnmPESTLTVu4Cs5cvAYD+vSApfOmwF/WbYOi4tJ7xg6P6Q/zp0+E11ds5rPlyKGDYNtfF0FwUMulw1RRC4+9vIrjC3Zdmd1tsyR7OwF4BzMYl4jlIa+KgzRqknYvZ2ygfmnpxSs/wp9eW8EnicT4EWB8ciQsWvk+1NsaW41ClD4c1i+dCxvT9sCJggvQPToC/pn6NkRHaFuc03vsAo7od1mqWKet5h1zXtbqDi5FYwojV85nFKpAshSuZG28B+yrQ8dh5htr4ZWpEyBAIob12+7sobaUy6QBsGbJbDiedx72Zh2EvdtXQezAh1uc0ss4nyP6nQ3V9R5bbaq3zCgwYspljEJFk8FX9qfeA0YsKSktB4VcCoOemuwtYTW7rwoJgjMHdvHzu0S03kT3SiRgAC5rVaXLbtnU4Yjd2mOKdyWBahmx6PA/UqgITcudAsl4vwSjKARd9LeWF4c5HuDuy1sdI2NLK2rgsSkpHPnutFSUeRy2lA7vMT4r0qJdUqVeTdrtj1bOQSNj+rQY6ZbA7jbc2/3WQn00vxC/tHQLf1CzV5eWYI6d0eGsSOqYCNNF0tAoCaGZ90ICenVy4n0Fe2/Xfrzpk2xMlNqrShxuiuvR4TpGvKiPTSqUBKl7UYwYBvaOhi/eW9ziPvMWEW/3W4vYc6+s5U5fLgbscZGleN6UlznI20b2mjxugRlTaLFsFiNXqkm/8K+NC6mYfj3ukU26dbLHyOfty9tS7Nk1Eg59vqVVO/MvXIfxyev5/eVurC112xt3luVnLfMLGOnuEQc/SFU6GTmyJ442oM1vzmjRKaRjr7M0NOmlKKop25E2qqS0eScUFhrCd/utXXNX7sBffZtHemCwW8w2DDDcb909UaqLTTrCSOSjqAA5v9a3L5+DxowYLCji3rzb2v2c70/jGW9v4fWxzkaXy1GfU3YqM0mIPMGGaWONQxFCOZJAjYJ0AFq1CjI+eJMKUwYJ0ePzmKpaK4ybvZIzVdQAIkcWa6WD5SC+3N8naGKZ1mDcKhJJnhXJgjTk96ND+qLdG14X7Bxf6F5c8Dd8rOAifwRw2+trsMf1melUxlyhMnw2SmcwnmMksn6URMYrfWLYILRz9Xyf5bRl4LQlqfibE2d4+azTjlhn4zUT6Pr58lzfZ4O0hsTxCNGbaUaioRkpySUwuE83WLNwKvVwzy5CHdriuEvXSmDx+r9zZwt/5B8FYNaFPI4GOwCM6tznij+boxsydjJQsIFmJGEUI+UfthBDlsycgGZNMvrsLCJ266dZeO32z3lH8cnC40Kcs9ENCN2fJ8G3Xa2LS3gaWLSVEonltFgW2vS/RgWTkh5Hz4weinp1jWgzgld/KoXsIydxesYhbK6oaRrLehwIe1wWDsGzZbmZR9qzDNrl3SYIg7ELBvgIUeghmpHpKKr5KThKr4a+PaJRpC4MAuV8D82f0W6aq+Di9WJ8w1TZzGbMscC6HbWAuUuYZV80F2QXtweKzOkQ2G2l+ljjOozRZEok1iARw9edu18nCfnNetwIs8564PAic/7+He0Fuj3PL2BEmGZYUjjN4uMUzURTIubWk5o2AO++Dx43Yll3MUuj4RUnMpqfa9pJ6Dcwol8fNy4KMPs9ohg9okX4zivN24S3X3He+Y1JpDi3CRA9wpS770Y7Oe6Z5lcwIj0yJqkni/BRRIvUFIFrY1FyLIsw66mkMRp5Mz/jmr+g/LbHfmmQdsi4vohmv6MoJgQjdGfP3fVOGlgOcdhTh1l6VFnBvov+hOo0MCI4Ii5hMMdRRxAlUiAK/VyfSNeHyTMChDlPA0Vxo0tzs0/7G6pTwYjwcEPCMAqog4BoKaIIEQLMkgCydg64+PK87BOdAdXpYESBLiZxFELov4AoEV9dMOvBGD9pzt//XWdB3RcwflkOMcazFBwg32kOniotyDrYmVD3DYwo0sYa+Rd2Zaeysjsbisj/H9uSlXPXWKYoAAAAAElFTkSuQmCC"
      },
      name: "Casas",
      url_low_emphasis: "data:image/png;base64,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",
      slug_name: "casas",
      fontFamily: "fontello"
    }
  },
  {
    type: "deals",
    slug_name: "arriendo_casas",
    name: "Casas en Arriendo",
    checked: true,
    criteria: {
      id_tipo_propiedad: 2,
      id_tipo_negocio: 2
    },
    layer_options: {
      strokeColor: "#107010",
      scale: 0.7,
      clickable: true,
      fontSize: 32,
      className: "icon-home",
      text: "e800",
      fillOpacity: 0.85,
      checked: true,
      icon: {
        url_alt_0: "data:image/png;base64,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",
        url: "data:image/png;base64,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"
        //url: 'data:image/png;base64,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',
      },
      name: "Casas",
      url_low_emphasis: "data:image/png;base64,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",
      slug_name: "casas",
      fontFamily: "fontello"
    }
  }
];
var PublicLayersObject = exampleLayers.reduce((acc, layer) => {
  layer.layer_options.checked = true;
  acc[layer.slug_name] = layer;
  return acc;
}, {});

// src/js/leaflet/LeafletMap.ts
var LeafletMap = () => ({
  map: null,
  exampleLayers,
  async init() {
    this.map = createMap("map", {
      zoomControl: false
    }).setView([-33.43, -70.5777], 13);
    control.zoom({
      position: "bottomright"
    }).addTo(this.map);
    globalThis.map = this.map;
    globalThis.leafletMap = this;
    const cartoCDN = tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20
    });
    cartoCDN.addTo(this.map);
    globalThis.layerControl = control.layers(
      null,
      null,
      { collapsed: false, position: "topright" }
    );
    globalThis.layers = globalThis.layers || {};
    this.barrioslayer = await barriosLayer(this.map);
    this.metrolayer = await metroLayer(this.map);
    this.colegioLayer = await colegioLayer(this.map);
    globalThis.layerControl.addOverlay(this.barrioslayer, "Barrios");
    globalThis.layerControl.addOverlay(this.metrolayer, `<img style="display:inline;height:28px;width:24px;" src="metro.png"> Metro`);
    globalThis.layerControl.addOverlay(this.colegioLayer, `<img style="display:inline;height:28px;width:24px;" src="colegios.png"> Colegios`);
    this.$store.columnas_actuales.on("ready", () => {
      this.fetchPublicaciones();
    });
    let url = new URL(location.href);
    if (url.searchParams.get("extent")) {
      let [west, south, east, north] = url.searchParams.get("extent").split(",");
      var bounds = new LatLngBounds([[north, east], [south, west]]);
      this.map.fitBounds(bounds);
    } else {
      globalThis.layerControl.addTo(this.map);
    }
  },
  fetchPublicaciones() {
    module_default.store("negocios").next_page_url = "https://lacasadejuana.cl/api/publicaciones";
    module_default.store("negocios").complete = false;
    return this.$store.negocios.restart().then(async (result) => {
      setTimeout(() => this.$store.negocios.total = this.$store.negocios.properties.length, 1e3);
      console.info("fetched negocios", this.$store.negocios.properties.length);
    });
  }
});

// src/js/leaflet/index.ts
window.Alpine = module_default;
globalThis.Alpine = module_default;
globalThis.backendPaginator = { total: 500 };
if (!console.timerInfo) {
  Object.defineProperty(console, "timerInfo", {
    get: function() {
      return Function.prototype.bind.call(
        console.debug,
        console,
        "%c" + Number(performance.now() / 1e3).toFixed(2) + " Timer:",
        "color:#03C;font-weight:bold;"
      );
    }
  });
}
if (!console.marquee) {
  Object.defineProperty(console, "marquee", {
    get: function() {
      return (obj, ...args) => {
        let colors = Object.values(obj), payload = [""].concat(Object.keys(obj));
        console.log(payload.join("%c "), ...colors, ...args);
      };
    }
  });
}
globalThis.backendPaginator = { total: 500 };
document.addEventListener("alpine:init", () => {
  module_default.data("LeafletMap", LeafletMap);
});
document.addEventListener("DOMContentLoaded", () => {
  module_default.start();
});
/*! Bundled license information:

leaflet/dist/leaflet-src.esm.js:
  (* @preserve
   * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
   * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
   *)
*/
//# sourceMappingURL=leaflet.js.map
