Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function useAddToHomescreenPrompt() {
  var _a = React.useState(null),
    prompt = _a[0],
    setState = _a[1];
  var promptToInstall = function () {
    if (prompt) {
      return prompt.prompt();
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    );
  };
  React.useEffect(function () {
    var ready = function (e) {
      e.preventDefault();
      setState(e);
    };
    window.addEventListener("beforeinstallprompt", ready);
    return function () {
      window.removeEventListener("beforeinstallprompt", ready);
    };
  });
  return [prompt, promptToInstall];
}
exports.default = useAddToHomescreenPrompt;
//# sourceMappingURL=useAddToHomescreenPrompt.js.map
