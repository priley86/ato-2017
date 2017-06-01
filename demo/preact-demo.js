"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _preact = preact,
    h = _preact.h,
    Component = _preact.Component,
    render = _preact.render; /** @jsx h */

var _d3Scale = d3Scale,
    interpolateViridis = _d3Scale.interpolateViridis;

var Demo = function (_Component) {
	_inherits(Demo, _Component);

	function Demo() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Demo);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Demo.__proto__ || Object.getPrototypeOf(Demo)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			max: 0
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Demo, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var timer = setInterval(function () {
				var max = _this2.state.max;

				if (++max > 30) return clearInterval(timer);
				_this2.setState({ max: max });
			}, 1000);
		}
	}, {
		key: "render",
		value: function render(_ref2, _ref3) {
			var max = _ref3.max;

			_objectDestructuringEmpty(_ref2);

			return h(
				"div",
				null,
				h(
					"h4",
					null,
					"Depth: ",
					max,
					" ",
					h("progress-spinner", null)
				),
				h(
					"svg",
					{ viewBox: "0 0 620 620", width: "100%" },
					h(Pythagoras, {
						w: 100,
						x: 320 - 50,
						y: 480 - 100,
						lvl: 0,
						maxlvl: max
					})
				)
			);
		}
	}]);

	return Demo;
}(Component);

var Factor = .5 * Math.sqrt(2);

var Pythagoras = function (_Component2) {
	_inherits(Pythagoras, _Component2);

	function Pythagoras() {
		_classCallCheck(this, Pythagoras);

		return _possibleConstructorReturn(this, (Pythagoras.__proto__ || Object.getPrototypeOf(Pythagoras)).apply(this, arguments));
	}

	_createClass(Pythagoras, [{
		key: "render",
		value: function render(_ref4) {
			var maxlvl = _ref4.maxlvl,
			    w = _ref4.w,
			    x = _ref4.x,
			    y = _ref4.y,
			    lvl = _ref4.lvl,
			    left = _ref4.left,
			    right = _ref4.right;

			if (lvl > maxlvl || w < .5) return null;

			var nextLeft = Factor * w,
			    nextRight = Factor * w,
			    d = nextLeft + nextRight + w,
			    A = 45,
			    B = 45;

			var rotate = '';

			if (left) {
				rotate = "rotate(" + -A + " 0 " + w + ")";
			} else if (right) {
				rotate = "rotate(" + B + " " + w + " " + w + ")";
			}

			return h(
				"g",
				{ transform: "translate(" + x + " " + y + ") " + rotate },
				h("rect", {
					width: w,
					height: w,
					x: 0,
					y: 0,
					style: {
						fill: interpolateViridis(1 - lvl / maxlvl)
					}
				}),
				h(Pythagoras, {
					w: nextLeft,
					x: w - nextLeft,
					y: -nextLeft,
					lvl: lvl + 1,
					maxlvl: maxlvl,
					right: true
				}),
				h(Pythagoras, {
					w: nextRight,
					x: 0,
					y: -nextRight,
					lvl: lvl + 1,
					maxlvl: maxlvl,
					left: true
				})
			);
		}
	}, {
		key: "renderAsync",
		get: function get() {
			return !!this.base;
		}
	}]);

	return Pythagoras;
}(Component);

render(h(Demo, null), document.querySelector("#pythagoras"));