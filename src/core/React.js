function createElement(type, props, ...children) {
  return {
    type,
    props,
    children: children.map((child) => {
      const isTextNode = ["string", "number"].includes(typeof child);
      return isTextNode ? createTextElement(child) : child;
    }),
  };
}

const TEXTELEMENTTYPE = "TEXT_ELEMENT";

function createTextElement(text) {
  return {
    type: TEXTELEMENTTYPE,
    props: {
      nodeValue: text,
    },
    children: [],
  };
}

let nextFiberOfUnit = null;

function render(el, container) {
  nextFiberOfUnit = {
    dom: container,
    children: [el],
  };
}

let preFiber = null;
function initChildLink(fiber, children) {
  children.forEach((child, index) => {
    const nextFiber = {
      ...child,
      child: null,
      sibling: null,
      parent: fiber,
      dom: null,
    };
    if (index === 0) {
      fiber.child = nextFiber;
    } else {
      preFiber.sibling = nextFiber;
    }
    preFiber = nextFiber;
  });
}

function createDom(type) {
  const isTextNode = type === TEXTELEMENTTYPE;

  return isTextNode
    ? document.createTextNode("")
    : document.createElement(type);
}

function updateProps(dom, props) {
  for (const key in props) {
    dom[key] = props[key];
  }
}

function performRender(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber.type);

    updateProps(fiber.dom, fiber.props);

    fiber.parent.dom.append(fiber.dom);
  }

  initChildLink(fiber, fiber.children);

  if (fiber.child) {
    return fiber.child;
  }

  if (fiber.sibling) {
    return fiber.sibling;
  }

  let fiberParent = fiber.parent;

  while (fiberParent) {
    if (fiberParent.sibling) {
      return fiberParent.sibling;
    }
    fiberParent = fiberParent.parent;
  }
}

function workLoop(deadline) {
  let shouldYield = false;

  while (!shouldYield && nextFiberOfUnit) {
    nextFiberOfUnit = performRender(nextFiberOfUnit);
    shouldYield = deadline.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

export default {
  createElement,
  render,
};
