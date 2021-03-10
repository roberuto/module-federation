type Options = {
  selector: string;
};

type Module = {
  mount: (element: Element, options: Options) => void;
};

type Scope = unknown;
type Factory = () => Module;

type Container = {
  init(scope: Scope): void;
  get(module: string): Factory;
};

type Init = (module: string, options: Options) => void;

declare const __webpack_init_sharing__: (scope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };
