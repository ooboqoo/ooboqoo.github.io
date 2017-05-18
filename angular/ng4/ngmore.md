# Angular 细节知识点

#### Angular 2 plans for Virtual DOM？

https://github.com/angular/angular/issues/561

Angular uses a different strategy. We keep track of the old values for every binding to the view, and so we can detect which pieces of the view changed and update them in the real DOM.
**Virtual DOM diffs the view, angular diffs the model.**
From a performance standpoint neither approach is strictly better than the other. There are certain scenarios in which either approach has a slight advantage.

#### Is shadow DOM fast like Virtual DOM in React.js?

http://stackoverflow.com/questions/36012239/is-shadow-dom-fast-like-virtual-dom-in-react-js?noredirect=1&lq=1




