"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/contexts/ChainContext.js":
/*!**************************************!*\
  !*** ./src/contexts/ChainContext.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChainProvider: () => (/* binding */ ChainProvider),\n/* harmony export */   SUPPORTED_CHAINS: () => (/* binding */ SUPPORTED_CHAINS),\n/* harmony export */   useChain: () => (/* binding */ useChain)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst SUPPORTED_CHAINS = {\n    mainnet: {\n        name: \"Ethereum Mainnet\",\n        id: \"mainnet\",\n        icon: \"⟠\"\n    },\n    bsc: {\n        name: \"BNB Smart Chain\",\n        id: \"bsc\",\n        icon: \"⛓️\"\n    },\n    base: {\n        name: \"Base\",\n        id: \"base\",\n        icon: \"\\uD83D\\uDD35\"\n    },\n    \"arbitrum-one\": {\n        name: \"Arbitrum One\",\n        id: \"arbitrum-one\",\n        icon: \"\\uD83D\\uDD37\"\n    },\n    optimism: {\n        name: \"Optimism\",\n        id: \"optimism\",\n        icon: \"\\uD83D\\uDD34\"\n    },\n    matic: {\n        name: \"Polygon\",\n        id: \"matic\",\n        icon: \"⬡\"\n    },\n    unichain: {\n        name: \"Unichain\",\n        id: \"unichain\",\n        icon: \"\\uD83E\\uDD84\"\n    }\n};\nconst ChainContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction ChainProvider({ children }) {\n    const [selectedChain, setSelectedChain] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"mainnet\");\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ChainContext.Provider, {\n        value: {\n            selectedChain,\n            setSelectedChain\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/marcusrein_1/Desktop/Projects/subgraph-mcp-demo/src/contexts/ChainContext.js\",\n        lineNumber: 19,\n        columnNumber: 5\n    }, this);\n}\nfunction useChain() {\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ChainContext);\n    if (!context) {\n        throw new Error(\"useChain must be used within a ChainProvider\");\n    }\n    return context;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dHMvQ2hhaW5Db250ZXh0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTREO0FBRXJELE1BQU1HLG1CQUFtQjtJQUM5QkMsU0FBUztRQUFFQyxNQUFNO1FBQW9CQyxJQUFJO1FBQVdDLE1BQU07SUFBSTtJQUM5REMsS0FBSztRQUFFSCxNQUFNO1FBQW1CQyxJQUFJO1FBQU9DLE1BQU07SUFBSztJQUN0REUsTUFBTTtRQUFFSixNQUFNO1FBQVFDLElBQUk7UUFBUUMsTUFBTTtJQUFLO0lBQzdDLGdCQUFnQjtRQUFFRixNQUFNO1FBQWdCQyxJQUFJO1FBQWdCQyxNQUFNO0lBQUs7SUFDdkVHLFVBQVU7UUFBRUwsTUFBTTtRQUFZQyxJQUFJO1FBQVlDLE1BQU07SUFBSztJQUN6REksT0FBTztRQUFFTixNQUFNO1FBQVdDLElBQUk7UUFBU0MsTUFBTTtJQUFJO0lBQ2pESyxVQUFVO1FBQUVQLE1BQU07UUFBWUMsSUFBSTtRQUFZQyxNQUFNO0lBQUs7QUFDM0QsRUFBRTtBQUVGLE1BQU1NLDZCQUFlYixvREFBYUE7QUFFM0IsU0FBU2MsY0FBYyxFQUFFQyxRQUFRLEVBQUU7SUFDeEMsTUFBTSxDQUFDQyxlQUFlQyxpQkFBaUIsR0FBR2YsK0NBQVFBLENBQUM7SUFFbkQscUJBQ0UsOERBQUNXLGFBQWFLLFFBQVE7UUFBQ0MsT0FBTztZQUFFSDtZQUFlQztRQUFpQjtrQkFDN0RGOzs7Ozs7QUFHUDtBQUVPLFNBQVNLO0lBQ2QsTUFBTUMsVUFBVXBCLGlEQUFVQSxDQUFDWTtJQUMzQixJQUFJLENBQUNRLFNBQVM7UUFDWixNQUFNLElBQUlDLE1BQU07SUFDbEI7SUFDQSxPQUFPRDtBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmZ0LXBvcnRmb2xpby1kYXNoYm9hcmQvLi9zcmMvY29udGV4dHMvQ2hhaW5Db250ZXh0LmpzP2EzNDQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGNvbnN0IFNVUFBPUlRFRF9DSEFJTlMgPSB7XG4gIG1haW5uZXQ6IHsgbmFtZTogXCJFdGhlcmV1bSBNYWlubmV0XCIsIGlkOiBcIm1haW5uZXRcIiwgaWNvbjogXCLin6BcIiB9LFxuICBic2M6IHsgbmFtZTogXCJCTkIgU21hcnQgQ2hhaW5cIiwgaWQ6IFwiYnNjXCIsIGljb246IFwi4puT77iPXCIgfSxcbiAgYmFzZTogeyBuYW1lOiBcIkJhc2VcIiwgaWQ6IFwiYmFzZVwiLCBpY29uOiBcIvCflLVcIiB9LFxuICBcImFyYml0cnVtLW9uZVwiOiB7IG5hbWU6IFwiQXJiaXRydW0gT25lXCIsIGlkOiBcImFyYml0cnVtLW9uZVwiLCBpY29uOiBcIvCflLdcIiB9LFxuICBvcHRpbWlzbTogeyBuYW1lOiBcIk9wdGltaXNtXCIsIGlkOiBcIm9wdGltaXNtXCIsIGljb246IFwi8J+UtFwiIH0sXG4gIG1hdGljOiB7IG5hbWU6IFwiUG9seWdvblwiLCBpZDogXCJtYXRpY1wiLCBpY29uOiBcIuKsoVwiIH0sXG4gIHVuaWNoYWluOiB7IG5hbWU6IFwiVW5pY2hhaW5cIiwgaWQ6IFwidW5pY2hhaW5cIiwgaWNvbjogXCLwn6aEXCIgfSxcbn07XG5cbmNvbnN0IENoYWluQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIENoYWluUHJvdmlkZXIoeyBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFtzZWxlY3RlZENoYWluLCBzZXRTZWxlY3RlZENoYWluXSA9IHVzZVN0YXRlKFwibWFpbm5ldFwiKTtcblxuICByZXR1cm4gKFxuICAgIDxDaGFpbkNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgc2VsZWN0ZWRDaGFpbiwgc2V0U2VsZWN0ZWRDaGFpbiB9fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0NoYWluQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUNoYWluKCkge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChDaGFpbkNvbnRleHQpO1xuICBpZiAoIWNvbnRleHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VDaGFpbiBtdXN0IGJlIHVzZWQgd2l0aGluIGEgQ2hhaW5Qcm92aWRlclwiKTtcbiAgfVxuICByZXR1cm4gY29udGV4dDtcbn1cbiJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZVN0YXRlIiwiU1VQUE9SVEVEX0NIQUlOUyIsIm1haW5uZXQiLCJuYW1lIiwiaWQiLCJpY29uIiwiYnNjIiwiYmFzZSIsIm9wdGltaXNtIiwibWF0aWMiLCJ1bmljaGFpbiIsIkNoYWluQ29udGV4dCIsIkNoYWluUHJvdmlkZXIiLCJjaGlsZHJlbiIsInNlbGVjdGVkQ2hhaW4iLCJzZXRTZWxlY3RlZENoYWluIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZUNoYWluIiwiY29udGV4dCIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/contexts/ChainContext.js\n");

/***/ }),

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-query */ \"react-query\");\n/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _contexts_ChainContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/ChainContext */ \"./src/contexts/ChainContext.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__]);\n_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nconst queryClient = new react_query__WEBPACK_IMPORTED_MODULE_2__.QueryClient();\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_query__WEBPACK_IMPORTED_MODULE_2__.QueryClientProvider, {\n        client: queryClient,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.ChakraProvider, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_ChainContext__WEBPACK_IMPORTED_MODULE_3__.ChainProvider, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/Users/marcusrein_1/Desktop/Projects/subgraph-mcp-demo/src/pages/_app.js\",\n                    lineNumber: 12,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/marcusrein_1/Desktop/Projects/subgraph-mcp-demo/src/pages/_app.js\",\n                lineNumber: 11,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/marcusrein_1/Desktop/Projects/subgraph-mcp-demo/src/pages/_app.js\",\n            lineNumber: 10,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/marcusrein_1/Desktop/Projects/subgraph-mcp-demo/src/pages/_app.js\",\n        lineNumber: 9,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFrRDtBQUNhO0FBQ047QUFFekQsTUFBTUksY0FBYyxJQUFJSCxvREFBV0E7QUFFcEIsU0FBU0ksTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNwRCxxQkFDRSw4REFBQ0wsNERBQW1CQTtRQUFDTSxRQUFRSjtrQkFDM0IsNEVBQUNKLDREQUFjQTtzQkFDYiw0RUFBQ0csaUVBQWFBOzBCQUNaLDRFQUFDRztvQkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLbEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZnQtcG9ydGZvbGlvLWRhc2hib2FyZC8uL3NyYy9wYWdlcy9fYXBwLmpzPzhmZGEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hha3JhUHJvdmlkZXIgfSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuaW1wb3J0IHsgUXVlcnlDbGllbnQsIFF1ZXJ5Q2xpZW50UHJvdmlkZXIgfSBmcm9tIFwicmVhY3QtcXVlcnlcIjtcbmltcG9ydCB7IENoYWluUHJvdmlkZXIgfSBmcm9tIFwiLi4vY29udGV4dHMvQ2hhaW5Db250ZXh0XCI7XG5cbmNvbnN0IHF1ZXJ5Q2xpZW50ID0gbmV3IFF1ZXJ5Q2xpZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxRdWVyeUNsaWVudFByb3ZpZGVyIGNsaWVudD17cXVlcnlDbGllbnR9PlxuICAgICAgPENoYWtyYVByb3ZpZGVyPlxuICAgICAgICA8Q2hhaW5Qcm92aWRlcj5cbiAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgIDwvQ2hhaW5Qcm92aWRlcj5cbiAgICAgIDwvQ2hha3JhUHJvdmlkZXI+XG4gICAgPC9RdWVyeUNsaWVudFByb3ZpZGVyPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIkNoYWtyYVByb3ZpZGVyIiwiUXVlcnlDbGllbnQiLCJRdWVyeUNsaWVudFByb3ZpZGVyIiwiQ2hhaW5Qcm92aWRlciIsInF1ZXJ5Q2xpZW50IiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJjbGllbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.js\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-query":
/*!******************************!*\
  !*** external "react-query" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("react-query");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ ((module) => {

module.exports = import("@chakra-ui/react");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.js"));
module.exports = __webpack_exports__;

})();