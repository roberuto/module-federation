export const init: Init = (moduleName, options) => {
  const { selector } = options || {};

  if (!selector) {
    throw Error("Selector required");
  }

  const element = document.querySelector(selector);

  if (!element) {
    throw Error("Element not found");
  }

  const remoteScript = document.createElement("script");
  remoteScript.setAttribute("src", process.env.SCRIPT as string);
  document.head.appendChild(remoteScript);

  remoteScript.addEventListener("load", async () => {
    await __webpack_init_sharing__("default");

    const container = (<any>window)[process.env.CONTAINER as string] as Container;
    await container.init(__webpack_share_scopes__.default);

    const factoryFn = await container.get(`shareable/${moduleName}`);
    const module = factoryFn();

    module.mount(element, options);
  });
};
